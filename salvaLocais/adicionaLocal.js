import fs from 'fs'

export default async function adicionaLocal (req, res) {
    const newLocal = req.body.local

    try {
    await fs.promises.appendFile('./locais.txt', newLocal + '\n');
    } catch (err) {
        console.error(err);
    }
    res.status(200).json({ 'response': 'Novo local salvo' })
}