//===============================================
// KEY VARIABLES
//===============================================
// Get the element with the ID of 'overlay' and save it to a variable
let sectionOverlay = document.getElementById('overlay');
// Get the element with the ID of 'qwerty' and save it to a variable
let sectionQwerty = document.getElementById('qwerty');
// Get the element with the ID of 'phrase' and save it to a variable
let sectionPhrase = document.getElementById('phrase');
// Get the elements with the class of 'title' and save it to a variable
let pageTitle = document.getElementById('overlay').firstElementChild;
// Get the start button element by looking for the last child of the element with the id 'overlay'
let startButton = document.getElementById('overlay').lastElementChild;

// Create a variable to track the number of missed guesses, and initialize it to 0
let missedGuess = 0;
// Create a variable for the number of lives a player should start with (for setting up the game)
let playerLives = 5;


//===============================================
// PHRASES
//===============================================
// 1. Create a 'phrases' array containing at least 5 different phrases as strings.

const phrases = [
  'Nick Fury', 
  'Pepper Potts', 
  'Captain America',
  'Iron Man',
  'Spider Man',
  'The Hulk',
  'Black Panther',
  'Black Widow',
  'The Winter Soldier',
  'Star Lord',
  'War Machine',
  'Ant Man',
  'Doctor Strange',
  'The Wasp'
];


//===============================================
// GENERATE ARRAY OF CHARACTERS FROM PHRASE
//===============================================
// 1. Generate a random number equal the number of phrases in the array.
// 2. Select the phrase in the phrase array in the random position generated above.
// 3. Create an empty array ready for the phrase's individual characters.
// 4. Push each letter of the selected phrase onto the new array.
// 5. Return the array of characters (phraseCharacters) at the end of the function.

function getRandomPhraseAsArray(arr) {
  let arrayPosition = Math.floor(Math.random() * arr.length);
  let randomPhrase = arr[arrayPosition];
  let phraseCharacters = [];

  for (let i = 0; i < randomPhrase.length; i += 1) {
    phraseCharacters.push(randomPhrase[i]);
  }

  return phraseCharacters;
};


//===============================================
// ADD PHRASE CHARACTERS TO SCREEN
//===============================================
// 1. Create an addPhraseToDisplay function that loops through an array of characters and adds them to the screen as list items
// 2. Select the correct unordered list element in the DOM and assign it to the variable 'ul'.
// 3. Cycle through the array that has been passed into the function.
// 4. For each pass of the for loop, create a variable to contain the character value.
// 5. Create a list item and assign it to the variable li.
// 6. Add the character to the text value of the list item element
// 7. If the list item's text value is NOT a space (i.e. it's a letter) then add the class 'letter'
// 8. If the list item's text value is a space then add the class 'space'
// 9. Append the list item to the unordered list

function addPhraseToDisplay(arr) {
  const ul = document.getElementById('phrase').firstElementChild;

  for (let i = 0; i < arr.length; i += 1) {
    const characterValue = arr[i];
    const li = document.createElement('li');

    li.textContent = characterValue;
    
    if (li.textContent != ' ') {
      li.className = 'letter';
      ul.appendChild(li);
    } else {
      li.className = 'space';
      ul.appendChild(li);
    }
  }
};

function resetPhrase() { 
  const ul = document.getElementById('phrase').firstElementChild;
  while (ul.firstElementChild) {
    ul.removeChild(ul.firstElementChild);
  } 

  let phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray); 
  console.log(phraseArray);
};

function resetKeyboard() {
  qwertyButtons = sectionQwerty.getElementsByTagName('button');
  
  for (let i = 0; i < qwertyButtons.length; i += 1) {
    qwertyButtons[i].className = 'null';
    qwertyButtons[i].disabled = false;
  }
};

function resetScoreboard() {
  missedGuess = 0;
  let allHearts = document.getElementsByClassName('tries');

  for (i = 0; i < allHearts.length; i += 1) {
    allHearts[i].lastElementChild.setAttribute('src', 'images/liveHeart.png');
  }
};


//===============================================
// SETUP THE GAME
//===============================================
// 1. Attach an event listener to the “Start Game” button. When it's clicked, the game should set / reset the game.
// 2. Set the overlay display to 'none'.
// 3. Clears the phrase section.
// 4. Generates and inserts the new phrase.
// 5. Clears the keyboard of 'disabled' buttons.
// 6. Reset the scoreboard.

startButton.addEventListener('click', () => {
  sectionOverlay.style.display = 'none';
  resetPhrase();
  resetKeyboard();
  resetScoreboard();
});

// To use the function, you’ll get the value returned by the getRandomPhrasesArray, save it to a variable, and pass it to addPhraseToDisplay as an argument:

//===============================================
// CHECK GUESS AGAINST PHRASE LETTERS
//===============================================
// 1. Assign the argument sent to the variable to buttonClicked.
// 2. Collect all the letters in the phrase and assign them to the variable phraseLetters as an array.
// 3. Loop over the array of phrase letters. 
// 4. If any match the guessed letter, set their element's class name to 'show'. 
// 6. If there is a match, assign that element's text to the variable 'letterMatched'.
// 7. Else if there is no match, return the value of 'null'.

function checkLetter(arr) {  
  let buttonClicked = arr;
  let phraseLetters = document.getElementsByClassName('letter');
  let letterMatched = null;

  for (let i = 0; i < phraseLetters.length; i += 1) {
    if (buttonClicked.toUpperCase() === phraseLetters[i].textContent.toUpperCase()) {  
      phraseLetters[i].className += ' show';
      letterMatched = buttonClicked;
    }
  }

  return letterMatched;
};


//===============================================
// CHECK IF PLAYER HAS WON
//===============================================
// 1. Each time checkWin is executed, collect all the elements with the class name 'letter' + 'show' into arrays.
// 2. Check if the length of both arrays are the same. 
// 3. If they are, select the overlay element and set its class name to 'win' and set it to display.

function checkWin() {  
  let lettersWithLetters = document.getElementsByClassName('letter');
  let lettersWithShow = document.getElementsByClassName('show');

  if (lettersWithShow.length == lettersWithLetters.length) {
    sectionOverlay.className = 'win';
    sectionOverlay.style.display = '';
    pageTitle.textContent = 'You won! Play again?';
    startButton.textContent = ' Play again! ';
  }
};


//===============================================
// PLAYER GUESES
//===============================================
// 1. Assign the text content of the clicked button to the variable 'buttonText'.
// 2. Set the class name of the chosen button to 'chosen' and set its disabled attribute to 'true'.
// 3. Execute the 'checkLetter' function and assign the returned variable to the 'letterFound' variable.
// 4. Check if letterFound is null. If so, increase the missedGuess count by 1.
// 5. Get the last 'live' heart in the scoreboard and change its image value to the lost version.
// 6. Execute the checkWin function at the end of the button click event.

qwerty.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    let buttonText = e.target.textContent;

    e.target.className = 'chosen';
    e.target.disabled = true;

    let letterFound = checkLetter(buttonText);
    console.log("The value returned from checkLetter is: " + letterFound);

    if (letterFound === null) {
      missedGuess = missedGuess + 1;
      console.log("The number of missed guesses is: " + missedGuess);
      
      let lastHeart = document.getElementsByClassName('tries');
      console.log(lastHeart[0]);
      lastHeart[5 - missedGuess].lastElementChild.setAttribute('src', 'images/lostHeart.png');
      
      if (missedGuess === 5) {
        sectionOverlay.className = 'lose';
        sectionOverlay.style.display = '';
        pageTitle.textContent = 'You Lost! Play again?';
        startButton.textContent = ' Play Again! ';
      }
    }

    checkWin();
  }
});