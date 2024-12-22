const link = "https://ed5e-2804-4ec-1103-7da0-513f-d830-5f23-2fef.ngrok-free.app";

async function salvarTexto() {
    const texto = document.getElementById("texto").value;
    const conf = document.getElementById("conf").value;
    const motivo = document.getElementById("motivo").value;
    
    if (texto == "" || conf == "opt" || motivo == "opt") {
        alert("Preencha todos os campos");
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
            conf : conf,
            motivo : motivo
        })
    })
    apagarInputs();

}catch (err){
    console.log(err);
}
}


async function enviarFormulario() {
    const motivoRejei = document.getElementById("motivoRejei").value;
    const local = document.getElementById("local").value;
    
    try {
       let resposta = await fetch(`${link}/envia`,{
           method: "POST",
           mode: "cors",
           headers:{
               "Content-Type":"application/json",
            }, 
            body: JSON.stringify({
                motivoRejei : motivoRejei,
                local : local,
            }),
        } 
    )
    let dados = await resposta.text();
    alert(dados);
    apagarInputs();
} catch(err) {
    console.log(err);
}
}

function apagarInputs(){
    document.getElementById("motivoRejei").value = "";
    document.getElementById("local").value = "";
    document.getElementById("motivo").value = "opt";
    document.getElementById("conf").value = "opt";
    document.getElementById("texto").value = "";
}

