// Data accessed from wordlist.js.
// Object properties: word, hint

// Set Dom elements as variables
let gameIntroPage = document.getElementById("game__intro__page");
let gameHeading = document.getElementById("game__heading");
let gameContent = document.getElementById("game__content");
let gameOutcome = document.getElementById("game__outcome");
let gameBestScores = document.getElementById("game__outcome__bestscores");
let hangmanImage = document.querySelector(".game__display__img");
let wordDisplay = document.querySelector(".game__display__word");
let hintDisplay = document.querySelector(".game__display__hint span");
let guessDisplay = document.querySelector(".game__display__guesses span");
let outcomeDisplay = document.querySelector(".game__display__outcome");
let keyboardContainer = document.getElementById("keyboard__container");
let username = document.getElementById("game__intro__username");
let avatar = document.getElementById("game__intro__avatar");
let headingAvatar = document.getElementById("game__heading__avatar");
let headingUsername = document.getElementById("game__heading__name");
let startButton = document.querySelector(".game__start__button");
let randomNumber = Math.floor(Math.random() * wordList.length);

// Set random word and hint
let randomWord = wordList[randomNumber].word;
let randomHint = wordList[randomNumber].hint;
console.log(randomWord, randomHint);

// Initiate variables for randomWord, wordGuesses, maximumAmountOfGuesses, avatars, alphabet
let amountOfGuesses = 1;
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
  },
];

let alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

// Function wordToGuessUnderlines
const wordToGuessUnderlines = () => {
  wordDisplay.innerHTML = randomWord
    .split("")
    .map(() => {
      const letterSpan = document.createElement("span");
      letterSpan.classList.add("letterSpan");
      wordDisplay.appendChild(letterSpan);
      return letterSpan.outerHTML;
    })
    .join("");
};
// Function createKeyboardButtons
const createKeyboardButtons = (alphabet) => {
  for (let letter of alphabet) {
    const button = document.createElement("button");
    button.innerHTML = letter;
    button.classList.add("keyboard__button");
    button.addEventListener("click", (e) => {
      // Add 'active' class to the clicked button
      e.target.classList.add("active");
      startGame(e.target, letter);
    });
    keyboardContainer.appendChild(button);
  }
};
// call the createKeyboardButtons function
createKeyboardButtons(alphabet);

const createAvatarButtons = (avatars) => {
  for (let i = 0; i < avatars.length; i++) {
    const button = document.createElement("button");
    // Accessing avatar paths
    const avatarPath = avatars[i].path;
    button.innerHTML = `<img class="avatarImage" src="${avatarPath}" alt="avatar image">`;
    button.addEventListener("click", () => {
      // Remove the 'active' class from all avatar buttons
      const allAvatarButtons = document.querySelectorAll(".avatarButton");
      allAvatarButtons.forEach((btn) => {
        btn.classList.remove("active");
      });
      // Add the 'active' class to the clicked button
      button.classList.add("active");
      // Apply grayscale to all avatar images except the clicked one
      const allAvatarImages = document.querySelectorAll(".avatarImage");
      allAvatarImages.forEach((img) => {
        if (img !== button.querySelector("img")) {
          img.style.filter = "grayscale(100%)";
        } else {
          // Reset filter for the clicked image
          img.style.filter = "none";
        }
      });
      // Call function to update the profile with the selected avatar
      createUserAvatar(avatarPath);
    });
    // Add a class to all avatar buttons
    button.classList.add("avatarButton");
    avatar.appendChild(button);
  }
};
createAvatarButtons(avatars);

// Function createUsername
const createUsername = () => {
  const enteredUsername = username.value;
  headingUsername.innerHTML = enteredUsername;
};
// update the profile of the player
const createUserAvatar = (avatarPath) => {
  headingAvatar.innerHTML = `<img class="avatarImage" src="${avatarPath}" alt="avatar image">`;
};
// function for if Avatar is clicked
const isAvatarClicked = () => {
  const activeAvatarButton = document.querySelector(".avatarButton.active");
  return activeAvatarButton !== null;
};

// function Display image
const displayImage = (amountOfGuesses) => {
  hangmanImage.src = `public/hangman-${amountOfGuesses}-white.png`;
};

// function Display hint
const displayHint = (randomHint) => {
  hintDisplay.innerHTML = randomHint;
};

// function Display guesses
const displayGuesses = (amountOfGuesses) => {
  guessDisplay.innerHTML = amountOfGuesses;
};

// hide appropriate sections before game starts
gameContent.classList.add("hidden");
gameOutcome.classList.add("hidden");
gameHeading.classList.add("hidden");

// function Start game
const startGame = () => {
  if (username.value === "") {
    alert("Please enter a username");
    // Exit the function if no username is entered
    return;
  }
  if (!isAvatarClicked()) {
    alert("Please select an avatar before starting the game.");
    // Exit the function if no avatar is clicked
    return;
  }
  gameIntroPage.classList.add("hidden");
  gameOutcome.classList.add("hidden");
  gameHeading.classList.remove("hidden");
  gameContent.classList.remove("hidden");
  amountOfGuesses = 1;
  wordToGuessUnderlines();
  displayGuesses(amountOfGuesses);
  displayImage(amountOfGuesses);
  displayHint(randomHint);
  createUsername();
};

startButton.addEventListener("click", startGame);

// function Reset game

// function End game

// function Guess

// function Check for win or loss
