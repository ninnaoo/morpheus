let testBtn = document.getElementById('test-cover-btn');
let testCover = document.querySelector('.test-cover')
testBtn.addEventListener('click', () => {
    testCover.style.display = 'none';
});
const questions = [
  //1
  {
    text: "что вы хотите, чтобы принесли вам в пиалочку, пока вы делаете домашку или работаете?",
    answers: [
      { img: "assets/images/strawberry.jpg", type: "a" },
      { img: "assets/images/blueberry.jpg", type: "b" },
      { img: "assets/images/raspberry.jpg", type: "c" },
      { img: "assets/images/cherry.jpg", type: "d" }
    ]
  },
  //2
  {
    text: "в какой шапке пойдём гулять зимой?",
    answers: [
      { text: "с помпошкой", type: "a" },
      { text: "очень смешни и кьют в виде какого-нибудь животного", type: "b" },
      { text: "обычная черная", type: "c" },
      { text: "вообще без шапки", type: "d" }
    ]
  },
  //3
  {
    text: "если ваш лучший друг осветит вас о призраке в странном доме в самом дальнем конце улицы, что вы ему ответите?",
    answers: [
      { text: "идем прямо сейчас и снимаем блог", type: "a" },
      { text: "это был бомж-маньяк, туда небезопасно идти", type: "b" },
      { text: "я беру доску уиджи, вызывем там души всех его родственников", type: "c" },
      { text: "не верю в призраков, я иду спать", type: "d" }
    ]
  },
  //4
  {
    text: "выбери группу растений",
    answers: [
      { text: "хвойные", type: "a" },
      { text: "лиственные", type: "b" },
      { text: "водоросли", type: "c" },
      { text: "мохообразные", type: "d" }
    ]
  },
  //5
  {
    text: "выбери вайб, с которым себя ассоциируешь",
    answers: [
      { img: "assets/images/vibe1.jpg", type: "a" },
      { img: "assets/images/vibe2.jpg", type: "b" },
      { img: "assets/images/vibe3.jpg", type: "c" },
      { img: "assets/images/vibe4.jpg", type: "d" }
    ]
  },
  //6
  {
    text: "ты запускаешь руку в карман старой куртки и находишь там..",
    answers: [
      { text: "чеки, фантики, брошюры", type: "a" },
      { text: "банковскую карту, которая считалась потерянной", type: "b" },
      { text: "несколько монеток", type: "c" },
      { text: "в куртке ничего нет", type: "d" }
    ]
  },
  //7
  {
    text: "какой вкус зубной пасты для тебя самый лучший",
    answers: [
      { text: "лесной вкус: ягоды, варенье из шишек", type: "a" },
      { text: "дракоша с земляникой, вкус детсва", type: "b" },
      { text: "обычная мятная", type: "c" },
      { text: "фруктовый вкус, что-нибудь с апельсином, яблоком и т.п.", type: "d" }
    ]
  },
    //8
  {
    text: "предстоит долгая поездка, твои занятия:",
    answers: [
      { text: "спать и высыпаться весь путь", type: "a" },
      { text: "переслушать весь плейлист загадочно смотря в окно", type: "b" },
      { text: "просмотр фильмов или чтение книг/фанфиков", type: "c" },
      { text: "разговоры обо всем с собеседниками, съёмка всего что за окном", type: "d" }
    ]
  },
];

const results = {
  a: {
    title: "чилловый ксено",
    text: "ты реально на вайбе, просто играешь в геншин",
    img: "assets/images/xeno1.jpg"
  },
  b: {
    title: "голодный ксено",
    text: "тебе срочно нужен чизбургер с беконом из паба и картошка фри с сырным соусом",
    img: "assets/images/xeno2.jpg"
  },
  c: {
    title: "мини - ксено",
    text: "глупи малыш - кроха, просто котёночек, немношк шокированный",
    img: "assets/images/xeno3.jpg"
  },
  d: {
    title: "ксено - крутышка",
    text: "знаете будильник? он разбудил",
    img: "assets/images/xeno4.jpg"
  }
};

let current = 0;
let score = { a:0, b:0, c:0, d:0 };

const qText = document.getElementById("questionText");
const answersBox = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const resultBlock = document.getElementById("testResult");

function showQuestion() {
  nextBtn.disabled = true;
  answersBox.innerHTML = "";

  const q = questions[current];
  qText.textContent = q.text;

  q.answers.forEach(ans => {
    const div = document.createElement("div");
    div.className = "answer";

    // ЕСЛИ КАРТИНКА
    if (ans.img) {
      const img = document.createElement("img");
      img.src = ans.img;
      img.alt = ans.text || "";
      div.appendChild(img);
    } 
    // ЕСЛИ ТЕКСТ
    else if (ans.text) {
      const span = document.createElement("span");
      span.textContent = ans.text;
      div.appendChild(span);
    }

    div.addEventListener("click", () => {
      document.querySelectorAll(".answer")
        .forEach(a => a.classList.remove("active"));

      div.classList.add("active");
      nextBtn.disabled = false;
      nextBtn.dataset.type = ans.type;
    });

    answersBox.appendChild(div);
  });
}

nextBtn.addEventListener("click", () => {
  const type = nextBtn.dataset.type;
  score[type]++;

  current++;

  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("testCard").style.display = "none";
  resultBlock.classList.add("active");

  const finalType = Object.keys(score).reduce((a,b)=> score[a]>score[b]?a:b);
  const res = results[finalType];

  document.getElementById("resultImg").src = res.img;
  document.getElementById("resultTitle").textContent = res.title;
  document.getElementById("resultText").textContent = res.text;
}

showQuestion();