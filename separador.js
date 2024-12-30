import fs from "fs";
const motivos = ["Amostra coagulada", "Volume indequado", "Coleta em tubo errado", "outros"]

export default function separaEConta (){
fs.readFile("locais.txt", "utf8", async(err, data) => {
    try{
        const dados = data.replace(/(\r\n|\n|\r)/g, ",")
        const resultado = dados.split(",");
    for (let i = 0; i < motivos.length; i++) {
    let rejei =  motivos[i]
    for (let i = 0; i < resultado.length; i++){
    let consulta = resultado[i];
    contador(consulta, rejei);
   }}
   } catch (err) {
    throw err
   }
})
}


function contador(palavra1, palavra2) {
    const mes = new Date
    const caminho = `./contador_mes_${mes.getMonth()+1}.txt`;

 fs.readFile(caminho, 'utf8', (err, dados) => {
        if(err) {
            console.log(err);
            return;
        }
        //trasnforma as ocorrencias em arrays
        const regex = new RegExp(`\\b${palavra2}, Procedencia: ${palavra1}\\b`,"gi");
        const resultado = dados.match(regex) || [];
        //const textoCorreto = arrumaSaida(resultado);
        let fim = resultado.length
        //console.log(`Quantidade de ocorrencias: ${resultado.length}`);
        
       fs.promises.appendFile(`./resultado_mes${mes.getMonth()+1}.txt` , `Quandidade de ocorrencias: ${palavra1} com ${palavra2} = ${fim} \n`);
        //retorna o numero de ocorrencias                 
        //console.log(`Quandidade de ocorrencias: ${palavra1} com ${palavra2} = ${fim}`);
    })
}