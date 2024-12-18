import fs from "fs"
import express from "express"
import cors from "cors"
import moment from "moment"

const routes = (app) =>{
    app.use(express.json());
    app.post(`/salva`, salvaTxt);
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
        await fs.promises.appendFile("./teste.txt", `dia: ${data}, pedido: ${txt}, motivo: ${motivo}, Procedencia: ${conf}` + "\n");
        console.log("Deu certo");
    } catch (err) {
        console.log(err)
    }
}

export default salvaTxt;