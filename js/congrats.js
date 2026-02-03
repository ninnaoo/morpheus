let gift1Btn = document.querySelector('.congrats-gift1');
let gift2Btn = document.querySelector('.congrats-gift2');
let congratsText = document.querySelector('.congrats-text');
let congratsImg = document.querySelector('.congrats-img');
gift1Btn.addEventListener('click', () => {
    congratsText.style.display = 'block';
});
gift2Btn.addEventListener('click', () => {
    congratsImg.style.display = 'block';
});