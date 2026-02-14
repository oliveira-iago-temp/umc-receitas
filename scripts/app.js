(function () {
  var receitas = [
    {
      id: 1,
      titulo: "Bolo de Cenoura",
      descricao: "Receita clássica de bolo de cenoura fofinho com cobertura de chocolate.",
      imagem: "assets/images/bolo_cenoura_horizontal.jpg",
      imagemAlt: "Fatia de bolo de cenoura com cobertura de chocolate",
      ingredientes: [
        "3 cenouras médias picadas",
        "3 ovos",
        "1 xícara de óleo",
        "2 xícaras de açúcar",
        "2 e 1/2 xícaras de farinha de trigo",
        "1 colher (sopa) de fermento em pó"
      ],
      passos: [
        "Bata no liquidificador a cenoura, os ovos e o óleo.",
        "Adicione o açúcar e bata mais um pouco.",
        "Transfira para uma tigela e misture farinha e fermento.",
        "Coloque em forma untada e asse por 40 minutos a 180 graus."
      ]
    },
    {
      id: 2,
      titulo: "Bolo de Chocolate",
      descricao: "Um bolo simples e saboroso para qualquer momento do dia.",
      imagem: "assets/images/receitas-de-bolo-de-chocolate-simples.jpeg",
      imagemAlt: "Bolo de chocolate com cobertura",
      ingredientes: [
        "3 ovos",
        "2 xícaras de farinha de trigo",
        "1 xícara de açúcar",
        "1 xícara de chocolate em pó",
        "1 xícara de leite",
        "1/2 xícara de óleo",
        "1 colher (sopa) de fermento em pó"
      ],
      passos: [
        "Misture os ovos, o açúcar, o óleo e o leite.",
        "Adicione a farinha e o chocolate em pó.",
        "Misture bem e coloque o fermento por último.",
        "Asse em forno pré-aquecido a 180 graus por 35 a 40 minutos."
      ]
    },
    {
      id: 3,
      titulo: "Strogonoff de Frango",
      descricao: "Receita prática para o almoço, servida com arroz branco e batata palha.",
      imagem: "assets/images/strogonoff-de-frango-simples-e-rapido.jpeg",
      imagemAlt: "Prato de strogonoff servido com arroz",
      ingredientes: [
        "500 g de frango em cubos",
        "1 colher (sopa) de manteiga",
        "1/2 cebola picada",
        "2 colheres (sopa) de ketchup",
        "1 colher (sopa) de mostarda",
        "1 caixa de creme de leite",
        "Sal e pimenta a gosto"
      ],
      passos: [
        "Refogue a cebola na manteiga e adicione o frango.",
        "Cozinhe até dourar e tempere com sal e pimenta.",
        "Adicione ketchup e mostarda e misture.",
        "Desligue o fogo, acrescente o creme de leite e sirva."
      ]
    }
  ];

  inicializarPaginaInicial();
  inicializarPaginaReceita();

  function inicializarPaginaInicial() {
    var listaCards = document.getElementById("lista-cards-receitas");
    if (!listaCards) {
      return;
    }

    listaCards.innerHTML = "";

    receitas.forEach(function (receita) {
      var card = document.createElement("article");
      card.className = "card-receita";

      var link = document.createElement("a");
      link.href = "pages/receita.html?id=" + receita.id;
      link.className = "card-receita-link";

      var imagem = document.createElement("img");
      imagem.className = "card-receita-imagem";
      imagem.src = receita.imagem;
      imagem.alt = receita.imagemAlt;

      var conteudo = document.createElement("div");
      conteudo.className = "card-receita-conteudo";

      var titulo = document.createElement("h2");
      titulo.textContent = receita.titulo;

      var descricao = document.createElement("p");
      descricao.textContent = receita.descricao;

      conteudo.appendChild(titulo);
      conteudo.appendChild(descricao);
      link.appendChild(imagem);
      link.appendChild(conteudo);
      card.appendChild(link);
      listaCards.appendChild(card);
    });
  }

  function inicializarPaginaReceita() {
    var tituloReceita = document.getElementById("titulo-receita");
    if (!tituloReceita) {
      return;
    }

    var parametros = new URLSearchParams(window.location.search);
    var idSolicitado = Number(parametros.get("id"));
    var receita = receitas.find(function (item) {
      return item.id === idSolicitado;
    });

    if (!receita) {
      receita = receitas[0];
    }

    document.title = "UMC Receitas | " + receita.titulo;
    tituloReceita.textContent = receita.titulo;
    document.getElementById("descricao-receita").textContent = receita.descricao;

    var imagem = document.getElementById("imagem-receita");
    imagem.src = resolverCaminhoImagem(receita.imagem);
    imagem.alt = receita.imagemAlt;

    var listaIngredientes = document.getElementById("lista-ingredientes");
    listaIngredientes.innerHTML = "";
    receita.ingredientes.forEach(function (ingrediente) {
      var li = document.createElement("li");
      li.textContent = ingrediente;
      listaIngredientes.appendChild(li);
    });

    var listaPassos = document.getElementById("lista-passos");
    listaPassos.innerHTML = "";
    receita.passos.forEach(function (passo) {
      var li = document.createElement("li");
      li.textContent = passo;
      listaPassos.appendChild(li);
    });
  }

  function resolverCaminhoImagem(caminho) {
    var emSubpastaPages = window.location.pathname.indexOf("/pages/") !== -1;
    if (!emSubpastaPages) {
      return caminho;
    }
    if (caminho.indexOf("http://") === 0 || caminho.indexOf("https://") === 0) {
      return caminho;
    }
    if (caminho.indexOf("../") === 0 || caminho.indexOf("/") === 0) {
      return caminho;
    }
    return "../" + caminho;
  }
})();
