// COUNTDOWN
let total = 3 * 24 * 60 * 60 + 3 * 60 * 60 + 29 * 60 + 55;

setInterval(() => {
  total--;
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  document.getElementById("d").innerText = d.toString().padStart(2,"0");
  document.getElementById("h").innerText = h.toString().padStart(2,"0");
  document.getElementById("m").innerText = m.toString().padStart(2,"0");
  document.getElementById("s").innerText = s.toString().padStart(2,"0");
},1000);

// PARTICLES
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const symbols = ["$", "₿", "Ξ", "AI", "◈"];
const particles = Array.from({length: 80}, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  s: Math.random() * 20 + 8,
  v: Math.random() * 0.4 + 0.2,
  t: symbols[Math.floor(Math.random() * symbols.length)]
}));

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "rgba(63,255,216,0.35)";
  ctx.font = "16px monospace";

  particles.forEach(p => {
    ctx.fillText(p.t, p.x, p.y);
    p.y -= p.v;
    if (p.y < -20) p.y = canvas.height + 20;
  });

  requestAnimationFrame(animate);
}
animate();

window.onresize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
};
