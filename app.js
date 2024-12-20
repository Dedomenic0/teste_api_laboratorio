async function salvarTexto() {
    const texto = document.getElementById("texto").value;
    const conf = document.getElementById("conf").value;
    const motivo = document.getElementById("motivo").value;
    
    if (texto == "" || conf == "opt") {
        alert("Preencha todos os campos")
        return
    }
    
    try {
     fetch("http://localhost:8080/salva",{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        }, 
        body: JSON.stringify({
             texto : texto,
             conf : conf,
             motivo : motivo
            })
        })

}catch (err){
    console.log(err)
}
}


async function enviarFormulario() {
    const motivoRejei = document.getElementById("motivoRejei").value;
    const local = document.getElementById("local").value;
    try {
       let resposta = fetch("http://localhost:8080/envia",{
           method: "POST",
           headers:{
               "Content-Type":"application/json",
            }, 
            body: JSON.stringify({
                motivoRejei : motivoRejei,
                local : local,
            }),
        }
    )
    alert (await resposta.text)
} catch(err) {
    console.log(err)
}
}