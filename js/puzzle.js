let collected = new Set();
let activeObject = null;

export function initPuzzle() {
  const objects = document.querySelectorAll(".space-object");
  const ui = document.getElementById("piecesUI");
  const complete = document.getElementById("puzzleComplete");
  const closeBtn = document.getElementById("closePuzzle");

  objects.forEach(obj => {
    const overlay = obj.querySelector(".piece-overlay");
    const pieceId = obj.dataset.piece;
    const imgSrc = obj.dataset.img;

    /* ===== КЛИК ПО ОБЪЕКТУ ===== */
    obj.addEventListener("click", () => {
      if (activeObject) return;
      if (collected.has(pieceId)) return;

      activeObject = obj;

      objects.forEach(o => {
        if (o !== obj) o.classList.add("hidden");
      });

      // показываем нужную картинку
      overlay.style.backgroundImage = `url(${imgSrc})`;
      overlay.style.opacity = "1";
      overlay.style.pointerEvents = "auto";

      obj.classList.add("zoomed");
    });

    /* ===== КЛИК ПО КУСОЧКУ ===== */
    overlay.addEventListener("click", (e) => {
      e.stopPropagation();
      if (activeObject !== obj) return;

      collectPiece(imgSrc, ui);
      collected.add(pieceId);

      // возврат объекта
      obj.classList.remove("zoomed");
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";

      objects.forEach(o => o.classList.remove("hidden"));
      activeObject = null;

      // если всё собрано — финал
      if (collected.size === objects.length) {
        complete.classList.add("active");
      }
    });
  });

  /* ===== ЗАКРЫТИЕ ФИНАЛА И СБРОС ===== */
  closeBtn.addEventListener("click", () => {
    complete.classList.remove("active");
    resetPuzzle(objects, ui);
  });
}

/* ===== ДОБАВЛЕНИЕ КАРТИНКИ В UI ===== */
function collectPiece(imgSrc, ui) {
  const piece = document.createElement("div");
  piece.classList.add("ui-piece");
  piece.style.backgroundImage = `url(${imgSrc})`;
  piece.style.backgroundSize = "cover";
  piece.style.backgroundPosition = "center";
  ui.appendChild(piece);
}

/* ===== ПОЛНЫЙ СБРОС ПАЗЛА ===== */
function resetPuzzle(objects, ui) {
  collected.clear();
  activeObject = null;
  ui.innerHTML = "";

  objects.forEach(obj => {
    obj.classList.remove("zoomed", "hidden");

    const overlay = obj.querySelector(".piece-overlay");
    if (overlay) {
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
    }
  });
}