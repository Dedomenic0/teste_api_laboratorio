const link = "http://localhost:3000";

//envia os inputs recebidos para o link pelo metodo post
async function salvarTexto() {
    const texto = document.getElementById("texto").value;
    const coleta = document.getElementById("Coleta").value;
    const motivo = document.getElementById("motivo").value;
    const verificacao = document.getElementById("locais").textContent;
    const rota = document.getElementById("hemostas").checked;
    
    
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
        .then(response => response.json())
        .then(data => {
            console.log("ok", data),
            apagarInputs()
        });
        
    }catch (err){
    console.error(err);
    alert("Falha ao conectar com o servidor!");
    }
}


async function enviarFormulario() {
    const rota = document.getElementById("hemostas").checked;
    
    try {
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
    .then(response => response.json())
    .then(data => {
        console.log("ok", data),
        apagarInputs(),
        alert("Contagem realizada")})
    
} catch(err) {
    console.error(err);
    alert("Falha ao conectar com o servidor!");
} 
}

//retorna os inputs ao estado padrao após envio
function apagarInputs(){
    document.getElementById("texto").value = "";
    document.getElementById("motivo").value = "opt";
    document.getElementById("Coleta").value = "";
    document.getElementById("hemostas").checked = "";
}