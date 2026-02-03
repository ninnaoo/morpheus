let canvas, ctx, w, h;
let stars = [];
let starImage;

// фиксированное направление
const DIR_X = -1;
const DIR_Y = 1;
const BASE_SPEED = 3;

// частота появления звёзд
const SPAWN_CHANCE = 0.02;

export function initStars() {
  canvas = document.getElementById("stars");
  if (!canvas) return;

  ctx = canvas.getContext("2d");

  resize();
  window.addEventListener("resize", resize);

  starImage = new Image();
  starImage.src = "../assets/images/star.png";

  starImage.onload = () => {
    animate();
  };
}

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function spawnStar() {
  const speed = BASE_SPEED + Math.random(); // чуть разная скорость

  stars.push({
    x: w + Math.random() * -700,   // старт за правым краем
    y: -Math.random() * 10,      // старт за верхним краем
    vx: DIR_X * speed,
    vy: DIR_Y * speed,
    size: 10 + Math.random() * 10 // разные размеры
  });
}

function animate() {
  ctx.clearRect(0, 0, w, h);

  if (Math.random() < SPAWN_CHANCE) {
    spawnStar();
  }

  stars.forEach(s => {
    s.x += s.vx;
    s.y += s.vy;
    ctx.drawImage(starImage, s.x, s.y, s.size, s.size);
  });

  // чистим звёзды за экраном
  stars = stars.filter(
    s => s.x > -100 && s.y < h + 100
  );

  requestAnimationFrame(animate);
}