// script.js

// Love letter flipbook pages
let currentPage = 0;
const pages = [
  "From the first moment I met you, I knew you were someone special.",
  "Your smile, your kindness, your love — they brighten my every day.",
  "Even from miles away, you make me feel seen, known, and loved.",
  "I can't wait to build a life with you — full of joy, prayer, and adventure.",
  "Happy Birthday Marissa. You are my heart’s deepest joy. 💖"
];

// Show specific section by ID
function showSection(id) {
  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");

  if (id === "letter") {
    document.getElementById("letterText").innerText = pages[currentPage];
  }

  if (id === "fireworks") {
    startFireworks();
  }
}

// Flip to next love letter page
function nextPage() {
  if (currentPage < pages.length - 1) {
    currentPage++;
    document.getElementById("letterText").innerText = pages[currentPage];
  }
}

// Flip to previous love letter page
function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    document.getElementById("letterText").innerText = pages[currentPage];
  }
}

// Fireworks
let canvas, ctx, fireworks = [];

function startFireworks() {
  canvas = document.getElementById("fireworks-canvas");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  setInterval(() => {
    for (let i = 0; i < 5; i++) {
      fireworks.push(new Firework());
    }
  }, 400);

  animateFireworks();
}

class Firework {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetY = Math.random() * canvas.height / 2;
    this.radius = 2;
    this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    this.alpha = 1;
    this.dy = -5;
  }

  update() {
    this.y += this.dy;
    if (this.y <= this.targetY) this.alpha -= 0.03;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.fill();
  }
}

function animateFireworks() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = fireworks.length - 1; i >= 0; i--) {
    const f = fireworks[i];
    f.update();
    f.draw();
    if (f.alpha <= 0) fireworks.splice(i, 1);
  }

  requestAnimationFrame(animateFireworks);
}