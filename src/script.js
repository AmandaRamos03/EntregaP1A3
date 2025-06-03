let carrinho = [];
const contador = document.getElementById('contador-carrinho');
const carrinhoSidebar = document.getElementById('carrinhoAba');
const lista = document.getElementById('itensCarrinho');

// Eventos de abrir/fechar carrinho
document.getElementById('fecharCarrinho').onclick = () => {
  carrinhoSidebar.classList.remove('aberto');
};

function abrirCarrinho() {
  carrinhoSidebar.classList.add('aberto');
}

// Função para adicionar item ao carrinho
function adicionarAoCarrinho(nome, preco) {
  const itemExistente = carrinho.find(item => item.nome === nome);
  if (itemExistente) {
    itemExistente.qtd += 1;
  } else {
    carrinho.push({ nome, preco, qtd: 1 });
  }
  atualizarCarrinho();
}

// Função para remover item do carrinho
function removerItem(nome) {
  const item = carrinho.find(i => i.nome === nome);
  if (item) {
    item.qtd -= 1;
    if (item.qtd <= 0) {
      carrinho = carrinho.filter(i => i.nome !== nome);
    }
  }
  atualizarCarrinho();
}

function atualizarCarrinho() {
  lista.innerHTML = '';
  let subtotal = 0;

  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.qtd}x ${item.nome} - R$ ${(item.qtd * item.preco).toFixed(2)}
      <button onclick="removerItem('${item.nome}')">❌</button>
    `;
    lista.appendChild(li);
    subtotal += item.qtd * item.preco;
  });

  contador.textContent = carrinho.reduce((sum, item) => sum + item.qtd, 0);

  const desconto = 0;
  const entrega = 5;
  const total = Math.max(0, subtotal - desconto + entrega);

  const totalSpan = document.getElementById('totalCarrinho');
  if (totalSpan) {
    totalSpan.textContent = total.toFixed(2);
  }

  const btnPagamento = document.querySelector('.btn-ir-pagamento');
  if (carrinho.length > 0 && contador.textContent > 0) {
    btnPagamento.style.display = 'block';
  } else {
    btnPagamento.style.display = 'none';
  }

  // 💾 Aqui é onde você deve salvar o carrinho no localStorage:
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}


// Função para redirecionar para a página de pagamento
function irParaPagamento() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho)); // força salvar antes de sair
  window.location.href = "pagamento/index.html";
}
