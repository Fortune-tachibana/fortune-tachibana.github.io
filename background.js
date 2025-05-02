const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

// Resize canvas
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

// Dots
const dotCount = 100;
let dots = Array.from({ length: dotCount }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  r: Math.random() * 2 + 1,
  dx: (Math.random() - 0.5) * 0.5,
  dy: (Math.random() - 0.5) * 0.5
}));

// Shooting Stars
let shootingStars = [];
function createShootingStar() {
  shootingStars.push({
    x: Math.random() * width,
    y: Math.random() * height * 0.5,
    length: Math.random() * 80 + 30,
    speed: Math.random() * 4 + 4,
    angle: Math.PI / 4,
    opacity: Math.random() * 0.5 + 0.3
  });
  if (shootingStars.length > 5) shootingStars.shift();
}
setInterval(createShootingStar, 2000);

// Draw Frame
function draw() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);

  // Dots
  for (const d of dots) {
    d.x += d.dx;
    d.y += d.dy;
    if (d.x < 0 || d.x > width) d.dx *= -1;
    if (d.y < 0 || d.y > height) d.dy *= -1;

    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = '#9933ff';
    ctx.fill();
  }

  // Lines between close dots
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.strokeStyle = 'rgba(160, 90, 255, 0.1)';
        ctx.stroke();
      }
    }
  }

  // Shooting Stars
  for (const s of shootingStars) {
    const x2 = s.x + Math.cos(s.angle) * s.length;
    const y2 = s.y + Math.sin(s.angle) * s.length;
    ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    s.x += Math.cos(s.angle) * s.speed;
    s.y += Math.sin(s.angle) * s.speed;
  }

  requestAnimationFrame(draw);
}

draw();

// Resize handler
window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

// Particles.js (和風カラーパレットで統一)
tsParticles.load("tsparticles", {
  fullScreen: { enable: true, zIndex: -1 },
  background: { color: { value: "#0b0a0a" } },
  particles: {
    number: { value: 50 },
    color: { value: ["#ffcc00", "#b19cd9", "#ff69b4"] },
    shape: { type: "circle" },
    opacity: { value: 0.4, random: true },
    size: { value: { min: 1, max: 4 }, random: true },
    move: {
      enable: true,
      speed: 0.5,
      direction: "top",
      random: true,
      outModes: { default: "out" }
    }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "bubble" },
      onClick: { enable: true, mode: "repulse" }
    },
    modes: {
      bubble: { distance: 100, size: 6 },
      repulse: { distance: 150 }
    }
  }
});
