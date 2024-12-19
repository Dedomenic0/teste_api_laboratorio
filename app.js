async function salvarTexto() {
    const texto = document.getElementById("texto").value;
    const conf = document.getElementById("conf").value;
    const motivo = document.getElementById("motivo").value;

    if (texto == "" || conf == "opt") {
        alert("Preencha todos os campos")
        return
    }

   try { fetch("http://localhost:8080/salva",{
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
