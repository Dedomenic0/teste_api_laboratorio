const link = "http://localhost:3000";
pegaLocais()

//envia os inputs recebidos para o link pelo metodo post
async function salvarTexto() {
    const texto = document.getElementById("texto").value;
    const coleta = document.getElementById("Coleta").value;
    const motivo = document.getElementById("motivo").value;
    const verificacao = document.getElementById("locais").textContent;
    const rota = document.getElementById("setor").value;
    
    
    //verifica se os campos foram preenchidos corretamente
    if (texto == "" || coleta == "" || motivo == "opt" || rota == "opt") {
        alert("Preencha todos os campos");
        return;
    }
    
    //verifica se o campo local da coleta foi preencido com um local existente
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
    const data = document.getElementById("data").value;

    //verifica o mês informado, se foi informada uma data e se ela é maior que o mês atual
    if (data == "00") {
        alert ("Selecione um mês valido!");
        return;
    };
    
    try {
       await fetch(`${link}/envia`,{
            method: "POST",
            mode: "cors",
            headers:{
                "Content-Type":"application/json",
            }, 
            body: JSON.stringify({
                data : data
            })
        } 
    )
    .then(response => response.json())
    .then(data => {
        console.log("ok", data),
        apagarInputs(),
        alert(data.Response)})
    
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
    document.getElementById("setor").value = "opt";
}

//pega os locais pela rota Get e transforma em options no HTML
async function pegaLocais() {    
try {
    await fetch (`${link}/locais`, {
        method: "GET",
            mode: "cors",
            headers:{
                "Content-Type":"application/json",
            } 
    })
    .then(response => response.json())
    .then(data => {
        const listaLocais = document.getElementById('locais');

        data.forEach(data => {
        const option = document.createElement('option')
        option.textContent = data;
        option.value = data
        listaLocais.appendChild(option);
        })
    })
} catch (err) {
    console.error(err);
}
}
