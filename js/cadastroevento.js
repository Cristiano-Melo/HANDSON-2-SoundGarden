// Guarda os Imputs em uma variável
const form = document.querySelector('#formCadEvent')

//Adicionando um evento de submit assim que o botão for apertado

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event);
    var nome = form.elements['nome'];
    var atracoes = form.elements['atracoes'];
    var descricao = form.elements['descricao'];
    var lotacao = form.elements['lotacao'];
// Realizando a conversão do formato da data para o exigido pela API
    const data = document.getElementById("data").value;
    const dateObject = new Date(data);
    const isoDate = dateObject.toISOString();
 
    
    const body = {
        name: nome.value,
        poster: "https://i.imgur.com/fQHuZuv.png",
        attractions: atracoes.value.split(','),
        description: descricao.value,
        scheduled:  isoDate,
        number_tickets: lotacao.value
    }
    
    const requisicao = {
      method: 'POST',
      body: JSON.stringify(body), // aqui o evento está sendo convertido em JSON
      headers: {
        "Content-Type":"application/json"
      }
    }
//Realiza o envio das informações para a API
    fetch(`https://xp41-soundgarden-api.herokuapp.com/events`, requisicao)
        .then(response => response.json())
        .then(result => {//Emite um erro se retornar algum statuscode/messagem de erro
          if(result.error) {
              throw new Error(result.details.body[0].message);
          }
            alert('Evento cadastrado com sucesso!'); //Mostra um alerta de sucesso
            setTimeout(function() {
                window.location.href = "./admin.html";
            }, 1000);
        })
        .catch(error => {
            //Mostra um alerta informando erro e printa no console o erro
            alert('Algo saiu errado, tente novamente!');
            console.log(error);
        })
})









