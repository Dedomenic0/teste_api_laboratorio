import fs from "fs"
import express from "express"
import cors from "cors"

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


async function salvaTxt(req, res) {
    const txt = req.body.texto;
    const conf = req.body.conf;
    try{
        await fs.promises.appendFile("./teste.txt", `pedido: ${txt}, motivo: ${conf}` + "\n");
        console.log("Deu certo");
    } catch (err) {
        console.log(err)
    }
}

export default salvaTxt;