const hangmanImage = document.querySelector(".game__image__hangman img");
const gameContainer = document.querySelector(".game__container");
const playAgainButton = gameContainer.querySelector(
  ".game__container__outcome__button"
);
const wordDisplay = document.querySelector(".game__word__display");
const hintText = document.querySelector(".game__word__hint span");
const keyboard = document.querySelector(".game__word__keyboard");

let currentWord;
let correctLetters;
let wrongGuessCount = 0;

const maximumGuesses = 6;

const playAgain = () => {
  const randomWord = getRandomWord();
  currentWord = randomWord.word;
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = "public/hangman-0.png"; 
  hintText.innerText = `${wrongGuessCount} / ${maximumGuesses}`;
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  keyboard.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
  gameContainer.classList.remove("show");
};

const getRandomWord = () => {
  const wordObject = wordList[Math.floor(Math.random() * wordList.length)]; 
  currentWord = wordObject.word; 
  hintText.innerHTML = wordObject.hint; 
  return wordObject;
};

const gameOver = (won) => {
  const gameText = won ? `You found the word:` : "The correct word was:"; 
  gameContainer.querySelector("img").src = `/${won ? "success" : "youLost"}.gif`;
  gameContainer.querySelector("h2").innerText = won ? "Way to Go!" : "Game Over!"; 
  gameContainer.querySelector("p span").innerHTML = `${gameText} <span>${currentWord}</span>`; 
  gameContainer.classList.add("show");
};

const startGame = (button, chosenLetter) => {
  if (currentWord.includes(chosenLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === chosenLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
    hangmanImage.src = `public/hangman-${wrongGuessCount}.png`;
  }
  button.disabled = true;
  hintText.innerText = `${wrongGuessCount} / ${maximumGuesses}`;

  if (wrongGuessCount === maximumGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboard.appendChild(button);
  button.addEventListener("click", (e) =>
    startGame(e.target, e.target.innerText)
  );
}
getRandomWord();
playAgainButton.addEventListener("click", playAgain);
