'use strict'

const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.key-container');
const messageDisplay = document.querySelector('.message-container');
const endMessage = document.querySelector('.end-message-container');
const allKeyboardCharacters = 'qwertyuiopasdfghjklzxcvbnm'.toUpperCase();
let wordle;

const getWordle = () => {
    fetch('http://localhost:8000/word')
        .then(response => response.json())
        .then(json => {
            wordle = json.toUpperCase();
        })
        .catch(err => console.log(err));
}
getWordle();

const keys = Array.from(allKeyboardCharacters);
keys.splice(19, 0, 'Enter');
keys.push('«');

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
];

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

// setting id for each row and tile
guessRows.forEach((guessRow, guessRowIndex) => {
    const rowEl = document.createElement('div');
    rowEl.setAttribute('id', 'guessRow-' + guessRowIndex);
    guessRow.forEach((guess, guessIndex) => {
        const tileEl = document.createElement('div');
        tileEl.setAttribute('id', `guessRow-${guessRowIndex}-tile-${guessIndex}`);
        tileEl.classList.add('tile');
        rowEl.append(tileEl);
    })
    tileDisplay.append(rowEl);
});

keys.forEach(key => {
    const buttonEl = document.createElement('button');
    buttonEl.textContent = key;
    buttonEl.setAttribute('id', key);
    buttonEl.addEventListener('click', () => handleClick(key)); // need call back f cause paramether passed. Without cb f it would pull the func straight away 
    keyboard.append(buttonEl);
});

const handleClick = (letter) => {
    if (!isGameOver) {
        if (letter === '«') {
            deleteLetter();
            return;
        } if (letter === 'Enter') {
            checkRow();
            return;
        }
        addLetter(letter);
    }
};

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById(`guessRow-${currentRow}-tile-${currentTile}`);
        tile.textContent = letter;
        guessRows[currentRow][currentTile] = letter; // same as writing GuessRows[0,0] and replacing this value with a letter
        tile.setAttribute('data', letter); // for coloring
        currentTile++;
    }
};

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.getElementById(`guessRow-${currentRow}-tile-${currentTile}`);
        tile.textContent = '';
        guessRows[currentRow][currentTile] = '';
        tile.setAttribute('data', '');
    }
};

const checkRow = () => {
    const guess = guessRows[currentRow].join('');
    if (currentTile > 4) {
        flipTile();
        console.log(`my guess is ${guess}, wordle is ${wordle}`); //uncomment to see word
        if (wordle === guess) {
            setTimeout(() => {
                showMessage('Good Job. Well done!');
            }, 2500);
            isGameOver = true;
        } else {
            if (currentRow >= 5) {
                isGameOver = true;
                showMessage('Game over. Better luck next time')
                return;
            }
            if (currentRow < 5) {
                currentRow++;
                currentTile = 0;
            }
        }
    }
}

const showMessage = (message) => {
    const messageEl = document.createElement('p');
    const endMessageEl = document.createElement('p'); //
    messageEl.textContent = message;
    endMessageEl.textContent = `Correct word - ${wordle}`; //
    messageDisplay.append(messageEl);
    endMessage.append(endMessageEl); //
    setTimeout(() => messageDisplay.removeChild(messageEl), 5000);
    setTimeout(() => endMessage.removeChild(endMessageEl), 5000);//
}

const addColorToKey = (keyLetter, style) => {
    const key = document.getElementById(keyLetter);
    key.classList.add(style);
}

const flipTile = () => {
    const rowTiles = document.querySelector(`#guessRow-${currentRow}`).childNodes; // grabbing the guess row and getting all the children
    let checkWordle = wordle; // pulling out the guess word, check each letter, and by index setting color
    const guess = [];

    rowTiles.forEach(tile => {
        guess.push({ letter: tile.getAttribute('data'), color: 'grey-overlay' });
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay';
            checkWordle = checkWordle.replace(guess.letter, '');
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay';
            checkWordle = checkWordle.replace(guess.letter, '');
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip');
            tile.classList.add(guess[index].color);
            addColorToKey(guess[index].letter, guess[index].color);
        }, 500 * index);
    })
}