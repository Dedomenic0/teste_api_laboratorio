import fs from "fs"
import path from "path"

const caminhotxt = path.resolve("./teste.txt")

function contador (req, res) {
    const caminho = caminhotxt;
    const palavra1 = req.body.motivoRejei;
    const palavra2 = req.body.local;

    fs.readFile(caminho, 'utf8', (err, dados) => {
        if(err) {
            console.log(err);
            return
        }
        const regex = new RegExp(`\\b${palavra2}, Procedencia: ${palavra1}\\b`,"gi");
        const resultado = dados.match(regex) || [];
        const textoCorreto = arrumaSaida(resultado);
        let fim = resultado.length
        console.log(`Quantidade de ocorrencias: ${resultado.length}`);
        
        salvaArquivo(textoCorreto, "./palavras_contadas.txt");
                        
        res.json(`Quandidade de ocorrencias: ${palavra1} com ${palavra2} = ${fim}`);
    })
}

function arrumaSaida(texto){
    return texto.toString().replace(/,/g,"\n");
}

async function salvaArquivo(texto, caminho) {
    try{
        await fs.promises.writeFile(caminho, texto);
        console.log("OK");

    } catch(erro) {
        throw erro;
    }
}

export default contador;