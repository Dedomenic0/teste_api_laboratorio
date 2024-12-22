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

const data = moment().format('DD-MM-YYYY');


async function salvaTxt(req, res) {
    const txt = req.body.texto;
    const conf = req.body.conf;
    const motivo = req.body.motivo

    try{
        await fs.promises.appendFile("./teste.txt", `Cod. da amostra: ${txt.replace("\n", "")}, Motivo: ${motivo}, Procedencia: ${conf}, Data: ${data}` + "\n");
        console.log("Deu certo");
        let valor = [[txt, conf, motivo, data]];
        const loc = "./dados.xlsx"
        //const wb = XLSX.utils.book_new()
        const wb = XLSX.readFile("teste.txt")
            const ws = XLSX.utils.sheet_add_aoa(wb, valor,  { origin : -1});
            //XLSX.utils.book_append_sheet(wb, ws, "planilha1", true)
            XLSX.writeFile(wb, "./fim.xlsx",);
    
        res.status(200);
    } catch (err) {
        console.log(err);
    }
}

export default salvaTxt;