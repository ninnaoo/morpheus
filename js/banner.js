import { initStars } from "./stars.js";

export function init() {
  initStars();

  const btn = document.getElementById("startBtn");
  const music = document.getElementById("bg-music");

  btn.addEventListener("click", () => {
    music.volume = 0.75;
    music.play();

    document.querySelector(".puzzle").scrollIntoView({
      behavior: "smooth"
    });
  });
}