import fs from "fs";
import XLSX from "xlsx";

var caminhoExel = "";
var result = "";
const motivos = ["Amostra coagulada", "Volume indequado", "Coleta em tubo errado", "outros"];

export default function separaEConta (req, res){
    setTimeout (() => {salvaExel()}, 3000);
    setTimeout(() => {fs.promises.unlink(result)}, 4000)
    
    const rota = req.body.rota;

fs.readFile("locais.txt", "utf8", async(err, data) => {
    try{
        const dados = data.replace(/(\r\n|\n|\r)/g, ",");
        const resultado = dados.split(",");
    for (let i = 0; i < motivos.length; i++) {
    let rejei =  motivos[i];
    for (let i = 0; i < resultado.length; i++){
    let consulta = resultado[i];
    contador(consulta, rejei, rota);
   }}
   } catch (err) {
    throw err;
   };
});
};

function contador(palavra1, palavra2, rota) {
    const mes = new Date;
    const caminho = "";

    if (rota == true) {
        caminho = `./contadorHemosta_mes_${mes.getMonth()+1}.txt`;
        result = `./resultadoHemosta_mes_${mes.getMonth()+1}.txt`;
        caminhoExel = `./resultadosHemosta_mes_${mes.getMonth()+1}.xlsx`;
    } else {
        caminho = `./contador_mes_${mes.getMonth()+1}.txt`;
        result = `./resultado_mes_${mes.getMonth()+1}.txt`;
        caminhoExel = `./resultados_mes_${mes.getMonth()+1}.xlsx`;
    }

 fs.readFile(caminho, 'utf8', (err, dados) => {
        if(err) {
            console.log(err);
            return;
        }

        //trasnforma as ocorrencias em arrays
        const regex = new RegExp(`\\b${palavra2}, Procedencia: ${palavra1}\\b`,"gi");
        const resultado = dados.match(regex) || [];
        //const textoCorreto = arrumaSaida(resultado);
        //retorna o numero de ocorrencias                 
        let fim = resultado.length;
        //console.log(`Quantidade de ocorrencias: ${resultado.length}`);
        
       fs.promises.appendFile(result , `${palavra1}, ${palavra2}, ${fim} \n`);
        //console.log(`Quandidade de ocorrencias: ${palavra1} com ${palavra2} = ${fim}`);
    })
}

async function salvaExel(){
     try {
        const wb = XLSX.readFile(result);
        await XLSX.writeFile(wb, caminhoExel);
    } catch (err){
            console.log(err);
    }
}