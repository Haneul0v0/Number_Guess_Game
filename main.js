let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let heartIconsContainer = document.getElementById("heart-icons");
let numberBox = document.getElementById("number-box");
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
    userInput.value = "";
});

function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 50) + 1;
    console.log("정답", computerNum);
}

function updateChanceIcons() {
    let heartIcons = heartIconsContainer.querySelectorAll(".fa-heart");

    heartIcons.forEach((icon, index) => {
        if (index < chances) {
            icon
                .classList
                .remove("fa-regular");
            icon
                .classList
                .add("fa-solid");
        } else {
            icon
                .classList
                .remove("fa-solid");
            icon
                .classList
                .add("fa-regular");
        }
    });
}

function play() {
    let userValue = parseInt(userInput.value);

    if (isNaN(userValue) || userValue < 1 || userValue > 50) {
        resultArea.textContent = "1 ~ 50 사이의 숫자를 입력해 주세요.";
        return;
    }

    if (history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다.";
        return;
    }

    chances--;
    updateChanceIcons();

    if (userValue < computerNum) {
        resultArea.textContent = "UP!";
    } else if (userValue > computerNum) {
        resultArea.textContent = "DOWN!";
    } else {
        resultArea.textContent = "정답입니다!";
        numberBox.textContent = computerNum;
        gameOver = true;
    }

    history.push(userValue);

    if (chances < 1 || gameOver) {
        gameOver = true;
        numberBox.textContent = computerNum;
        playButton.disabled = true;
    }
}

function reset() {
    userInput.value = "";
    pickRandomNum();
    resultArea.textContent = "";
    numberBox.textContent = "?";
    chances = 5;
    gameOver = false;
    history = [];
    updateChanceIcons();
    playButton.disabled = false;
}

pickRandomNum();
