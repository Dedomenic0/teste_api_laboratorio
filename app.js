import fs from "fs"
import moment from "moment"
import XLSX from "xlsx"

//salva o arquivo em txt
 export default async function salvaTxt(req, res) {
    const mes = new Date;
    const data = moment().format('DD/MM/YYYY');
    const txt = req.body.texto;
    const coleta = req.body.coleta;
    const motivo = req.body.motivo;
    const rota = req.body.rota;
    var rotaTxt = "";
    var rotaXlsx = "";
    var rotaDeSalvamento = "";

    //verifica se a opçao correspondente está marcada para assim mudar a rota para salva os arquivos
    if (rota == "hemostasia") {
        rotaTxt = `./arquivos/contadorHemosta_mes_${mes.getMonth()+1}-${mes.getFullYear()}.txt`;
        rotaXlsx = `./arquivos/amostrasHemosta_mes_${mes.getMonth()+1}-${mes.getFullYear()}.xlsx`;
        rotaDeSalvamento = "./arquivos/para-xlsxhemosta.txt";
    } else {
        rotaTxt = `./arquivos/contador_mes_${mes.getMonth()+1}-${mes.getFullYear()}.txt`;
        rotaXlsx = `./arquivos/amostras_mes_${mes.getMonth()+1}-${mes.getFullYear()}.xlsx`;
        rotaDeSalvamento = "./arquivos/para-xlsx.txt";
    }

    try{
        await fs.promises.appendFile(rotaTxt, `Cod. da amostra: ${txt.replace("\n", "")}, Motivo: ${motivo}, Procedencia: ${coleta}, Data: ${data}` + "\n");
        fs.readFile(rotaTxt, "utf8", async(err, data) => {
            if(err) {
                console.log(err);
                return;
            }

            //recorta as partes do arquivo txt
            let tratada1 = data.replace(/Cod. da amostra: /g, "");
            let tratada2 = tratada1.replace(/Motivo: /g, "");
            let tratada3 = tratada2.replace(/Procedencia: /g, "");
            let tratada = tratada3.replace(/Data: /g, "");
           
            //lê o arquivo tratado
            await fs.promises.writeFile(rotaDeSalvamento, tratada);
            
            //Lê o arquivo txt e o copia em formato XLSX
            const wb = XLSX.readFile(rotaDeSalvamento,{ raw: true });
            XLSX.writeFile(wb, rotaXlsx);

        })
        
        //console.log("Deu certo");
        res.status(200).json({"Response":"Salvo"});
    } catch (err) {
        console.log(err);
    }
}
