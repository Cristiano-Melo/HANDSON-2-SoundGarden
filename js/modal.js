//Função do botão reservar do modal
document.querySelector('.modal-window a').addEventListener('click', (e) => {
    e.preventDefault();

    const modal = document.querySelector('.modal');
    //Seleciona os inputs/campos do modal e atribui uma variavel a eles
    let nome = document.querySelector(`.modal-window #nomeInput`);
    let email = document.querySelector(`.modal-window #emailInput`);
    let qntTickets = document.querySelector(`.modal-window label > input`);
    
    //Body da requisicao
    let body = {
        owner_name: nome.value,
        owner_email: email.value,
        number_tickets: qntTickets.value,
        event_id: eventoID
    }
    //Detalhes da requisicao
    const requisicao = {
        method: 'POST',
        body: JSON.stringify(body), //Aqui é passamos o body e convertemos em string
        headers: {"Content-type": "application/json"}
    }
    //Faz a uma requisicao POST para reservar o(s) ticket(s)
    fetch("https://xp41-soundgarden-api.herokuapp.com/bookings", requisicao)
        .then(response => {
            //Emite um erro se retornar algum statuscode de erro
            //Ao emitir o erro, ele interrompe o .then e cai no .catch
            if(response.status != 201) {
                throw new Error();
            }

            modal.style.display = 'none'; //Fecha o modal
            nome.value = "";
            email.value = "";
            qntTickets.value = 1;

            alert('Reservado com sucesso!');
        })
        .catch(error => {
            //Mostra um alerta informando erro e printa no console o erro
            alert('Algo saiu errado, tente novamente :C');
            console.error('error: ', error.message);
        })
})