let cardContainer = document.querySelector(".card-container");
let dados = [];
let botaoBusca = document.querySelector("#botao-busca");

// Adiciona um seletor para o campo de busca
let campoBusca = document.querySelector("#campo-busca");

botaoBusca.addEventListener("click", iniciarBusca);

async function iniciarBusca() {
    // Só busca os dados do JSON se ainda não tiverem sido carregados
    if (dados.length === 0) {
        let resposta = await fetch ("data.json");
        dados = await resposta.json();
    }

    // Pega o termo digitado no campo de busca, em minúsculas
    let termoBusca = campoBusca.value.toLowerCase();

    // Filtra os dados com base no termo de busca (no nome ou na descrição)
    const dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    // Limpa os cards existentes antes de renderizar novos
    cardContainer.innerHTML = "";

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.ano}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
        `
        cardContainer.appendChild(article);
    }
}