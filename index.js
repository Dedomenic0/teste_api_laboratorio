import fs from "fs"
import express from "express"
import cors from "cors"
import moment from "moment"
import separaEConta from "./separador.js"
import XLSX from "xlsx"
import mandaLocais from "./mandaLocais.js"
import adicionaLocal from './salvaLocais/adicionaLocal.js'

//crias as rotas utilizadas
const routes = (app) =>{
    app.use(express.json());
    app.post(`/salva`, salvaTxt);
    app.post("/envia", separaEConta);
    app.get('/locais', mandaLocais);
    app.post('/novoLocal', adicionaLocal)

}

//executa o express
const app = express();
app.use(express.static("uplouds"));
app.use(cors());
routes(app);

//"abre" a porta local 3000
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

//salva o arquivo em txt
 async function salvaTxt(req, res) {
    const mes = new Date;
    const data = moment().format('DD/MM/YYYY');
    const txt = req.body.texto;
    const coleta = req.body.coleta;
    const motivo = req.body.motivo;
    const rota = req.body.rota;
    var rotaTxt = "";
    var rotaXlsx = "";
    var rotaDeSalvamento = "";

    //verifica se a opçao correspondente está marcada para assim mudar a rota para salva os arquivos
    if (rota == "hemostasia") {
        rotaTxt = `./arquivos/contadorHemosta_mes_${mes.getMonth()+1}-${mes.getFullYear()}.txt`;
        rotaXlsx = `./arquivos/amostrasHemosta_mes_${mes.getMonth()+1}-${mes.getFullYear()}.xlsx`;
        rotaDeSalvamento = "./arquivos/para-xlsxhemosta.txt";
    } else {
        rotaTxt = `./arquivos/contador_mes_${mes.getMonth()+1}-${mes.getFullYear()}.txt`;
        rotaXlsx = `./arquivos/amostras_mes_${mes.getMonth()+1}-${mes.getFullYear()}.xlsx`;
        rotaDeSalvamento = "./arquivos/para-xlsx.txt";
    }

    try{
        await fs.promises.appendFile(rotaTxt, `Cod. da amostra: ${txt.replace("\n", "")}, Motivo: ${motivo}, Procedencia: ${coleta}, Data: ${data}` + "\n");
        fs.readFile(rotaTxt, "utf8", async(err, data) => {
           try {
            //recorta as partes do arquivo txt
            let tratada1 = data.replace(/Cod. da amostra: /g, "");
            let tratada2 = tratada1.replace(/Motivo: /g, "");
            let tratada3 = tratada2.replace(/Procedencia: /g, "");
            let tratada = tratada3.replace(/Data: /g, "");
           
            //lê o arquivo tratado
            await fs.promises.writeFile(rotaDeSalvamento, tratada);
            
            //Lê o arquivo txt e o copia em formato XLSX
            const wb = XLSX.readFile(rotaDeSalvamento,{ raw: true });
            XLSX.writeFile(wb, rotaXlsx);

        } catch(err){
            throw err;
        }
        })
        
        //console.log("Deu certo");
        res.status(200).json({"response":"Salvo"});
    } catch (err) {
        console.log(err);
    }
}
