// Data accessed from wordlist.js.
// Object properties: word, hint

// Set Dom elements as variables
let hangmanImage = document.querySelector(".game__display__img");
let wordDisplay = document.querySelector(".game__display__word");
let hintDisplay = document.querySelector(".game__display__hint span");
let guessDisplay = document.querySelector(".game__display__guesses span");
let outcomeDisplay = document.querySelector(".game__display__outcome");
let keyboardContainer = document.getElementById("keyboard__container");
let username = document.getElementById("game__intro__username");
let avatar = document.getElementById("game__intro__avatar");
let randomNumber = Math.floor(Math.random() * wordList.length);

// Set random word and hint
let randomWord = wordList[randomNumber].word;
let randomHint = wordList[randomNumber].hint;
console.log(randomWord, randomHint);

// Initiate variables for randomWord, wordGuesses, maximumAmountOfGuesses, avatars, alphabet
let amountOfGuesses = 0;
let maximumAmountOfGuesses = 6;
let avatars = [
  {
    path: "public/spidermanc-avatar.png",
  },
  {
    path: "public/maninhood-avatar.png",
  },
  {
    path: "public/spidermanm-avatar.png",
  },
  {
    path: "public/spidermanu-avatar.png",
  },
  {
    path: "public/spiderman9-avatar.png",
  }
];
let alphabet = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
];

// function wordToGuessUnderlines
const wordToGuessUnderlines = () => {
  wordDisplay.innerHTML = randomWord
    .split("")
    .map((letter) => {
      const letterSpan = document.createElement("span");
      letterSpan.classList.add("letterSpan");
      wordDisplay.appendChild(letterSpan);
      return letterSpan.outerHTML;
    })
    .join("");
};

// call the function wordToGuessUnderlines
wordToGuessUnderlines();

// function createKeyboardButtons
const createKeyboardButtons = (alphabet) => {
  for (let letter of alphabet) {
    const button = document.createElement("button");
    button.innerHTML = letter;
    button.addEventListener("click", (e) => startGame(e.target, letter));
    keyboardContainer.appendChild(button);
  }
};
// Call the function to create keyboard buttons
createKeyboardButtons(alphabet);

  const createAvatarButtons = (avatars) => {
    for (let i = 0; i < avatars.length; i++) {
      const button = document.createElement("button");
      const avatarPath = avatars[i].path; // Accessing avatar paths
      button.innerHTML = `<img class="avatarImage" src="${avatarPath}" alt="avatar image">`;
      button.addEventListener("click", () => updateProfile(avatarPath));
      avatar.appendChild(button);
    }
  };
  
  createAvatarButtons(avatars);

// update the profile of the player

// function Display image
const displayImage = (amountOfGuesses) => {
  hangmanImage.src = `public/hangman-${amountOfGuesses}-white.png`;
};

// call the function for display image

displayImage(amountOfGuesses);

// function Display hint
const displayHint = (randomHint) => {
  hintDisplay.innerHTML = randomHint;
};

// call the function for display hint
displayHint(randomHint);

// function Display guesses
const displayGuesses = (amountOfGuesses) => {
  guessDisplay.innerHTML = amountOfGuesses;
};

// function Start game
const startGame = () => {
  amountOfGuesses = 0;
  displayImage(amountOfGuesses);
};

// function Reset game

// function End game

// function Guess

// function Check for win or loss
