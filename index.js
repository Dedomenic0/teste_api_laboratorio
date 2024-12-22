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


app.listen(8080, () => {
    console.log("Servidor escutando...");
 });

const data = moment().format('DD-MM-YYYY');


async function salvaTxt(req, res) {
    const txt = req.body.texto;
    const conf = req.body.conf;
    const motivo = req.body.motivo

    try{
        await fs.promises.appendFile("./teste.txt", `Cod. da amostra: ${txt.replace("\n", "")}, Motivo: ${motivo}, Procedencia: ${conf}; Data: ${data}` + "\n");
        console.log("Deu certo");
        let wb = XLSX.utils.table_to_book([[txt, conf, motivo, data]])
        let ws = wb.Sheets["tabela 1"];
        XLSX.utils.sheet_add_aoa(ws,[["Criado" + new Date().toISOString()]], { origin: -1 });
        XLSX.writeFile(wb, "dados.xlsx")

        res.status(200);
    } catch (err) {
        console.log(err);
    }
}

export default salvaTxt;