// =========================================================
// script.js — small interactive touches for the portfolio
// 1. Dark / light theme toggle (remembers your choice)
// 2. Highlight the nav link of the section you're viewing
// 3. "Back to top" button
// 4. Auto-updating footer year
// =========================================================

// ---------- 1. THEME TOGGLE ----------
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
  );
}

// Use the saved choice, otherwise follow the computer's setting
let savedTheme = null;
try {
  savedTheme = localStorage.getItem("theme");
} catch (e) {
  // localStorage can be blocked; the site still works without it
}
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
});

// ---------- 2. ACTIVE NAV LINK ----------
const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("section[id]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  },
  // Trigger when a section crosses the middle band of the screen
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((section) => observer.observe(section));

// ---------- 3. BACK TO TOP BUTTON ----------
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 400);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---------- 4. FOOTER YEAR ----------
document.getElementById("year").textContent = new Date().getFullYear();
