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

// Função para limpar toda a lista (Exercício 4)
const limparLista = () => {
  // Remover a chave do localStorage
  localStorage.removeItem("meus-interesses");

  // Atualizar a lista no DOM para refletir a mudança
  carregarInteresses();
};

// ========== EXERCÍCIO 5 - BUSCAR NOTÍCIAS DO IBGE ==========
const buscarNoticiasIBGE = async () => {
  const noticiaConteudo = document.getElementById("noticia-conteudo");

  // Mostrar loading
  noticiaConteudo.innerHTML = '<p class="loading">Carregando notícia...</p>';

  try {
    // 1. Fazer requisição usando fetch()
    const response = await fetch(
      "https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release"
    );

    // 2. Converter para JSON usando callback
    const data = await response.json();

    // 3. Pegar o primeiro elemento da propriedade "items"
    if (data.items && data.items.length > 0) {
      const primeiraNoticia = data.items[0];
      const titulo = primeiraNoticia.titulo;

      // Exibir o título da primeira notícia
      noticiaConteudo.innerHTML = `<p class="noticia-titulo">${titulo}</p>`;
    } else {
      noticiaConteudo.innerHTML =
        '<p class="erro-noticia">Nenhuma notícia encontrada.</p>';
    }
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    noticiaConteudo.innerHTML =
      '<p class="erro-noticia">Erro ao carregar notícia. Tente novamente.</p>';
  }
};

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Carregar interesses quando a página carregar
  carregarInteresses();

  // ========== EXERCÍCIO 5 - Buscar notícias quando a página carregar ==========
  buscarNoticiasIBGE();

  // Exercício 3 - Atualizar a lista a cada 1 segundo (1000 milissegundos)
  setInterval(carregarInteresses, 1000);

  // Adicionar evento de clique ao botão adicionar
  document
    .getElementById("btn-adicionar")
    .addEventListener("click", adicionarInteresse);

  // Exercício 4 - Adicionar evento de clique ao botão limpar
  document.getElementById("btn-limpar").addEventListener("click", limparLista);

  // ========== EXERCÍCIO 5 - Evento para atualizar notícia ==========
  document
    .getElementById("btn-atualizar")
    .addEventListener("click", buscarNoticiasIBGE);
});
