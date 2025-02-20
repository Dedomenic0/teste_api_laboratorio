import express from "express"
import cors from "cors"
import separaEConta from "./separador.js"
import mandaLocais from "./mandaLocais.js"
import adicionaLocal from './salvaLocais/adicionaLocal.js'
import salvaTxt from './app.js'

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
app.use(cors());
routes(app);

//"abre" a porta local 3000
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

//"abre" a porta para a pagina html
const app2 = express();
app2.use(express.static("home"));
app2.listen(3030, () => {
    console.log("servidor html escutando...")
})

const routes2 = (app2) => {
    app2.get('/novoLocal', (req, res) => {
        res.sendFile("C:/Users/ewesl/Desktop/Projetos_para_estudos/projeto_LAB/salvaLocais/novoLocal.html")
    })
}

routes2(app2);
