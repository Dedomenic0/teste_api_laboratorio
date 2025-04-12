import express from "express"
import cors from "cors"
import separaEConta from "./separador.js"
import mandaLocais from "./mandaLocais.js"
import adicionaLocal from './salvaLocais/adicionaLocal.js'
import salvaTxt from './app.js'

// import dotenv from "dotenv"
// dotenv.config()

const rota1 = process.env.ROUTE1;
const rota2 = process.env.ROUTE2;

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

//"abre" a porta local 
app.listen(rota1, () => {
    console.log("Servidor escutando...");
});

//"abre" a porta para a pagina html
const app2 = express();
app2.use(express.static("home"));
app2.listen(rota2, () => {
    console.log("servidor html escutando...")
})

const routes2 = (app2) => {
    app2.get('/novoLocal', (req, res) => {
        res.sendFile("C:/Users/ewesl/Desktop/Projetos_para_estudos/projeto_LAB/salvaLocais/novoLocal.html")
    })
}

routes2(app2);
