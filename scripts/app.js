(function () {
  var API_BASE = "https://www.themealdb.com/api/json/v1/1";
  var MAX_RECEITAS_API = 50;
  var RECEITAS_POR_PAGINA = 12;
  var IMAGEM_FALLBACK_LOCAL = "assets/images/receitas/empty.jpg";

  var estado = {
    receitas: [],
    paginaAtual: 1
  };

  var receitasLocais = [
    {
      id: 1,
      titulo: "Bolo de Cenoura",
      descricao: "Receita clássica de bolo de cenoura fofinho com cobertura de chocolate.",
      imagem: "assets/images/receitas/bolo-cenoura-horizontal.jpg",
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
      imagem: "assets/images/receitas/receitas-de-bolo-de-chocolate-simples.jpg",
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
      imagem: "assets/images/receitas/strogonoff-de-frango-simples-e-rapido.jpg",
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
    },
    {
      id: 4,
      titulo: "Feijoada",
      descricao: "Feijoada completa para almoço de domingo.",
      imagem: "assets/images/receitas/feijoada.jpg",
      imagemAlt: "Prato de feijoada",
      ingredientes: ["500 g de feijão preto", "300 g de carne seca", "200 g de linguiça calabresa", "1 cebola", "3 dentes de alho", "Sal a gosto"],
      passos: ["Deixe o feijão e as carnes de molho.", "Cozinhe o feijão com as carnes na pressão.", "Refogue alho e cebola e misture ao feijão.", "Finalize com sal e sirva com arroz e couve."]
    },
    {
      id: 5,
      titulo: "Pão de Queijo",
      descricao: "Pão de queijo mineiro simples e macio.",
      imagem: "assets/images/receitas/pao-de-queijo.jpg",
      imagemAlt: "Pães de queijo assados",
      ingredientes: ["500 g de polvilho azedo", "250 ml de leite", "100 ml de óleo", "2 ovos", "200 g de queijo minas ralado", "Sal a gosto"],
      passos: ["Ferva leite com óleo e sal.", "Escalde o polvilho com a mistura quente.", "Adicione ovos e queijo e misture.", "Modele bolinhas e asse até dourar."]
    },
    {
      id: 6,
      titulo: "Brigadeiro",
      descricao: "Doce brasileiro clássico para festa.",
      imagem: "assets/images/receitas/brigadeiro-receita.jpg",
      imagemAlt: "Brigadeiros em forminhas",
      ingredientes: ["1 lata de leite condensado", "1 colher (sopa) de manteiga", "3 colheres (sopa) de chocolate em pó", "Granulado"],
      passos: ["Leve tudo ao fogo baixo, mexendo sempre.", "Cozinhe até desgrudar do fundo.", "Deixe esfriar.", "Enrole e passe no granulado."]
    },
    {
      id: 7,
      titulo: "Moqueca de Peixe",
      descricao: "Moqueca com leite de coco e pimentões.",
      imagem: "assets/images/receitas/moqueca-de-tilapia-1688388658865.jpg",
      imagemAlt: "Moqueca de peixe na panela",
      ingredientes: ["800 g de peixe em postas", "1 cebola", "1 pimentão", "2 tomates", "200 ml de leite de coco", "Coentro"],
      passos: ["Tempere o peixe com limão e sal.", "Monte camadas de legumes e peixe na panela.", "Adicione leite de coco e cozinhe em fogo baixo.", "Finalize com coentro e azeite."]
    },
    {
      id: 8,
      titulo: "Coxinha de Frango",
      descricao: "Salgado tradicional com massa de batata.",
      imagem: "assets/images/receitas/coxinha-de-frango.jpg",
      imagemAlt: "Coxinhas fritas",
      ingredientes: ["2 xícaras de frango desfiado", "2 batatas cozidas", "2 xícaras de farinha", "1 colher de manteiga", "Sal", "Óleo para fritar"],
      passos: ["Prepare o recheio com frango temperado.", "Faça a massa com batata e farinha.", "Modele as coxinhas com recheio.", "Empane e frite até dourar."]
    },
    {
      id: 9,
      titulo: "Tapioca Recheada",
      descricao: "Lanche rápido com massa de tapioca hidratada.",
      imagem: "assets/images/receitas/tapioca.jpg",
      imagemAlt: "Tapioca dobrada no prato",
      ingredientes: ["Goma de tapioca", "Queijo coalho", "Presunto", "Orégano"],
      passos: ["Espalhe a goma na frigideira quente.", "Quando unir, vire rapidamente.", "Adicione o recheio.", "Dobre e sirva."]
    },
    {
      id: 10,
      titulo: "Canjica",
      descricao: "Doce típico com amendoim e leite condensado.",
      imagem: "assets/images/receitas/canjica-com-leite-condensado-1.jpg",
      imagemAlt: "Canjica cremosa",
      ingredientes: ["500 g de canjica", "1 litro de leite", "1 lata de leite condensado", "200 ml de leite de coco", "Canela"],
      passos: ["Deixe a canjica de molho.", "Cozinhe na pressão até ficar macia.", "Adicione os leites e cozinhe até engrossar.", "Sirva com canela."]
    },
    {
      id: 11,
      titulo: "Arroz Carreteiro",
      descricao: "Arroz com carne seca em uma panela só.",
      imagem: "assets/images/receitas/arroz-carreteiro-soltinho-25-06.jpg",
      imagemAlt: "Arroz carreteiro servido",
      ingredientes: ["2 xícaras de arroz", "300 g de carne seca", "1 cebola", "2 dentes de alho", "Cheiro-verde", "Sal"],
      passos: ["Dessalgue e cozinhe a carne seca.", "Refogue cebola, alho e carne.", "Adicione arroz e água.", "Cozinhe até secar e finalize com cheiro-verde."]
    },
    {
      id: 12,
      titulo: "Escondidinho de Carne Seca",
      descricao: "Purê cremoso com recheio de carne seca.",
      imagem: "assets/images/receitas/escondidinho-carne-seca.jpg",
      imagemAlt: "Escondidinho gratinado",
      ingredientes: ["1 kg de mandioca", "400 g de carne seca desfiada", "1 cebola", "2 colheres de manteiga", "Queijo ralado"],
      passos: ["Faça o purê de mandioca com manteiga.", "Refogue a carne seca com cebola.", "Monte camadas em refratário.", "Cubra com queijo e gratine."]
    },
    {
      id: 13,
      titulo: "Vatapá",
      descricao: "Receita baiana cremosa com camarão.",
      imagem: "assets/images/receitas/vatapa-de-frango-seara-dagranja-portal-minha-receita.jpg",
      imagemAlt: "Vatapá em tigela",
      ingredientes: ["Pão amanhecido", "200 ml de leite de coco", "100 g de camarão seco", "Amendoim", "Castanha", "Azeite de dendê"],
      passos: ["Bata os ingredientes no liquidificador.", "Leve ao fogo baixo mexendo.", "Adicione dendê aos poucos.", "Cozinhe até ficar cremoso."]
    },
    {
      id: 14,
      titulo: "Pudim de Leite",
      descricao: "Sobremesa tradicional com calda de caramelo.",
      imagem: "assets/images/receitas/pudim-de-leite-condensado-com-furinhos-novo-1.jpg",
      imagemAlt: "Pudim de leite desenformado",
      ingredientes: ["1 lata de leite condensado", "2 medidas de leite", "3 ovos", "1 xícara de açúcar"],
      passos: ["Faça a calda de açúcar e coloque na forma.", "Bata os demais ingredientes no liquidificador.", "Despeje na forma e asse em banho-maria.", "Leve para gelar antes de desenformar."]
    },
    {
      id: 15,
      titulo: "Farofa de Banana",
      descricao: "Farofa agridoce para acompanhar carnes.",
      imagem: "assets/images/receitas/farofa-banana.jpg",
      imagemAlt: "Farofa de banana",
      ingredientes: ["2 bananas", "2 colheres de manteiga", "1 cebola", "2 xícaras de farinha de mandioca", "Sal"],
      passos: ["Refogue a cebola na manteiga.", "Adicione a banana em rodelas.", "Junte a farinha e mexa até dourar.", "Ajuste sal e sirva."]
    },
    {
      id: 16,
      titulo: "Bobó de Camarão",
      descricao: "Prato cremoso de mandioca com camarão.",
      imagem: "assets/images/receitas/bobo-de-camarao-receita-2.jpg",
      imagemAlt: "Bobó de camarão",
      ingredientes: ["500 g de camarão", "700 g de mandioca", "200 ml de leite de coco", "1 tomate", "1 cebola", "Coentro"],
      passos: ["Cozinhe e amasse a mandioca.", "Refogue o camarão com tomate e cebola.", "Misture o purê de mandioca e leite de coco.", "Finalize com coentro."]
    },
    {
      id: 17,
      titulo: "Bolo de Fubá",
      descricao: "Bolo caseiro para café da tarde.",
      imagem: "assets/images/receitas/bolo-de-fuba-2.jpg",
      imagemAlt: "Bolo de fubá caseiro",
      ingredientes: ["2 xícaras de fubá", "1 xícara de farinha", "2 xícaras de açúcar", "3 ovos", "1 xícara de leite", "1 colher de fermento"],
      passos: ["Misture os ingredientes líquidos.", "Adicione os secos e mexa.", "Coloque em forma untada.", "Asse por 35 minutos a 180 graus."]
    },
    {
      id: 18,
      titulo: "Torta de Frango",
      descricao: "Torta salgada prática de liquidificador.",
      imagem: "assets/images/receitas/torta-de-frango-de-liquidificador-1.jpg",
      imagemAlt: "Fatia de torta de frango",
      ingredientes: ["2 xícaras de leite", "2 ovos", "1/2 xícara de óleo", "2 xícaras de farinha", "1 colher de fermento", "Frango desfiado"],
      passos: ["Bata os ingredientes da massa.", "Despeje metade em uma forma.", "Adicione o recheio de frango.", "Cubra com o restante da massa e asse até dourar."]
    }
  ];

  inicializar();

  async function inicializar() {
    var receitasApi = await carregarReceitasApi();
    estado.receitas = combinarReceitas(receitasLocais, receitasApi);

    inicializarPaginaInicial();
    await inicializarPaginaReceita();
  }

  async function carregarReceitasApi() {
    try {
      var meals = await buscarMealsPorLetras();

      var receitas = meals.slice(0, MAX_RECEITAS_API).map(function (meal) {
        return {
          id: Number(meal.idMeal),
          titulo: meal.strMeal || "Receita",
          descricao: montarDescricaoCurta(meal),
          imagem: meal.strMealThumb || "assets/images/receitas/empty.jpg",
          imagemAlt: meal.strMeal || "Imagem da receita",
          ingredientes: [],
          passos: []
        };
      });

      return receitas;
    } catch (erro) {
      return [];
    }
  }

  async function buscarMealsPorLetras() {
    var letras = "abcdefghijklmnopqrstuvwxyz".split("");

    var respostas = await Promise.all(
      letras.map(function (letra) {
        return fetch(API_BASE + "/search.php?f=" + letra)
          .then(function (r) {
            return r.json();
          })
          .catch(function () {
            return { meals: [] };
          });
      })
    );

    var mapa = new Map();

    respostas.forEach(function (resposta) {
      var meals = resposta && resposta.meals ? resposta.meals : [];
      meals.forEach(function (meal) {
        if (!mapa.has(meal.idMeal)) {
          mapa.set(meal.idMeal, meal);
        }
      });
    });

    return Array.from(mapa.values());
  }

  function combinarReceitas(receitasFixas, receitasApi) {
    var mapa = new Map();

    receitasFixas.forEach(function (receita) {
      mapa.set(String(receita.id), receita);
    });

    receitasApi.forEach(function (receita) {
      var chave = String(receita.id);
      if (!mapa.has(chave)) {
        mapa.set(chave, receita);
      }
    });

    return Array.from(mapa.values());
  }

  function inicializarPaginaInicial() {
    var listaCards = document.getElementById("lista-cards-receitas");
    if (!listaCards) {
      return;
    }

    renderizarPaginaHome();
    renderizarControlesPaginacao();
  }

  function renderizarPaginaHome() {
    var listaCards = document.getElementById("lista-cards-receitas");
    if (!listaCards) {
      return;
    }

    var inicio = (estado.paginaAtual - 1) * RECEITAS_POR_PAGINA;
    var fim = inicio + RECEITAS_POR_PAGINA;
    var receitasPagina = estado.receitas.slice(inicio, fim);

    listaCards.innerHTML = "";

    receitasPagina.forEach(function (receita) {
      var card = document.createElement("article");
      card.className = "card-receita";

      var link = document.createElement("a");
      link.href = "pages/receita.html?id=" + receita.id;
      link.className = "card-receita-link";

      var imagem = document.createElement("img");
      imagem.className = "card-receita-imagem";
      aplicarImagemSegura(imagem, receita.imagem, receita.imagemAlt || receita.titulo);

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

  function renderizarControlesPaginacao() {
    var listaCards = document.getElementById("lista-cards-receitas");
    if (!listaCards || !estado.receitas.length) {
      return;
    }

    var totalPaginas = Math.max(1, Math.ceil(estado.receitas.length / RECEITAS_POR_PAGINA));

    var controles = document.getElementById("controles-paginacao");
    if (!controles) {
      controles = document.createElement("div");
      controles.id = "controles-paginacao";
      controles.className = "paginacao-receitas";
      listaCards.parentNode.appendChild(controles);
    }

    controles.innerHTML = "";

    var botaoAnterior = document.createElement("button");
    botaoAnterior.type = "button";
    botaoAnterior.className = "botao-paginacao";
    botaoAnterior.textContent = "Anterior";
    botaoAnterior.disabled = estado.paginaAtual === 1;
    botaoAnterior.addEventListener("click", function () {
      if (estado.paginaAtual > 1) {
        estado.paginaAtual -= 1;
        renderizarPaginaHome();
        renderizarControlesPaginacao();
      }
    });

    var infoPagina = document.createElement("span");
    infoPagina.className = "info-paginacao";
    infoPagina.textContent = "Página " + estado.paginaAtual + " de " + totalPaginas;

    var botaoProximo = document.createElement("button");
    botaoProximo.type = "button";
    botaoProximo.className = "botao-paginacao";
    botaoProximo.textContent = "Próxima";
    botaoProximo.disabled = estado.paginaAtual >= totalPaginas;
    botaoProximo.addEventListener("click", function () {
      if (estado.paginaAtual < totalPaginas) {
        estado.paginaAtual += 1;
        renderizarPaginaHome();
        renderizarControlesPaginacao();
      }
    });

    controles.appendChild(botaoAnterior);
    controles.appendChild(infoPagina);
    controles.appendChild(botaoProximo);
  }

  async function inicializarPaginaReceita() {
    var tituloReceita = document.getElementById("titulo-receita");
    if (!tituloReceita) {
      return;
    }

    if (!estado.receitas.length) {
      preencherSemReceita();
      return;
    }

    var parametros = new URLSearchParams(window.location.search);
    var idSolicitado = Number(parametros.get("id"));
    var receitaBase = estado.receitas.find(function (item) {
      return item.id === idSolicitado;
    });

    if (!receitaBase) {
      receitaBase = estado.receitas[0];
    }

    preencherReceitaBase(receitaBase);

    if (receitaBase.ingredientes.length && receitaBase.passos.length) {
      preencherReceitaDetalhada(receitaBase, receitaBase);
      return;
    }

    try {
      var detalhe = await buscarDetalheReceita(receitaBase.id);
      preencherReceitaDetalhada(detalhe, receitaBase);
    } catch (erro) {
      preencherReceitaDetalhada(receitaBase, receitaBase);
    }
  }

  function preencherSemReceita() {
    document.title = "UMC Receitas | Receita";
    document.getElementById("titulo-receita").textContent = "Receita indisponível";
    document.getElementById("descricao-receita").textContent = "Nenhuma receita disponível no momento.";
    aplicarImagemSegura(document.getElementById("imagem-receita"), IMAGEM_FALLBACK_LOCAL, "Imagem da receita");

    document.getElementById("lista-ingredientes").innerHTML = "<li>Sem dados</li>";
    document.getElementById("lista-passos").innerHTML = "<li>Sem dados</li>";
  }

  function preencherReceitaBase(receita) {
    document.title = "UMC Receitas | " + receita.titulo;
    document.getElementById("titulo-receita").textContent = receita.titulo;
    document.getElementById("descricao-receita").textContent = receita.descricao;

    var imagem = document.getElementById("imagem-receita");
    aplicarImagemSegura(imagem, receita.imagem, receita.imagemAlt);
  }

  function preencherReceitaDetalhada(detalhe, receitaBase) {
    var descricao = detalhe.descricao || receitaBase.descricao;
    document.getElementById("descricao-receita").textContent = descricao;

    var listaIngredientes = document.getElementById("lista-ingredientes");
    listaIngredientes.innerHTML = "";

    var ingredientes = detalhe.ingredientes && detalhe.ingredientes.length
      ? detalhe.ingredientes
      : receitaBase.ingredientes;

    ingredientes.forEach(function (ingrediente) {
      var li = document.createElement("li");
      li.textContent = ingrediente;
      listaIngredientes.appendChild(li);
    });

    var listaPassos = document.getElementById("lista-passos");
    listaPassos.innerHTML = "";

    var passos = detalhe.passos && detalhe.passos.length ? detalhe.passos : receitaBase.passos;

    passos.forEach(function (passo) {
      var li = document.createElement("li");
      li.textContent = passo;
      listaPassos.appendChild(li);
    });
  }

  async function buscarDetalheReceita(id) {
    var resposta = await fetch(API_BASE + "/lookup.php?i=" + id);
    var dados = await resposta.json();
    var meal = dados && dados.meals && dados.meals[0] ? dados.meals[0] : null;

    if (!meal) {
      throw new Error("Receita não encontrada");
    }

    return {
      descricao: montarDescricaoCurta(meal),
      ingredientes: extrairIngredientes(meal),
      passos: extrairPassos(meal)
    };
  }

  function montarDescricaoCurta(meal) {
    var categoria = meal.strCategory ? "Categoria: " + meal.strCategory : "";
    var area = meal.strArea ? "Origem: " + meal.strArea : "";

    if (categoria && area) {
      return categoria + " | " + area;
    }

    if (categoria || area) {
      return categoria || area;
    }

    return "Receita.";
  }

  function extrairIngredientes(meal) {
    var ingredientes = [];

    for (var i = 1; i <= 20; i += 1) {
      var nome = meal["strIngredient" + i];
      var medida = meal["strMeasure" + i];

      if (!nome || !nome.trim()) {
        continue;
      }

      var item = (medida && medida.trim() ? medida.trim() + " " : "") + nome.trim();
      ingredientes.push(item.trim());
    }

    return ingredientes;
  }

  function extrairPassos(meal) {
    var instrucoes = (meal.strInstructions || "").replace(/\r/g, "\n").trim();
    if (!instrucoes) {
      return [];
    }

    var linhas = instrucoes
      .split(/\n+/)
      .map(function (linha) {
        return linha.trim();
      })
      .filter(Boolean);

    if (linhas.length > 1) {
      return linhas;
    }

    return instrucoes
      .split(/\.\s+/)
      .map(function (parte) {
        return parte.trim();
      })
      .filter(Boolean)
      .map(function (parte) {
        return parte.endsWith(".") ? parte : parte + ".";
      });
  }

  function aplicarImagemSegura(elementoImg, caminho, alt) {
    var srcPrincipal = resolverCaminhoImagem(caminho || IMAGEM_FALLBACK_LOCAL);
    var srcFallback = resolverCaminhoImagem(IMAGEM_FALLBACK_LOCAL);

    elementoImg.onerror = function () {
      elementoImg.onerror = null;
      elementoImg.src = srcFallback;
    };

    elementoImg.src = srcPrincipal;
    elementoImg.alt = alt || "Imagem da receita";
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
