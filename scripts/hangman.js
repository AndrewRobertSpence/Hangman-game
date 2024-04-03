// 1. Data accessed from wordlist.js.
// 2. Object properties: word, hint
// 3. Set Dom elements as variables
let gameIntroPage = document.getElementById("game__intro__page");
let gameContent = document.getElementById("game__content");
let gameOutcome = document.getElementById("game__outcome");
let gameBestScores = document.getElementById("game__outcome__bestscores");
let playAgainButton = document.querySelector(".game__playagain__button");
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

// 5. Set random word and hint
let randomWord = wordList[randomNumber].word;
let randomHint = wordList[randomNumber].hint;
console.log(randomWord, randomHint);

// 6. Initiate variables for randomWord, wordGuesses, maximumAmountOfGuesses, avatars, alphabet
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

// 7. Function wordToGuessUnderlines
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

// 8. Function createKeyboardButtons
const createKeyboardButtons = (alphabet) => {
  for (let letter of alphabet) {
    const button = document.createElement("button");
    button.innerHTML = letter;
    button.classList.add("keyboard__button");
    button.addEventListener("click", (e) => {
      // 8.1 Add 'active' class to the clicked button
      e.target.classList.add("active");
    });
    keyboardContainer.appendChild(button);
  }
};

// 9. Call the createKeyboardButtons function
createKeyboardButtons(alphabet);

const keyboardButtons = document.querySelectorAll(".keyboard__button");
keyboardButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // 9.1 Get the clicked letter from the button's text content
    const letter = button.textContent.toLowerCase();
    // 9.2 Call the guessLetter function with the clicked letter
    guessLetter(letter);
    // 9.3 Disable the button after it's clicked
    button.disabled = true;
  });
});

// 10. function for guessLetter
const guessLetter = (letter) => {
  // 10.1 Check if the guessed letter exists in the random word
  const wordLetters = randomWord.split("");
  let letterFound = false;
  wordLetters.forEach((char, index) => {
    if (char === letter) {
      // 10.2 If the letter exists and has not been guessed yet, update the display
      if (!guessedLetters.includes(letter)) {
        const letterSpan = wordDisplay.querySelectorAll(".letterSpan")[index];
        letterSpan.textContent = letter;
        letterFound = true;
        letterSpan.classList.add("flip");
      }
    }
  });
  // 10.3 If the guessed letter is not in the word, increment the guesses counter and update display
  if (!letterFound) {
    amountOfGuesses++;
    displayGuesses(amountOfGuesses);
    displayImage(amountOfGuesses);
  }
  // 10.4 Add the guessed letter to the array of guessed letters
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
  }
  // 10.5 Check for win condition after updating display
  checkWin();
};
// 11. function for createAvatarButtons
const createAvatarButtons = (avatars) => {
  for (let i = 0; i < avatars.length; i++) {
    const button = document.createElement("button");
    // 11.1 Accessing avatar paths
    const avatarPath = avatars[i].path;
    button.innerHTML = `<img class="avatarImage" src="${avatarPath}" alt="avatar image">`;
    button.addEventListener("click", () => {
      // 11.2 Remove the 'active' class from all avatar buttons
      allAvatarButtons.forEach((btn) => {
        btn.classList.remove("active");
      });
      // 11.3 Add the 'active' class to the clicked button
      button.classList.add("active");
      // 11.4 Apply grayscale to all avatar images except the clicked one
      const allAvatarImages = document.querySelectorAll(".avatarImage");
      allAvatarImages.forEach((img) => {
        if (img !== button.querySelector("img")) {
          img.style.filter = "grayscale(100%)";
        } else {
          // 11.5 Reset filter for the clicked image
          img.style.filter = "none";
        }
      });
      // 11.6 Call function to update the profile with the selected avatar
      createUserAvatar(avatarPath);
    });
    // 11.7 Add a class to all avatar buttons
    button.classList.add("avatarButton");
    avatar.appendChild(button);
  }
};
createAvatarButtons(avatars);

// 12. Update the profile of the player
const createUserAvatar = (avatarPath) => {
  headingAvatar.innerHTML = `<img class="avatarImage" src="${avatarPath}" alt="avatar image">`;
};

// 13. Function for if Avatar is clicked
const isAvatarClicked = () => {
  const activeAvatarButton = document.querySelector(".avatarButton.active");
  return activeAvatarButton !== null;
};

// 14. Function createUsername
const createUsername = () => {
  const enteredUsername = username.value;
  headingUsername.innerHTML = enteredUsername;
};

// 15. Function Display image
const displayImage = (amountOfGuesses) => {
  hangmanImage.src = `public/hangman-${amountOfGuesses}-white.png`;
};

// 16. Function Display hint
const displayHint = (randomHint) => {
  hintDisplay.innerHTML = randomHint;
};

// 17. Function Display guesses
const displayGuesses = (amountOfGuesses) => {
  guessDisplay.innerHTML = amountOfGuesses;
};

// 18. JavaScript code to hide gameOutcome, gameHeading and gameContent elements
gameContent.style.display = "none";
console.log(gameContent.classList.contains("hidden"));

// 19. Function Start game
const startGame = () => {
  if (username.value === "") {
    alert("Please enter a username");
    // 19.1 Exit the function if no username is entered
    return;
  }
  if (!isAvatarClicked()) {
    alert("Please select an avatar before starting the game.");
    // 19.2 Exit the function if no avatar is clicked
    return;
  }
  // 19.3 Hide the game intro page
  gameIntroPage.style.display = "none";
  // 19.4 Show the game content
  gameContent.style.display = "block";
  amountOfGuesses = 0;
  wordToGuessUnderlines();
  displayGuesses(amountOfGuesses);
  displayImage(amountOfGuesses);
  displayHint(randomHint);
  createUsername();
};

startButton.addEventListener("click", startGame);

// 20. Reset the game when the "Play Again" button is clicked
const resetGame = () => {
  console.log("reset game");
  // 20.1 Clear the guessed letters array
  guessedLetters = [];

  // 20.2 Reset the guessed letters display
  letterSpans.forEach((span) => {
    span.textContent = "";
  });
  // 20.3 Reset the hangman image
  amountOfGuesses = 0;
  displayGuesses(amountOfGuesses);
  displayImage(amountOfGuesses);
  // 20.4 Clear the input field
  username.value = "";
  // 20.5 Remove the existing avatar buttons and recreate them
  avatar.innerHTML = ""; // Remove all child nodes
  createAvatarButtons(avatars);
  // 20.6 Reset the avatar selection and remove grayscale filter
  allAvatarImages.forEach((img) => {
    // 20.7 Remove grayscale filter
    img.style.filter = "none";
  });
  headingAvatar.innerHTML = "";
  // 20.8 Reset the outcome text and hide it
  gameOutcomeText.innerHTML = "";
  // 20.9 Show the intro page and hide other sections
  gameIntroPage.style.display = "block";
  // 20.10 gameHeading.classList.add("hidden");
  gameContent.style.display = "none";
  gameOutcome.classList.remove("visible");
  // 20.11 Reset the random word and hint
  randomNumber = Math.floor(Math.random() * wordList.length);
  randomWord = wordList[randomNumber].word;
  randomHint = wordList[randomNumber].hint;
  // 20.12 Reset word display with new random word
  wordToGuessUnderlines();
  // 20.13 Display new hint
  displayHint(randomHint);
  // 20.14 Reset keyboard buttons
  keyboardButtons.forEach((button) => {
    button.disabled = false;
    button.classList.remove("active");
  });
};

playAgainButton.addEventListener("click", resetGame);

// 21. Function checkWin
const checkWin = () => {
  console.log("Checking win...");
  const wordLetters = randomWord.split("");
  const guessedLetters = Array.from(
    wordDisplay.querySelectorAll(".letterSpan")
  ).map((span) => span.textContent);
  // 21.1 Check if all letters in the word have been guessed
  if (wordLetters.every((letter) => guessedLetters.includes(letter))) {
    console.log("Player wins!");
    gameOutcomeImage.src = "public/Congratulations.gif";
    // 21.2 Call createProfile function to add the winner to the best scores
    createProfile();
    // 21.3 Delay transition to game outcome screen after 2 seconds if game is won
    setTimeout(() => {
      console.log("Showing game outcome...");
      gameContent.style.display = "none";
      gameOutcome.classList.add("visible");
    }, 2000); 
  }
  // 21.4 Check if maximum number of guesses reached
  if (amountOfGuesses === maximumAmountOfGuesses) {
    console.log("Maximum guesses reached.");
    gameOutcomeImage.src = "public/Try-Again.gif";
    gameOutcomeText.innerHTML = `The correct answer was:  <span>${randomWord}</span>`;
    // 21.5 Delay transition to game outcome screen after 2 seconds if maximum guesses reached
    setTimeout(() => {
      console.log("Showing game outcome...");
       gameContent.style.display = "none";
      gameOutcome.classList.add("visible");
    }, 2000); 
  }
};

// 22. Function createProfile
const createProfile = () => {
  // 22.1 Get current date
  const currentDate = new Date().toLocaleDateString();
  // 22.2 Get selected avatar path
  const selectedAvatar = document.querySelector(".avatarButton.active img").src;
  // 22.3 Extract the part of the avatar path starting from "public"
  const avatarPath = selectedAvatar.substring(selectedAvatar.indexOf("public"));
  // 22.4 Get entered username
  const enteredUsername = username.value;
  // 22.5 Create profile object
  const profile = {
    date: currentDate,
    avatar: avatarPath,
    username: enteredUsername,
    guesses: amountOfGuesses,
  };
  // 22.6 Add profile to profiles array
  profiles.push(profile);
  // 22.7 Sort profiles by number of guesses (ascending)
  profiles.sort((a, b) => a.guesses - b.guesses);
  // 22.8 Update best scores table
  updateBestScoresTable();
  // 22.9 Optionally, you can log the created profile for debugging
  console.log("New Profile:", profiles);
};

// 23. Function updateBestScoresTable
const updateBestScoresTable = () => {
  // 23.1 Clear existing rows
  tableBody.innerHTML = "";
  // 23.2 Add up to 10 best scores to the table
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
