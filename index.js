import fs from "fs"
import express from "express"
import cors from "cors"
import moment from "moment"
import separaEConta from "./separador.js"
import XLSX from "xlsx"

//crias as rotas utilizadas
const routes = (app) =>{
    app.use(express.json());
    app.post(`/salva`, salvaTxt);
    app.post("/envia", separaEConta);
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

//salva o arquivo em txt
 async function salvaTxt(req, res) {
    const data = moment().format('DD-MM-YYYY');
    const txt = req.body.texto;
    const coleta = req.body.coleta;
    const motivo = req.body.motivo
    const mes = new Date

    try{
        await fs.promises.appendFile(`./contador_mes_${mes.getMonth()+1}.txt`, `Cod. da amostra: ${txt.replace("\n", "")}, Motivo: ${motivo}, Procedencia: ${coleta}, Data: ${data}` + "\n");
        fs.readFile(`./contador_mes_${mes.getMonth()+1}.txt`, "utf8",async(err, data) => {
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
            await XLSX.writeFile(wb, `./amostras_mes_${mes.getMonth()+1}.xlsx`);
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
