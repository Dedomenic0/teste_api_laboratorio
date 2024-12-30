const link = "http://localhost:3000";

//envia os inputs recebidos para o link pelo metodo post
async function salvarTexto() {
    const texto = document.getElementById("texto").value;
    const coleta = document.getElementById("Coleta").value;
    const motivo = document.getElementById("motivo").value;
    const verificacao = document.getElementById("locais").textContent;

    
    if (texto == "" || coleta == "" || motivo == "opt") {
        alert("Preencha todos os campos");
        return;
    }
    
    if (!verificacao.includes(coleta)) {
        alert("Local de coleta não encontrado");
        return;
    }

    try {
     fetch(`${link}/salva`, {
        method: "POST",
        mode: "cors",
        headers:{
            "Content-Type":"application/json",
        }, 
        body: JSON.stringify({
            texto : texto,
            coleta : coleta,
            motivo : motivo
        })
    })
    apagarInputs();

}catch (err){
    console.log(err);
}
}


async function enviarFormulario() {

    try {
       await fetch(`${link}/envia`,{
           method: "POST",
           mode: "cors",
           headers:{
               "Content-Type":"application/json",
            }, 
            
        } 
    )
    alert("Contagem")

} catch(err) {
    console.log(err);
}
}

//retorna os inputs ao estado padrao após envio
function apagarInputs(){
    document.getElementById("motivoRejei").value = "";
    document.getElementById("local").value = "";
    document.getElementById("motivo").value = "opt";
    document.getElementById("Coleta").value = "";
    document.getElementById("texto").value = "";
}