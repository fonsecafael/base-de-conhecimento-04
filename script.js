const searchInput = document.querySelector('input[type="text"]');
const cardContainer = document.querySelector('.card-container');

async function fetchData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`Erro HTTP! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Não foi possível carregar os dados:", error);
        return [];
    }
}

function createCard(item) {
    const card = document.createElement('article');
    card.className = 'card';

    const year = item.ano || item.data_criacao;

    card.innerHTML = `
        <h2>${item.nome}</h2>
        <p>${year}</p>
        <p>${item.descricao}</p>
        <a href="${item.link}" target="_blank">Saiba mais</a>
    `;
    return card;
}

async function iniciarBusca() {
    const searchTerm = searchInput.value.toLowerCase();
    const data = await fetchData();

    const filteredData = data.filter(item =>
        item.nome.toLowerCase().includes(searchTerm)
    );

    cardContainer.innerHTML = ''; // Limpa os resultados anteriores

    if (filteredData.length > 0) {
        filteredData.forEach(item => {
            const cardElement = createCard(item);
            cardContainer.appendChild(cardElement);
        });
    } else {
        cardContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
    }
}

searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        iniciarBusca();
    }
});