// Variável para armazenar o estado anterior da lista
let ultimaListaCarregada = "";

// Função para carregar os interesses do localStorage (Exercício 1)
const carregarInteresses = () => {
  const interessesArmazenados = localStorage.getItem("meus-interesses");
  const interessesString = interessesArmazenados || "[]";

  // Verificar se houve mudanças na lista
  if (interessesString === ultimaListaCarregada) {
    return; // Não recriar se não houve mudanças
  }

  // Atualizar o estado anterior
  ultimaListaCarregada = interessesString;

  const listaInteresses = document.querySelector("#lista-ul");
  listaInteresses.innerHTML = ""; // Limpeza dos dados antes de carregar

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

  // Exercício 3 - Atualizar a lista a cada 1 segundo (1000 milissegundos)
  setInterval(carregarInteresses, 1000);

  // Adicionar evento de clique ao botão
  document
    .getElementById("btn-adicionar")
    .addEventListener("click", adicionarInteresse);
});
