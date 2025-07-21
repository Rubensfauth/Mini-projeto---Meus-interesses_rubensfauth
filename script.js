// Função para carregar os interesses do localStorage (Exercício 1)
const carregarInteresses = () => {
  const listaInteresses = document.querySelector("#lista-ul");
  listaInteresses.innerHTML = "";

  const interessesArmazenados = localStorage.getItem("meus-interesses");

  if (interessesArmazenados) {
    const interesses = JSON.parse(interessesArmazenados);

    interesses.forEach((interesse) => {
      const novoItem = document.createElement("li");
      novoItem.textContent = interesse;
      listaInteresses.appendChild(novoItem);
    });
  }
};

// Carregar interesses quando a página carregar
document.addEventListener("DOMContentLoaded", carregarInteresses);
