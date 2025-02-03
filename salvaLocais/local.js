const link = "http://localhost:3000";

async function novoLocal() {
    const local = document.getElementById("novoLocal").value;

    try {
        await fetch(`${link}/novoLocal`,{
             method: "POST",
             mode: "cors",
             headers:{
                 "Content-Type":"application/json",
             }, 
             body: JSON.stringify({
                local : local
             })
         } 
     )
     .then(response => response.json())
     .then(data => {
         console.log("ok", data)
         })
        } catch(err) {
            console.error(err);
            alert("Falha ao conectar com o servidor!");
        } 
        local = document.getElementById("novoLocal").value = '';
 }
