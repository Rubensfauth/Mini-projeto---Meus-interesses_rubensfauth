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

// Função para adicionar novo interesse (Exercício 2)
const adicionarInteresse = () => {
  const input = document.getElementById("interesse-input");
  const novoInteresse = input.value.trim();

  // Verificar se o input não está vazio
  if (!novoInteresse) return;

  // Recuperar a lista existente do localStorage
  const interessesArmazenados = localStorage.getItem("meus-interesses");
  const interesses = interessesArmazenados
    ? JSON.parse(interessesArmazenados)
    : [];

  // Adicionar o novo interesse à lista
  interesses.push(novoInteresse);

  // Persistir os dados atualizados no localStorage
  localStorage.setItem("meus-interesses", JSON.stringify(interesses));

  // [BONUS] Limpar o input
  input.value = "";

  // Recarregar a lista para mostrar o novo interesse
  carregarInteresses();
};

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Carregar interesses quando a página carregar
  carregarInteresses();

  // Atualizar a lista a cada 1 segundo (1000 milissegundos)(Exercício 3)
  setInterval(carregarInteresses, 1000);

  // Adicionar evento de clique ao botão
  document
    .getElementById("btn-adicionar")
    .addEventListener("click", adicionarInteresse);
});
