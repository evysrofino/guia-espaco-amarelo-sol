const places = [
  {
    name: "Praia do Tenório",
    category: "Praias",
    icon: "🏖️",
    desc: "Um destino para incluir no seu dia de praia em Ubatuba.",
    query: "Praia do Tenório Ubatuba SP",
    source: "https://turismo.ubatuba.sp.gov.br/praias/praia-do-tenorio/"
  },
  {
    name: "Praia Grande",
    category: "Praias",
    icon: "🌊",
    desc: "Uma extensa faixa de areia para aproveitar a paisagem e escolher seu cantinho.",
    query: "Praia Grande Ubatuba SP",
    source: "https://turismo.ubatuba.sp.gov.br/praias/praia-grande/"
  },
  {
    name: "Praia da Domingas Dias",
    category: "Praias",
    icon: "☀️",
    desc: "Mais uma opção para descobrir as paisagens do litoral de Ubatuba.",
    query: "Praia Domingas Dias Ubatuba SP",
    source: "https://turismo.ubatuba.sp.gov.br/praias/praia-da-domingas-dias/"
  },
  {
    name: "Orla do Itaguá",
    category: "Passeios",
    icon: "🌴",
    desc: "Inclua a orla em seu roteiro para conhecer outro cenário da cidade.",
    query: "Orla do Itaguá Ubatuba SP",
    source: "https://turismo.ubatuba.sp.gov.br/praias/praia-do-itagua/"
  },
  {
    name: "Projeto Tamar",
    category: "Passeios",
    icon: "🐢",
    desc: "Conheça o centro de visitantes e o trabalho de conservação das tartarugas marinhas.",
    query: "Projeto Tamar Ubatuba SP",
    source: "https://projetotamar.org.br/centros_visitantes.php?cod=9"
  },
  {
    name: "Aquário de Ubatuba",
    category: "Passeios",
    icon: "🐠",
    desc: "Um passeio para conhecer a vida marinha. Consulte ingressos e programação no site.",
    query: "Aquário de Ubatuba Rua Guarani 859 Ubatuba",
    source: "https://aquariodeubatuba.com.br/"
  },
  {
    name: "Restaurante Raízes",
    category: "Onde comer",
    icon: "🍽️",
    desc: "Cozinha caiçara no Itaguá. Veja o cardápio e as informações do restaurante.",
    query: "Restaurante Raízes Avenida Leovigildo Dias Vieira 1280 Ubatuba",
    source: "https://www.raizesubatuba.com/"
  },
  {
    name: "O Rei do Camarão",
    category: "Onde comer",
    icon: "🦐",
    desc: "Uma opção de frutos do mar no Itaguá para conhecer os sabores do litoral.",
    query: "Rei do Camarão Avenida Leovigildo Dias Vieira 38 Ubatuba",
    source: "https://restaurantereidocamarao.com.br/"
  }
];

const search = document.querySelector("#search");
const results = document.querySelector("#places");
const count = document.querySelector("#count");
const empty = document.querySelector("#empty");
const filters = document.querySelectorAll(".filter");

let category = "Todos";
let searchTimer;

function escapeHTML(value) {
  const characters = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };

  return String(value).replace(
    /[&<>"']/g,
    character => characters[character]
  );
}

function normalize(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function routes(query) {
  const encodedQuery = encodeURIComponent(query);
  const accessibleQuery = escapeHTML(query);

  return `
    <a
      href="https://www.google.com/maps/search/?api=1&query=${encodedQuery}"
      target="_blank"
      rel="noopener"
      aria-label="Google Maps: ${accessibleQuery} (abre em nova aba)"
    >
      Google Maps <span aria-hidden="true">↗</span>
    </a>

    <a
      href="https://www.waze.com/ul?q=${encodedQuery}&navigate=yes"
      target="_blank"
      rel="noopener"
      aria-label="Waze: ${accessibleQuery} (abre em nova aba)"
    >
      Waze <span aria-hidden="true">↗</span>
    </a>
  `;
}

function render() {
  const query = normalize(search.value);

  const list = places.filter(place => {
    const matchesCategory =
      category === "Todos" || category === place.category;

    const matchesSearch = normalize(
      `${place.name} ${place.desc}`
    ).includes(query);

    return matchesCategory && matchesSearch;
  });

  results.innerHTML = list.map(place => {
    let sourceLabel = "Informações do local";

    if (place.category === "Onde comer") {
      sourceLabel = "Site e cardápio";
    } else if (place.category === "Praias") {
      sourceLabel = "Conhecer a praia";
    }

    return `
      <article class="card">
        <div class="art" aria-hidden="true">
          <span>${escapeHTML(place.icon)}</span>
        </div>

        <div class="card-body">
          <span class="tag">${escapeHTML(place.category)}</span>
          <h3>${escapeHTML(place.name)}</h3>
          <p>${escapeHTML(place.desc)}</p>

          <div class="links">
            ${routes(place.query)}
          </div>

          <a
            class="source"
            href="${escapeHTML(place.source)}"
            target="_blank"
            rel="noopener"
          >
            ${sourceLabel}
            <span class="sr-only">
              : ${escapeHTML(place.name)} (abre em nova aba)
            </span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    `;
  }).join("");

  count.textContent =
    `${list.length} lugares encontrados em ${category}` +
    (query ? " para a busca informada" : "");

  empty.hidden = list.length > 0;
}

filters.forEach(button => {
  button.addEventListener("click", () => {
    clearTimeout(searchTimer);
    category = button.dataset.category;

    filters.forEach(filter => {
      filter.setAttribute(
        "aria-pressed",
        String(filter === button)
      );
    });

    render();
  });
});

search.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(render, 250);
});

const address =
  "Rua Portuguesa Santista, 481, Estufa II, Ubatuba, SP, CEP 11689-364";

document.querySelector("#home-links").innerHTML = routes(address);

document.querySelector("#copy").addEventListener("click", async () => {
  const status = document.querySelector("#copy-status");

  try {
    await navigator.clipboard.writeText(address);
    status.textContent = "Endereço copiado!";
  } catch {
    status.textContent = `Selecione e copie: ${address}`;
  }
});

/* Move o foco ao destino dos links internos. */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const id = link.getAttribute("href").slice(1);

    const destination = id
      ? document.getElementById(id)
      : document.querySelector("header");

    if (!destination) return;

    event.preventDefault();

    if (!destination.hasAttribute("tabindex")) {
      destination.setAttribute("tabindex", "-1");
    }

    destination.focus({ preventScroll: true });

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    destination.scrollIntoView({
      behavior: reducedMotion ? "instant" : "smooth",
      block: "start"
    });

    if (id) {
      history.replaceState(null, "", `#${id}`);
    }
  });
});

render();

/* Ajustes individuais de acessibilidade */
(() => {
  const decrease = document.getElementById("text-decrease");
  const increase = document.getElementById("text-increase");
  const contrast = document.getElementById("contrast-toggle");
  const reset = document.getElementById("access-reset");
  const status = document.getElementById("access-status");

  if (!decrease || !increase || !contrast || !reset || !status) {
    return;
  }

  const storageKey = "amarelo-sol-acessibilidade";
  let textSize = 100;
  let highContrast = false;

  /* Recupera a escolha feita neste navegador. */
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));

    if (saved && typeof saved === "object") {
      if (
        typeof saved.textSize === "number" &&
        Number.isFinite(saved.textSize)
      ) {
        textSize = Math.max(
          100,
          Math.min(200, Math.round(saved.textSize / 10) * 10)
        );
      }

      highContrast = saved.highContrast === true;
    }
  } catch {
    // Mantém o padrão se o armazenamento estiver indisponível.
  }

  function applyPreferences(save = true) {
    document.documentElement.style.setProperty(
      "--text-scale",
      String(textSize / 100)
    );

    document.body.classList.toggle(
      "high-contrast",
      highContrast
    );

    contrast.setAttribute(
      "aria-pressed",
      String(highContrast)
    );

    decrease.setAttribute(
      "aria-disabled",
      String(textSize === 100)
    );

    increase.setAttribute(
      "aria-disabled",
      String(textSize === 200)
    );

    status.textContent =
      `Texto: ${textSize}%. Alto contraste ` +
      (highContrast ? "ativado." : "desativado.");

    if (save) {
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({ textSize, highContrast })
        );
      } catch {
        // Os controles funcionam mesmo sem salvar a preferência.
      }
    }
  }

  increase.addEventListener("click", () => {
    textSize = Math.min(200, textSize + 10);
    applyPreferences();
  });

  decrease.addEventListener("click", () => {
    textSize = Math.max(100, textSize - 10);
    applyPreferences();
  });

  contrast.addEventListener("click", () => {
    highContrast = !highContrast;
    applyPreferences();
  });

  reset.addEventListener("click", () => {
    textSize = 100;
    highContrast = false;
    applyPreferences();
  });

  applyPreferences(false);
})();
/* Abre os controles em um painel acessível. */
(() => {
  const openButton = document.getElementById("open-access");
  const controls = document.querySelector(
    "#acessibilidade .access-controls"
  );
  const status = document.getElementById("access-status");

  if (!openButton || !controls || !status) return;
  if (document.getElementById("access-dialog")) return;

  const dialog = document.createElement("dialog");
  dialog.id = "access-dialog";
  dialog.className = "access-dialog";
  dialog.setAttribute("aria-labelledby", "dialog-access-title");
  dialog.setAttribute("aria-describedby", "dialog-access-description");

  const title = document.createElement("h2");
  title.id = "dialog-access-title";
  title.textContent = "Acessibilidade";

  const description = document.createElement("p");
  description.id = "dialog-access-description";
  description.textContent =
    "Ajuste o tamanho do texto e o contraste. " +
    "Estas escolhas valem apenas neste navegador.";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "dialog-close";
  closeButton.textContent = "Fechar";

  /* Move os controles existentes, preservando suas funções. */
  dialog.append(
    title,
    description,
    controls,
    status,
    closeButton
  );

  document.body.appendChild(dialog);

  openButton.addEventListener("click", () => {
    if (dialog.open) return;

    dialog.showModal();

    const firstButton = controls.querySelector("button");
    firstButton?.focus();
  });

  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  /* O dialog nativo fecha com Esc e mantém o foco dentro
     do painel enquanto está aberto. */
  dialog.addEventListener("close", () => {
    openButton.focus();
  });
})();
