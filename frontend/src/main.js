document.getElementById('search-button').addEventListener('click', () => {
const keyword = document.getElementById('keyword').value;

  // deve verificar se a palavra chave foi fornecida
  if (!keyword.trim()) {
    alert('Por favor, insira uma palavra-chave');
    return;
  }

  // deve fazer requisição para o backend
  fetch(`http://localhost:3000/api/scrape/${encodeURIComponent(keyword)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao buscar dados');
      }
      return response.json();
    })
    .then(data => {
      displayResults(data.results); // função logo baixo, deve exibir os resultados
    })
    .catch(error => {
      console.error(error); 
      alert('Ocorreu um erro ao buscar os dados');
    });
});

// função para exibir os resultados
function displayResults(results) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // deve limpar conteudo de pesquisas anteriores

  // deve retornar uma mensage caso o array de resultado estiver vazio, informando que nenhum produto foi encontrado
  if (results.length === 0) {
    resultsContainer.innerHTML = '<p>Nenhum produto encontrado.</p>';
    return;
  }

  results.forEach(product => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');

    resultItem.innerHTML = `
    <a href="${product.link}" target="_blank" classname=> 
      <img src="${product.image}" alt="${product.title}">
      
      <div class="details">
        <h3>${product.title}</h3>
        <p>Preço: R$ ${product.price}</p>
        <p>Classificação: ${product.rating}</p>
      </div>
    `;

    resultsContainer.appendChild(resultItem);
  });
}
