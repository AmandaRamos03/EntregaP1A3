document.addEventListener("DOMContentLoaded", () => {
  const containerResumo = document.getElementById("resumo-pedido");
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  console.log("Carrinho carregado:", carrinho);

  let subtotal = 0;

  if (carrinho.length === 0) {
    containerResumo.innerHTML = "<p style='color: gray;'>Carrinho vazio.</p>";
  } else {
    const itensHtml = carrinho.map(item => {
      const totalItem = item.qtd * item.preco;
      subtotal += totalItem;
      return `
        <div class="item">
          <p>${item.nome} (x${item.qtd})</p>
          <span>R$ ${totalItem.toFixed(2)}</span>
        </div>
      `;
    }).join("");

    const taxaEntrega = 5.00;
    const total = subtotal + taxaEntrega;

    containerResumo.innerHTML = `
      ${itensHtml}
      <hr />
      <div class="item"><p>Subtotal</p><span>R$ ${subtotal.toFixed(2)}</span></div>
      <div class="item"><p>Taxa de Entrega</p><span>R$ ${taxaEntrega.toFixed(2)}</span></div>
      <div class="item total"><p><strong>Total</strong></p><span><strong>R$ ${total.toFixed(2)}</strong></span></div>
    `;
  }
});

function enviarDadosEntrega() {
  const nome = document.getElementById("nome")?.value.trim();
  const endereco = document.getElementById("endereco")?.value.trim();
  const telefone = document.getElementById("telefone")?.value.trim();

  console.log("Nome:", nome);
  console.log("Endereço:", endereco);
  console.log("Telefone:", telefone);

  if (!nome || !endereco) {
    alert("Por favor, preencha nome e endereço.");
    return;
  }

  const dadosEntrega = {
    nome,
    endereco,
    telefone
  };c

  localStorage.setItem("dadosEntrega", JSON.stringify(dadosEntrega));
  alert("Dados enviados com sucesso!");
}

function copiarCodigoPix() {
  const input = document.getElementById("codigoPix");
  input.select(); // Seleciona o texto
  input.setSelectionRange(0, 99999); // Para compatibilidade com mobile

  try {
    document.execCommand("copy");
    alert("Código Pix copiado com sucesso!");
  } catch (err) {
    alert("Não foi possível copiar o código.");
  }
}

 function mostrarPagamento(metodo) {
    const abas = document.querySelectorAll('.tab');
    const infos = document.querySelectorAll('.pagamento-info');

    // Esconde todos os blocos e desativa abas
    infos.forEach(info => info.style.display = 'none');
    abas.forEach(tab => tab.classList.remove('ativo'));

    // Ativa a aba clicada e mostra a respectiva seção
    document.getElementById(metodo).style.display = 'block';
    const abaAtiva = Array.from(abas).find(tab => tab.textContent.toLowerCase() === metodo);
    if (abaAtiva) abaAtiva.classList.add('ativo');
  }
function finalizarPagamento() {
    window.location.href = "sucesso.html"; // redireciona para a nova página
  }