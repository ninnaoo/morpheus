export function initAquarius() {
  const stars = document.querySelectorAll(".star");
  const compliment = document.getElementById("compliment");

  stars.forEach(star => {
    star.addEventListener("click", () => {
      // Вставляем HTML
      compliment.innerHTML = star.dataset.compliment;
      compliment.classList.add("show");

      // Скрыть через 4 секунды
      setTimeout(() => {
        compliment.classList.remove("show");
      }, 3000);
    });
  });
}