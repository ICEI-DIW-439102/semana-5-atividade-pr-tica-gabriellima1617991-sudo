const detailsData = {
  cantina: {
    name: "Cantina Bella Italia",
    text: "Especialidade em massas frescas e carta de vinhos selecionada. Funcionamento: 11h as 23h. Faixa de preco: R$ 55 a R$ 120 por pessoa."
  },
  sushi: {
    name: "Sushi Zen Garden",
    text: "Sushibar com peixes frescos, combinados especiais e menu executivo no almoco. Funcionamento: 12h as 23h. Faixa de preco: R$ 65 a R$ 140 por pessoa."
  },
  churrasco: {
    name: "Churrascaria Fogo Gaucho",
    text: "Rodizio premium com cortes nobres, buffet completo e opcoes de sobremesa artesanal. Funcionamento: 11h30 as 23h. Faixa de preco: R$ 70 a R$ 160 por pessoa."
  }
};

const body = document.body;
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".restaurant-card");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileNav = document.getElementById("mobileNav");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("sidebar");
const themeToggle = document.getElementById("themeToggle");
const detailsModal = document.getElementById("detailsModal");
const feedbackModal = document.getElementById("feedbackModal");
const detailsTitle = document.getElementById("detailsTitle");
const detailsContent = document.getElementById("detailsContent");
const feedbackForm = document.getElementById("feedbackForm");
const feedbackRestaurant = document.getElementById("feedbackRestaurant");
const feedbackMessage = document.getElementById("feedbackMessage");

function toggleModal(modal, open) {
  if (!modal) return;
  modal.classList.toggle("open", open);
  modal.setAttribute("aria-hidden", String(!open));
}

function applyTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }
  localStorage.setItem("saborbh-theme", theme);
}

const savedTheme = localStorage.getItem("saborbh-theme") || "light";
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = body.classList.contains("dark") ? "light" : "dark";
    applyTheme(nextTheme);
  });
}

if (hamburgerBtn && mobileNav) {
  hamburgerBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
  });
}

if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener("click", () => {
    sidebar.style.display = sidebar.style.display === "none" ? "block" : "none";
  });
}

if (searchForm && searchInput && cards.length) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const term = searchInput.value.trim().toLowerCase();

    cards.forEach((card) => {
      const name = (card.getAttribute("data-name") || "").toLowerCase();
      card.style.display = name.includes(term) ? "block" : "none";
    });
  });
}

document.querySelectorAll(".btn-details").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.getAttribute("data-id");
    const data = detailsData[id];
    if (!data || !detailsModal) return;
    detailsTitle.textContent = data.name;
    detailsContent.textContent = data.text;
    toggleModal(detailsModal, true);
  });
});

document.querySelectorAll(".btn-feedback").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.getAttribute("data-id");
    const data = detailsData[id];
    if (!data || !feedbackModal || !feedbackRestaurant) return;
    feedbackRestaurant.value = data.name;
    feedbackMessage.textContent = "";
    toggleModal(feedbackModal, true);
  });
});

document.querySelectorAll(".close-modal").forEach((button) => {
  button.addEventListener("click", () => {
    const modalId = button.getAttribute("data-close");
    const modal = document.getElementById(modalId);
    toggleModal(modal, false);
  });
});

[detailsModal, feedbackModal].forEach((modal) => {
  if (!modal) return;
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      toggleModal(modal, false);
    }
  });
});

if (feedbackForm) {
  feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const rating = document.getElementById("ratingSelect").value;
    const comment = document.getElementById("feedbackComment").value.trim();
    const restaurant = feedbackRestaurant.value || "restaurante";

    if (!rating || !comment) return;

    feedbackMessage.textContent = `Obrigado! Seu feedback para ${restaurant} (${rating} estrela(s)) foi enviado.`;
    feedbackForm.reset();
  });
}