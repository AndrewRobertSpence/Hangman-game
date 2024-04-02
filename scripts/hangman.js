// Data accessed from wordlist.js.
// Object properties: word, hint

// Set Dom elements as variables
let gameIntroPage = document.getElementById("game__intro__page");
// let gameHeading = document.getElementById("game__heading");
let gameContent = document.getElementById("game__content");
let gameOutcome = document.getElementById("game__outcome");
let gameBestScores = document.getElementById("game__outcome__bestscores");
let playAgainButton = document.querySelector(".game__playagain__button"); // Updated class name here
let hangmanImage = document.querySelector(".game__display__img");
let wordDisplay = document.querySelector(".game__display__word");
let hintDisplay = document.querySelector(".game__display__hint span");
let guessDisplay = document.querySelector(".game__display__guesses span");
let outcomeDisplay = document.querySelector(".game__display__outcome");
let keyboardContainer = document.getElementById("keyboard__container");
let username = document.getElementById("game__intro__username");
let avatar = document.getElementById("game__intro__avatar");
let headingAvatar = document.getElementById("game__heading__avatar");
let allAvatarButtons = document.querySelectorAll(".avatarButton");
let allAvatarImages = document.querySelectorAll(".avatarImage");
let headingUsername = document.getElementById("game__heading__name");
let gameOutcomeImage = document.getElementById("game__outcome__img");
let startButton = document.querySelector(".game__start__button");
let letterSpans = wordDisplay.querySelectorAll(".letterSpan");
let gameOutcomeText = document.getElementById("game__outcome__text");
let tableBody = document.querySelector("#game__outcome__bestscores tbody");
let randomNumber = Math.floor(Math.random() * wordList.length);

// Set random word and hint
let randomWord = wordList[randomNumber].word;
let randomHint = wordList[randomNumber].hint;
console.log(randomWord, randomHint);

// Initiate variables for randomWord, wordGuesses, maximumAmountOfGuesses, avatars, alphabet
let amountOfGuesses = 0;
let maximumAmountOfGuesses = 6;
let guessedLetters = [];
let profiles = [];
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
      // startGame(e.target, letter);
    });
    keyboardContainer.appendChild(button);
  }
};
// call the createKeyboardButtons function
createKeyboardButtons(alphabet);

const keyboardButtons = document.querySelectorAll(".keyboard__button");
keyboardButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get the clicked letter from the button's text content
    const letter = button.textContent.toLowerCase();
    // Call the guessLetter function with the clicked letter
    guessLetter(letter);
    // Disable the button after it's clicked
    button.disabled = true;
  });
});

// function for guessLetter
// Function to handle letter guesses
const guessLetter = (letter) => {
  // Check if the guessed letter exists in the random word
  const wordLetters = randomWord.split("");
  let letterFound = false;

  wordLetters.forEach((char, index) => {
    if (char === letter) {
      // If the letter exists and has not been guessed yet, update the display
      if (!guessedLetters.includes(letter)) {
        const letterSpan = wordDisplay.querySelectorAll(".letterSpan")[index];
        letterSpan.textContent = letter;
        letterFound = true;
      }
    }
  });
  // If the guessed letter is not in the word, increment the guesses counter and update display
  if (!letterFound) {
    amountOfGuesses++;
    displayGuesses(amountOfGuesses);
    displayImage(amountOfGuesses);
  }
  // Add the guessed letter to the array of guessed letters
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
  }
  // Check for win condition after updating display
  checkWin();
};

const createAvatarButtons = (avatars) => {
  for (let i = 0; i < avatars.length; i++) {
    const button = document.createElement("button");
    // Accessing avatar paths
    const avatarPath = avatars[i].path;
    button.innerHTML = `<img class="avatarImage" src="${avatarPath}" alt="avatar image">`;
    button.addEventListener("click", () => {
      // Remove the 'active' class from all avatar buttons
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

// update the profile of the player
const createUserAvatar = (avatarPath) => {
  headingAvatar.innerHTML = `<img class="avatarImage" src="${avatarPath}" alt="avatar image">`;
};

// function for if Avatar is clicked
const isAvatarClicked = () => {
  const activeAvatarButton = document.querySelector(".avatarButton.active");
  return activeAvatarButton !== null;
};

// Function createUsername
const createUsername = () => {
  const enteredUsername = username.value;
  headingUsername.innerHTML = enteredUsername;
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

  // JavaScript code to hide gameOutcome, gameHeading and gameContent elements
  gameContent.style.display = "none";
  // gameHeading.classList.add("hidden");
  console.log(gameContent.classList.contains("hidden"));
  // console.log(gameHeading.classList.contains("hidden"));

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
  // gameHeading.classList.remove("hidden");
    // Hide the game intro page
   gameIntroPage.style.display = "none";
      // Show the game content
    gameContent.style.display = "block";
  amountOfGuesses = 0;
  wordToGuessUnderlines();
  displayGuesses(amountOfGuesses);
  displayImage(amountOfGuesses);
  displayHint(randomHint);
  createUsername();
};

startButton.addEventListener("click", startGame);

// Reset the game when the "Play Again" button is clicked
const resetGame = () => {
  console.log("reset game");

  // Clear the guessed letters array
  guessedLetters = [];
  
  // Reset the guessed letters display
  letterSpans.forEach((span) => {
    span.textContent = "";
  });

  // Reset the hangman image
  amountOfGuesses = 0;
  displayGuesses(amountOfGuesses);
  displayImage(amountOfGuesses);

  // Clear the input field
  username.value = "";

  // Remove the existing avatar buttons and recreate them
  avatar.innerHTML = ""; // Remove all child nodes
  createAvatarButtons(avatars);

  // Reset the avatar selection and remove grayscale filter
  allAvatarImages.forEach((img) => {
    img.style.filter = "none"; // Remove grayscale filter
  });
  headingAvatar.innerHTML = "";

  // Reset the outcome text and hide it
  gameOutcomeText.innerHTML = "";

  // Show the intro page and hide other sections
  gameIntroPage.style.display = "block";
  // gameHeading.classList.add("hidden");
  gameContent.style.display = "none";
  gameOutcome.classList.remove("visible");

  // Reset the random word and hint
  randomNumber = Math.floor(Math.random() * wordList.length);
  randomWord = wordList[randomNumber].word;
  randomHint = wordList[randomNumber].hint;

  // Reset word display with new random word
  wordToGuessUnderlines();

  // Display new hint
  displayHint(randomHint);

  // Reset keyboard buttons
  keyboardButtons.forEach((button) => {
    button.disabled = false;
    button.classList.remove("active");
  });
};


// document.addEventListener('DOMContentLoaded', function() {
//   console.log("DOM loaded");
  playAgainButton.addEventListener("click", resetGame);
// });

const checkWin = () => {
  console.log("Checking win...");
  const wordLetters = randomWord.split("");
  const guessedLetters = Array.from(
    wordDisplay.querySelectorAll(".letterSpan")
  ).map((span) => span.textContent);

  // Check if all letters in the word have been guessed
  if (wordLetters.every((letter) => guessedLetters.includes(letter))) {
    console.log("Player wins!");
    gameOutcomeImage.src = "public/Congratulations.gif";
    // Call createProfile function to add the winner to the best scores
    createProfile();
    // Delay transition to game outcome screen after 2 seconds if game is won
    setTimeout(() => {
      console.log("Showing game outcome...");
      // gameHeading.classList.add("hidden");
      gameContent.style.display = "none";
      gameOutcome.classList.add("visible");
    }, 2000); // 2000 milliseconds delay (2 seconds)
  }
  // Check if maximum number of guesses reached
  if (amountOfGuesses === maximumAmountOfGuesses) {
    console.log("Maximum guesses reached.");
    gameOutcomeImage.src = "public/Try-Again.gif";
    gameOutcomeText.innerHTML = `The correct answer was: ${randomWord}`;
    // Delay transition to game outcome screen after 2 seconds if maximum guesses reached
    setTimeout(() => {
      console.log("Showing game outcome...");
      // gameHeading.classList.add("hidden");
      gameContent.style.display = "none";
      gameOutcome.classList.add("visible");
    }, 2000); // 2000 milliseconds delay (2 seconds)
  }
};

const createProfile = () => {
  // Get current date
  const currentDate = new Date().toLocaleDateString();
  // Get selected avatar path
  const selectedAvatar = document.querySelector(".avatarButton.active img").src;
  // Extract the part of the avatar path starting from "public"
  const avatarPath = selectedAvatar.substring(selectedAvatar.indexOf("public"));
  // Get entered username
  const enteredUsername = username.value;
  // Create profile object
  const profile = {
    date: currentDate,
    avatar: avatarPath,
    username: enteredUsername,
    guesses: amountOfGuesses,
  };
  // Add profile to profiles array
  profiles.push(profile);
  // Sort profiles by number of guesses (ascending)
  profiles.sort((a, b) => a.guesses - b.guesses);
  // Update best scores table
  updateBestScoresTable();
  // Optionally, you can log the created profile for debugging
  console.log("New Profile:", profiles);
};

const updateBestScoresTable = () => {
  // Clear existing rows
  tableBody.innerHTML = "";
  // Add up to 10 best scores to the table
  profiles.slice(0, 10).forEach((profile) => {
    const row = `
      <tr class="bestscore__row">
        <td class="profile__date">${profile.date}</td>
        <td class="profile__info">
          <img class="profile__avatar" src="${profile.avatar}" alt="avatar">
          <span class="profile__username">${profile.username}</span>
        </td>
        <td class="profile__guesses">${profile.guesses}</td>
      </tr>
    `;
    tableBody.insertAdjacentHTML("beforeend", row);
  });
};
