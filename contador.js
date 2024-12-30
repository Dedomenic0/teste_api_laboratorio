import fs from "fs"

//função para contar as ocorrencias 
function contador (req, res) {
    const mes = new Date
    const caminho = `./contador_mes_${mes.getMonth()+1}.txt`;
    const palavra2 = req.body.motivoRejei;
    const palavra1 = req.body.local;

    fs.readFile(caminho, 'utf8', (err, dados) => {
        if(err) {
            console.log(err);
            return;
        }
        //trasnforma as ocorrencias em arrays
        const regex = new RegExp(`\\b${palavra2}, Procedencia: ${palavra1}\\b`,"gi");
        const resultado = dados.match(regex) || [];
        const textoCorreto = arrumaSaida(resultado);
        let fim = resultado.length
        //console.log(`Quantidade de ocorrencias: ${resultado.length}`);
        
        salvaArquivo(textoCorreto, "./palavras_contadas.txt");
        //retorna o numero de ocorrencias                 
        res.json(`Quandidade de ocorrencias: ${palavra1} com ${palavra2} = ${fim}`);
    })
}
//troca as virgulas por quebras de linhas
function arrumaSaida(texto){
    return texto.toString().replace(/,/g,"\n");
}

//salva as ocorrencias em txt
async function salvaArquivo(texto, caminho) {
    try{
        await fs.promises.writeFile(caminho, texto);
        console.log("OK");

    } catch(erro) {
        throw erro;
    }
}

export default contador;