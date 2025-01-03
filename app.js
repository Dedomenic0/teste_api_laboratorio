const link = "http://localhost:3000";

//envia os inputs recebidos para o link pelo metodo post
async function salvarTexto() {
    const texto = document.getElementById("texto").value;
    const coleta = document.getElementById("Coleta").value;
    const motivo = document.getElementById("motivo").value;
    const verificacao = document.getElementById("locais").textContent;
    const rota = document.getElementById("hemostas").Checked;
    
    setTimeout(() => apagarInputs(), 1000)

    //verifica se os campos foram preenchidos corretamente
    if (texto == "" || coleta == "" || motivo == "opt") {
        alert("Preencha todos os campos");
        return;
    }
    
    if (!verificacao.includes(coleta)) {
        alert("Local de coleta não encontrado");
        return;
    }

    try {
    await fetch(`${link}/salva`, {
        method: "POST",
        mode: "cors",
        headers:{
            "Content-Type":"application/json",
        }, 
        body: JSON.stringify({
            texto : texto,
            coleta : coleta,
            motivo : motivo,
            rota : rota
        })
    })

}catch (err){
    alert("Falha ao conectar com o servidor!")
    console.log(err);
}
}


async function enviarFormulario() {
    const rota = document.getElementById("hemostas").Checked;
    
    setTimeout(() => apagarInputs(), 1000)

    try {
       alert("Contagem realizada")
       await fetch(`${link}/envia`,{
           method: "POST",
           mode: "cors",
           headers:{
               "Content-Type":"application/json",
            }, 
            body: JSON.stringify({
                rota : rota
            })
        } 
    )
    
} catch(err) {
    alert("Falha ao conectar com o servidor!")
    console.log(err);
}
}

//retorna os inputs ao estado padrao após envio
function apagarInputs(){
    document.getElementById("texto").value = "";
    document.getElementById("motivo").value = "opt";
    document.getElementById("Coleta").value = "";
    document.getElementById("hemostas").Checked = "";
}