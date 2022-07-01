fetch ("https://xp41-soundgarden-api.herokuapp.com/events")
    .then(data => data.json())
    .then(eventos => {
        eventos.forEach((evento, item) => {
            const tabela = document.querySelector(".table");
            const linha = tabela.insertRow(tabela.rows.length);
            const th = document.createElement("th");
            th.innerHTML = item + 1;
            th.setAttribute("scope", "row");
            linha.appendChild(th);
            const data = new Date(evento.scheduled);
            const dataLocal = data.toLocaleDateString();
            linha.insertCell(1).innerText = `${dataLocal} ${evento.scheduled.substring(11, 16)}`;
            linha.insertCell(2).innerText = evento.name;
            linha.insertCell(3).innerText = evento.attractions.join(', ');          
            //btn reservas
            const btnReservas = document.createElement("a");
            btnReservas.innerText = "ver reservas";
            btnReservas.classList.add("btn");
            btnReservas.classList.add("btn-dark");
            btnReservas.setAttribute("href", "")
            btnReservas.addEventListener('click',(e) => {
            e.preventDefault();
            document.querySelector('.modalBackground').style.display = 'flex';
            listarReservas(evento._id)       
            })
            //btn editar
            const btnEditar = document.createElement("a");
            btnEditar.innerText= "editar";
            btnEditar.classList.add("btn");
            btnEditar.classList.add("btn-secondary");
            btnEditar.setAttribute("href", `editar-evento.html?id=${evento._id}`);
            //btn excluir
            const btnDel = document.createElement("a");
            btnDel.innerText = "deletar";
            btnDel.classList.add("btn");
            btnDel.classList.add("btn-danger");
            btnDel.setAttribute("href", `excluir-evento.html?id=${evento._id}`);

            const btn = document.createElement("td");
            btn.append(btnDel, btnReservas, btnEditar);
            linha.append(btn);
        })
    })
        .catch(error => console.log(error));

        
async function listarReservas(id) {
    const listaDeReservas = await fetch(`https://xp41-soundgarden-api.herokuapp.com/bookings/event/${id}`)
    .then (data => data.json())
    .catch(error => console.log(error))

    if(listaDeReservas.length < 1) {
        document.querySelector('.divTable').innerHTML = "Não há reservas para esse evento"
        return;
    }

    listaDeReservas.forEach((reserva, index) => {
        const tabelaReservas = document.querySelector('.modalTable tbody');
        const linha = tabelaReservas.insertRow(tabelaReservas.rows.length);
        const pk = document.createElement('th');
        pk.innerHTML = index+1
        linha.append(pk)
        linha.insertCell(1).innerText = reserva.owner_name;
        linha.insertCell(2).innerText = reserva.owner_email;
        linha.insertCell(3).innerText = reserva.number_tickets;
    })
}
    async function listarReservas(id) {
        //Faz uma requisicao GET com o fetch e recebe a lista de reservas em json
        const listaDeReservas = await fetch(`https://xp41-soundgarden-api.herokuapp.com/bookings/event/${id}`)
            .then(data => data.json())
            .catch(error => console.log(error))
        if(listaDeReservas.length < 1) {
            document.querySelector('.divTable').innerHTML = "Não há reservas para esse evento"
            return;
        }
    
        listaDeReservas.forEach((reserva, item) => {
            const tabelaReservas = document.querySelector('.modalTable tbody');
            const linha = tabelaReservas.insertRow(tabelaReservas.rows.length);
            const pk = document.createElement('th');
            pk.innerHTML = item+1; //Seta o valor do numero pelo indice
            linha.append(pk);
            linha.insertCell(1).innerText = reserva.owner_name;
            linha.insertCell(2).innerText = reserva.owner_email;
            linha.insertCell(3).innerText = reserva.number_tickets;
        })
    }
// Fecha o Modal Clicando no X e limpa todo o formulário para não atrapalhar a próxima exibição
    function closeModal() {    
        //Seleciona e muda o modal para display: 'none' ao clicar no X
        document.querySelector('.modalBackground').style.display = 'none';
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        table.classList.add("modalTable")
        const linhaHead = thead.insertRow(thead.rows.length);
        const thnumber = document.createElement('th');
        thnumber.innerText = "#";
        thnumber.setAttribute("scope", "col")
        const thnome = document.createElement('th');
        thnome.innerText = "Nome";
        thnome.setAttribute("scope", "col")
        const themail = document.createElement('th');
        themail.innerText = "Email";
        themail.setAttribute("scope", "col")
        const thtickets = document.createElement('th');
        thtickets.innerText = "Tickets";
        thtickets.setAttribute("scope", "col")
        //Adiciona as colunas criadas na linha, mas a linha ainda nao foi adicionada no HTML
        linhaHead.append(thnumber, thnome, themail, thtickets)
        table.append(thead, tbody);
        document.querySelector('.divTable').innerHTML = ''; //Limpa os resultados anteriores da tabela
        document.querySelector('.divTable').append(table); //Adiciona a tabela criada no HTML do modal
    }
    

