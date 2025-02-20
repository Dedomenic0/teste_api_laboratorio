import fs from "fs";
import XLSX from "xlsx";

var caminhoExel = "";
var caminhoExel2 = "";
var result = "";
var result2 = "";

const motivos = ["Amostra coagulada", "Volume inadequado", "Coleta em tubo errado", "Outros"];

export default function separaEConta (req, res){
    const mes = req.body.data;

fs.readFile("locais.txt", "utf8", async(err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    const dados = data.replace(/(\r\n|\n|\r)/g, ",");
    const resultado = dados.split(",");
       
        for (let i = 0; i < resultado.length; i++){
         let consulta = resultado[i];
            for (let i = 0; i < motivos.length; i++) {
             let rejei =  motivos[i];
             contador(consulta, rejei, mes);
            }
        }
   //res.status(200).json({"response":"Contagem realizada"});

    timerSave(res, mes);
});
};

function contador(palavra1, palavra2, mes) {
    var caminho = "";
    var caminho2 = "";
    const data = new Date;
    var ano = data.getFullYear();

    if (mes == "12" && data.getMonth()+1 == 1) {ano = data.getFullYear() - 1}

    caminho = `./arquivos/contadorHemosta_mes_${mes}-${ano}.txt`;
    caminho2 = `./arquivos/contador_mes_${mes}-${ano}.txt`;
    result = `./arquivos/resultadoHemosta_mes_${mes}-${ano}.txt`;
    result2 = `./arquivos/resultado_mes_${mes}-${ano}.txt`;
    caminhoExel = `./arquivos/resultadosHemosta_mes_${mes}-${ano}.xlsx`;
    caminhoExel2 = `./arquivos/resultados_mes_${mes}-${ano}.xlsx`;
    

 fs.readFile(caminho, 'utf8', (err, dados) => {
        if(err) {
            //console.log("Arquvivo nao encontrado");
            return err;
        }

        //trasnforma as ocorrencias em arrays
        const regex = new RegExp(`\\b${palavra2}, Procedencia: ${palavra1}\\b`,"gi");
        const resultado = dados.match(regex) || [];
        
        //retorna o numero de ocorrencias                 
        let fim = resultado.length;
        //console.log(`Quantidade de ocorrencias: ${resultado.length}`);
        if (fim == 0) { return; }

        else {
            fs.promises.appendFile(result , `${palavra1 || "Total"}, ${palavra2}, ${fim} \n`);
             //console.log(`Quandidade de ocorrencias: ${palavra1} com ${palavra2} = ${fim}`);
        }
    })
    
    fs.readFile(caminho2, 'utf8', (err, dados2) => {
        if(err) {
            // console.log("Arquivo nao encontrado");
            return err;
        }

        //trasnforma as ocorrencias em arrays
        const regex = new RegExp(`\\b${palavra2}, Procedencia: ${palavra1}\\b`,"gi");
        const resultado = dados2.match(regex) || [];
        
        //retorna o numero de ocorrencias                 
        let fim = resultado.length;
        //console.log(`Quantidade de ocorrencias: ${resultado.length}`);
        if (fim == 0) { return; }

        else {
            fs.promises.appendFile(result2 , `${palavra1 || "Total"}, ${palavra2}, ${fim} \n`);
             //console.log(`Quandidade de ocorrencias: ${palavra1} com ${palavra2} = ${fim}`);
        }
    })
}

async function salvaExel(){
     try {
        const wb = XLSX.readFile(result);
        const wb2 = XLSX.readFile(result2)
        await XLSX.writeFile(wb, caminhoExel);
        await XLSX.writeFile(wb2, caminhoExel2);
    } catch (err){
    console.log(err)
    
    }
}

async function timerSave(res, mes) {
    const data = new Date;
    var ano = data.getFullYear();
    var existe = fs.existsSync(`./arquivos/contador_mes_${mes}-${ano}.txt`);

    if (!existe) { 
        return res.status(400).json({ "Response" : "Arquivo nao encontrado, verifique data" });
    }
    
    setTimeout (() => {salvaExel()}, 3000);
    setTimeout(() => {fs.promises.unlink(result)}, 4000);
    setTimeout(() => {fs.promises.unlink(result2)}, 4000);
    
    return res.status(200).json({ "Response" : "Contagem realizada" })
}