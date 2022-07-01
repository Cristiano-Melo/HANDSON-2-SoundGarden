let eventoID;

function exibirEventos(eventos) {
    eventos.forEach(evento => {
//Clona o modelo de elemento HTML do evento para ser edidato mais abaixo
    const eventoModel = document.querySelector('.modelo article').cloneNode(true);        
//Formata a data pro padrao local dd/mm/yyyy
    const data = new Date(evento.scheduled);
    const dataFormatada = data.toLocaleDateString();
    eventoModel.querySelector('h2').innerHTML = `${evento.name} - ${dataFormatada}`;
    eventoModel.querySelector('h4').innerHTML = evento.attractions.join(', ');
    eventoModel.querySelector('p').innerText = evento.description;
//Adiciona um evento de click em cada botão reservar ingresso
    eventoModel.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
//Seleciona o modal e atribui a variavel modal pra ele
        const modal = document.querySelector('.modal');         
//Muda o display do modal que está 'none' pra 'flex'
        modal.style.display = 'flex';
//Adiciona no titulo o nome + data do evento
        document.querySelector('.modal-window p').innerHTML = `<b>Evento</b>: ${evento.name}<br><b>Data</b>: ${dataFormatada}`
            
//Adicionando função do botão de fechar modal
        document.querySelector('.modal-window span').addEventListener('click', () => {
            modal.style.display = 'none';
    })
//Seta o id do evento atual acessado ao clicar no no botao de reservar
            eventoID = evento._id
    })
        //Apos preparar nosso elemento HTML com as informacoes desse evento
        //Entao usamos um append para adiciona-lo na pagina
        //No HTML peguei a Div que guarda os elementos e dei um id 'boxEventos' para ela
        document.getElementById('boxEventos').append(eventoModel);
    });
}

try {
    fetch('https://xp41-soundgarden-api.herokuapp.com/events')
    .then(data => data.json())
    .then(listaEventos => exibirEventos(listaEventos))

} catch (error) {
    console.error(error);
}
