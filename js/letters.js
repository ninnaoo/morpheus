export function initLetters() {
  const lettersField = document.getElementById("lettersField");
  const letters = document.querySelectorAll(".letter");
  const slots = document.querySelectorAll(".slot");
  const resetBtn = document.getElementById("resetLetters");
  const result = document.getElementById("result");

  let current = null;
  let offsetX = 0;
  let offsetY = 0;

  // ===== РАНДОМ ВНУТРИ ПОЛЯ =====
  function scatterLetters() {
    letters.forEach(letter => {
      const maxX = lettersField.clientWidth - letter.offsetWidth;
      const maxY = lettersField.clientHeight - letter.offsetHeight;

      letter.style.left = Math.random() * maxX + "px";
      letter.style.top = Math.random() * maxY + "px";
    });
  }

  scatterLetters();

  // ===== НАЧАЛО ПЕРЕТАСКИВАНИЯ =====
  letters.forEach(letter => {
    letter.addEventListener("mousedown", e => {
      current = letter;

      const rect = letter.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      letter.style.cursor = "grabbing";
    });
  });

  // ===== ДВИЖЕНИЕ =====
  document.addEventListener("mousemove", e => {
    if (!current) return;

    const fieldRect = lettersField.getBoundingClientRect();

    let x = e.clientX - fieldRect.left - offsetX;
    let y = e.clientY - fieldRect.top - offsetY;

    const maxX = lettersField.clientWidth - current.offsetWidth;
    const maxY = lettersField.clientHeight - current.offsetHeight;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    current.style.left = x + "px";
    current.style.top = y + "px";
  });

  // ===== ОТПУСКАНИЕ =====
  document.addEventListener("mouseup", () => {
    if (!current) return;

    let placed = false;

    slots.forEach(slot => {
      const s = slot.getBoundingClientRect();
      const r = current.getBoundingClientRect();

      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;

      if (cx > s.left && cx < s.right && cy > s.top && cy < s.bottom) {
        if (!slot.dataset.letter) {
          slot.dataset.letter = current.dataset.letter;
          slot.appendChild(current);

          current.style.left = "0";
          current.style.top = "0";
          placed = true;
        }
      }
    });

    current.style.cursor = "grab";
    current = null;

    checkWord();
  });

  // ===== ПРОВЕРКА СЛОВА =====
  function checkWord() {
    const word = [...slots].map(s => s.dataset.letter || "").join("");
    result.classList.toggle("show", word === "YOUARE");
  }

  // ===== RESET =====
  resetBtn.addEventListener("click", () => {
    slots.forEach(slot => {
      slot.dataset.letter = "";
      if (slot.firstChild) {
        lettersField.appendChild(slot.firstChild);
      }
    });

    result.classList.remove("show");
    scatterLetters();
  });
}