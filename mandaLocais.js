import fs from "fs"

export default async function mandaLocais (req, res) {
    fs.readFile("locais.txt", "utf8", async(err, data) => {
        if (err) {
            console.error(err);
        }
        const dados = data.replace(/(\r\n|\n|\r)/g, ",");
        const resultado = dados.split(",");

        res.status(200).json(resultado);
    })
}