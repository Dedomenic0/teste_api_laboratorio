import fs from "fs"
import path from "path"

const caminhoTexto = path.resolve("./teste.txt")

function contador (caminho, palavra1, palavra2) {
    fs.readFile(caminho, 'utf8', (err, dados) => {
        if(err) {
            console.log(err)
            return
        }
        const regex = new RegExp(`\\b${palavra2}, Procedencia: ${palavra1}\\b`,"gi");
        const resultado = dados.match(regex) || [];
        const textoCorreto = arrumaSaida(resultado);
        console.log(`Quantidade de ocorrencias: ${resultado.length}`);
        salvaArquivo(textoCorreto, "./palavras_contadas.txt")
        console.log(regex)
    })
}

function arrumaSaida(texto){
    return texto.toString().replace("\\b,\\b","\n")
}

async function salvaArquivo(texto, caminho) {
    try{
        await fs.promises.writeFile(caminho, texto);
        console.log("OK");

    } catch(erro) {
        throw erro
    }
}
const local = "P.S Adulto"
const motivo = "Coleta em tubo errado"
contador(caminhoTexto, local, motivo);

