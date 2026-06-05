const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
const navItems = [...document.querySelectorAll(".nav-links a")];
const heroRole = document.getElementById("heroRole");
const heroName = document.getElementById("heroName");

menuButton.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

function startTypingLoop(element, text, options = {}) {
  const typeSpeed = options.typeSpeed || 70;
  const eraseSpeed = options.eraseSpeed || 36;
  const hold = options.hold || 1300;
  let index = 0;
  let deleting = false;

  function tick() {
    element.textContent = text.slice(0, index);

    if (!deleting && index < text.length) {
      index += 1;
      setTimeout(tick, typeSpeed);
      return;
    }

    if (!deleting && index === text.length) {
      deleting = true;
      setTimeout(tick, hold);
      return;
    }

    if (deleting && index > 0) {
      index -= 1;
      setTimeout(tick, eraseSpeed);
      return;
    }

    deleting = false;
    setTimeout(tick, 420);
  }

  tick();
}

startTypingLoop(heroRole, "ECE Student | Embedded Systems | IoT Hardware", { typeSpeed: 42, eraseSpeed: 24, hold: 1500 });
setTimeout(() => {
  startTypingLoop(heroName, "Gunaseelan V", { typeSpeed: 90, eraseSpeed: 42, hold: 1700 });
}, 420);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sections = [...document.querySelectorAll("main section[id]")];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -50% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

const cursorDot = document.querySelector(".cursor-dot");
window.addEventListener("pointermove", (event) => {
  cursorDot.style.left = `${event.clientX}px`;
  cursorDot.style.top = `${event.clientY}px`;
});

const certificates = [...document.querySelectorAll(".certificate")];
const modal = document.getElementById("certModal");
const certTitle = document.getElementById("certTitle");
const certImage = document.getElementById("certImage");
const closeModal = document.getElementById("closeModal");
const prevCert = document.getElementById("prevCert");
const nextCert = document.getElementById("nextCert");
const verifyCert = document.getElementById("verifyCert");
let currentCertificate = 0;
const adminDot = document.getElementById("adminDot");
const adminModal = document.getElementById("adminModal");
const closeAdmin = document.getElementById("closeAdmin");
const adminPassword = document.getElementById("adminPassword");
const unlockAdmin = document.getElementById("unlockAdmin");
const adminStatus = document.getElementById("adminStatus");
const adminLogin = document.getElementById("adminLogin");
const adminPanel = document.getElementById("adminPanel");
const adminDownloads = [...document.querySelectorAll("[data-admin-file]")];

function openCertificate(index) {
  currentCertificate = (index + certificates.length) % certificates.length;
  const card = certificates[currentCertificate];
  const src = card.dataset.src;
  const verify = card.dataset.verify || src;

  certTitle.textContent = card.dataset.title || "Certificate";
  certImage.src = src;
  certImage.alt = `${certTitle.textContent} preview`;
  verifyCert.href = verify;
  verifyCert.textContent = card.dataset.verify ? "Verify" : "Open Full";

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function hideCertificate() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

certificates.forEach((card, index) => {
  card.setAttribute("tabindex", "0");
  card.addEventListener("click", () => openCertificate(index));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCertificate(index);
    }
  });
});

closeModal.addEventListener("click", hideCertificate);
prevCert.addEventListener("click", () => openCertificate(currentCertificate - 1));
nextCert.addEventListener("click", () => openCertificate(currentCertificate + 1));

modal.addEventListener("click", (event) => {
  if (event.target === modal) hideCertificate();
});

window.addEventListener("keydown", (event) => {
  if (modal.classList.contains("open")) {
    if (event.key === "Escape") hideCertificate();
    if (event.key === "ArrowLeft") openCertificate(currentCertificate - 1);
    if (event.key === "ArrowRight") openCertificate(currentCertificate + 1);
  }
  if (adminModal.classList.contains("open") && event.key === "Escape") {
    hideAdmin();
  }
});

function showAdmin() {
  adminModal.classList.add("open");
  adminModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  adminPassword.focus();
}

function hideAdmin() {
  adminModal.classList.remove("open");
  adminModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  adminPassword.value = "";
  adminStatus.textContent = "";
}

function unlockAdminPanel() {
  if (adminPassword.value === "guna2006") {
    adminDownloads.forEach((link) => {
      const file = link.dataset.adminFile;
      link.href = file;
      link.download = file;
    });
    adminLogin.hidden = true;
    adminPanel.hidden = false;
    adminStatus.textContent = "";
  } else {
    adminStatus.textContent = "Incorrect password.";
  }
}

adminDot.addEventListener("click", showAdmin);
closeAdmin.addEventListener("click", hideAdmin);
unlockAdmin.addEventListener("click", unlockAdminPanel);
adminPassword.addEventListener("keydown", (event) => {
  if (event.key === "Enter") unlockAdminPanel();
});
adminModal.addEventListener("click", (event) => {
  if (event.target === adminModal) hideAdmin();
});

const messageForm = document.getElementById("messageForm");
const formStatus = document.getElementById("formStatus");

async function trackVisit() {
  const visitKey = `portfolioVisit:${new Date().toISOString().slice(0, 10)}`;
  if (sessionStorage.getItem(visitKey)) return;
  sessionStorage.setItem(visitKey, "tracked");

  const visit = {
    timestamp: new Date().toISOString(),
    page: window.location.pathname || "/",
    referrer: document.referrer || "Direct",
    userAgent: navigator.userAgent,
    language: navigator.language,
    screen: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || ""
  };

  try {
    await fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(visit),
      keepalive: true
    });
  } catch (error) {
    const visits = JSON.parse(localStorage.getItem("portfolioVisits") || "[]");
    visits.push(visit);
    localStorage.setItem("portfolioVisits", JSON.stringify(visits));
  }
}

function saveLocalMessage(message) {
  const existing = JSON.parse(localStorage.getItem("recruiterMessages") || "[]");
  existing.push(message);
  localStorage.setItem("recruiterMessages", JSON.stringify(existing));
}

function toCsvRow(values) {
  return values
    .map((value) => `"${String(value || "").replaceAll('"', '""')}"`)
    .join(",");
}

function downloadLocalMessages() {
  const messages = JSON.parse(localStorage.getItem("recruiterMessages") || "[]");
  const header = ["Timestamp", "Name", "Email", "Phone", "Message"];
  const rows = messages.map((item) => toCsvRow([
    item.timestamp,
    item.name,
    item.email,
    item.phone,
    item.message
  ]));
  const csv = [toCsvRow(header), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "recruiter-messages.csv";
  link.click();
  URL.revokeObjectURL(link.href);
}

messageForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(messageForm);
  const message = {
    timestamp: new Date().toISOString(),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message")
  };

  formStatus.textContent = "Sending message...";

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message)
    });
    const result = await response.json();

    if (!response.ok) throw new Error(result.message || "Message API is not configured.");

    formStatus.textContent = "Message sent and stored successfully.";
    messageForm.reset();
  } catch (error) {
    saveLocalMessage(message);
    formStatus.innerHTML = "Google Sheets endpoint is not connected yet. Message saved in this browser. <button type=\"button\" id=\"downloadMessages\">Download CSV</button>";
    const downloadButton = document.getElementById("downloadMessages");
    downloadButton.addEventListener("click", downloadLocalMessages);
  }
});

trackVisit();
