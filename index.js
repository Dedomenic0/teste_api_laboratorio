import fs from "fs"
import express from "express"
import cors from "cors"
import moment from "moment"
import contador from "./contador.js"
import XLSX from "xlsx"

const routes = (app) =>{
    app.use(express.json());
    app.post(`/salva`, salvaTxt);
    app.post("/envia", contador);
}

const app = express();
app.use(express.static("uplouds"))
app.use(cors())

routes(app)


app.listen(3000, () => {
    console.log("Servidor escutando...");
 });

 async function salvaTxt(req, res) {
    const data = moment().format('DD-MM-YYYY');
    const txt = req.body.texto;
    const conf = req.body.conf;
    const motivo = req.body.motivo

    try{
        await fs.promises.appendFile("./teste.txt", `Cod. da amostra: ${txt.replace("\n", "")}, Motivo: ${motivo}, Procedencia: ${conf}, Data: ${data}` + "\n");
        fs.readFile("teste.txt", "utf8",async(err, data) => {
           try {
            let tratada1 = data.replace(/Cod. da amostra: /g, "");
            let tratada2 = tratada1.replace(/Motivo: /g, "");
            let tratada3 = tratada2.replace(/Procedencia: /g, "");
            let tratada = tratada3.replace(/Data: /g, "");

            await fs.promises.writeFile("./txt.txt", tratada);
            
            const wb = XLSX.readFile("txt.txt");
            await XLSX.writeFile(wb, "./dados.xlsx");
        } catch(err){
            throw err;
        }
        })

        
        console.log("Deu certo");
        res.status(200);
    } catch (err) {
        console.log(err);
    }
}

export default salvaTxt;