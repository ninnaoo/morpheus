const blocks = document.querySelectorAll("[data-block]");
const loaded = new Set();

import { initPuzzle } from "./puzzle.js";
initPuzzle();
import { initLetters } from "./letters.js";
initLetters();



const modules = {
  banner: () => import("./banner.js"),
  puzzle: () => import("./puzzle.js"),
  test: () => import("./test.js"),
  letters: () => import("./letters.js"),
  aquarius: () => import("./aquarius.js"),
  congrats: () => import("./congrats.js")
};

// Intersection Observer — лучший способ
const observer = new IntersectionObserver((entries) => {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      const blockName = entry.target.dataset.block;

      if (!loaded.has(blockName)) {
        loaded.add(blockName);
        const module = await modules[blockName]();
        module.init();
      }
    }
  });
}, {
  threshold: 0.3
});

blocks.forEach(block => observer.observe(block));