import fs from "fs"
import express from "express"
import cors from "cors"
import moment from "moment"
import contador from "./contador.js"
import XLSX from "xlsx"

//crias as rotas utilizadas
const routes = (app) =>{
    app.use(express.json());
    app.post(`/salva`, salvaTxt);
    app.post("/envia", contador);
}

//executa o express
const app = express();
app.use(express.static("uplouds"))
app.use(cors())
routes(app)

//"abre" a porta local 3000
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

export var caminhoTxt = `./teste.txt`
var caminhoXlsx = `./dados.xlsx`

//troca o nome do arquivo baseado no mês atual
function mesArquivo() {
    const dias = new Date
    if(dias.getDate() == 1 && dias.getHours() <= 1) {
        caminhoTxt = `./contador_mes_${dias.getMonth()+1}.txt`;
        caminhoXlsx = `./amostras_mes_${dias.getMonth()+1}.xlsx`;
        console.log("Verificado")
    }
}

//executa a funçao a cada 1 hora
setInterval(mesArquivo, 3600000);

//salva o arquivo em txt
 async function salvaTxt(req, res) {
    const data = moment().format('DD-MM-YYYY');
    const txt = req.body.texto;
    const conf = req.body.conf;
    const motivo = req.body.motivo

    try{
        await fs.promises.appendFile(caminhoTxt, `Cod. da amostra: ${txt.replace("\n", "")}, Motivo: ${motivo}, Procedencia: ${conf}, Data: ${data}` + "\n");
        fs.readFile(caminhoTxt, "utf8",async(err, data) => {
           try {
            //recorta as partes do arquivo txt
            let tratada1 = data.replace(/Cod. da amostra: /g, "");
            let tratada2 = tratada1.replace(/Motivo: /g, "");
            let tratada3 = tratada2.replace(/Procedencia: /g, "");
            let tratada = tratada3.replace(/Data: /g, "");
            //lê o arquivo tratado
            await fs.promises.writeFile("./txt.txt", tratada);
            
            //Lê o arquivo txt e o copia em formato XLSX
            const wb = XLSX.readFile("txt.txt");
            await XLSX.writeFile(wb, caminhoXlsx);
        } catch(err){
            throw err;
        }
        })
        
        //console.log("Deu certo");
        res.status(200);
    } catch (err) {
        console.log(err);
    }
}
