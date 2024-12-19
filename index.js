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


app.listen(8080, () => {
    console.log("Servidor escutando...");
 });

const data = moment().format('DD-MM-YYYY');


async function salvaTxt(req, res) {
    const txt = req.body.texto;
    const conf = req.body.conf;
    const motivo = req.body.motivo

    try{
        await fs.promises.appendFile("./teste.txt", `Cod. da amostra: ${txt}, Motivo: ${motivo}, Procedencia: ${conf}; Data: ${data}` + "\n");
        console.log("Deu certo");
        res.status(200)
    } catch (err) {
        console.log(err)
    }
}

export default salvaTxt;