const url = new URL(window.location.href);
id = url.searchParams.get("id");

const itemNome = document.getElementById("nome");
const itemBanner = document.getElementById("banner");
const itemAtracoes = document.getElementById("atracoes");
const itemDescricao = document.getElementById("descricao");
const itemData = document.getElementById("data");
const itemLotacao = document.getElementById("lotacao");

fetch(`https://xp41-soundgarden-api.herokuapp.com/events`)
    .then ( data => (data.json()))
    .then ( evento => { evento.forEach(item => {
        if (item._id == id) {
            itemNome.value = item.name;
            itemBanner.value = item.poster;
            itemAtracoes.value = item.attractions;
            itemDescricao.value = item.description;
            itemData.value = item.scheduled;
            itemLotacao.value = item.number_tickets;
    }})})
    .catch(erro => console.log(erro));

const btnEnviar = document.querySelector("button");
btnEnviar.addEventListener("click", (evento) => {
    evento.preventDefault();

    const data = document.getElementById("data").value;
    const dateObject = new Date(data);
    const isoDate = dateObject.toISOString();    

    const body = {
        name: itemNome.value,
        poster: itemBanner.value,
        attractions: [itemAtracoes.value],
        description: itemDescricao.value,
        scheduled:  isoDate,
        number_tickets: itemLotacao.value
    }

    const eventoEditar = {
        method: 'PUT',
        body: JSON.stringify(body), 
        headers: {"Content-Type":"application/json"},
    }
    fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${id}`, eventoEditar)
    .then(response => response.json())
    .then(result => {
        if(result.error) {
            throw new Error(result.details.body[0].message);
        }
        alert('Editado com sucesso!');
        window.location.href = "admin.html";
    })
    .catch(error => {
        alert('Algo saiu errado, tente novamente!');
        console.error(error);
    })
});