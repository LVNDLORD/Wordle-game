'use strict'

const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.key-container');
const messageDisplay = document.querySelector('.message-container');

const allKeyboardCharacters = 'qwertyuiopasdfghjklzxcvbnm'.toUpperCase();
const wordle = 'SUPER';
const keys = Array.from(allKeyboardCharacters);
// const keyPressed = e => console.log(e.key);
// document.addEventListener('keydown', keyPressed);
keys.splice(19, 0, 'Enter');
keys.push('«'); //backspace
console.log(keys);

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
    console.log('clicked', letter);
    if (letter === '«') {
        console.log('delete letter');
        deleteLetter();
        return;
    } if (letter === 'Enter') {
        console.log('check the row');
        checkRow();
        return;
    }
    addLetter(letter);
};

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById(`guessRow-${currentRow}-tile-${currentTile}`);
        tile.textContent = letter;
        guessRows[currentRow][currentTile] = letter; // same as writing GuessRows[0,0] and replacing this value with a letter
        tile.setAttribute('data', letter); // for coloring
        currentTile++;
        console.log('guessRow', guessRows);
    }
};

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.getElementById(`guessRow-${currentRow}-tile-${currentTile}`);
        tile.textContent = '';
        guessRows[currentRow][currentTile] = '';
        tile.setAttribute('data', '');
        console.log('guessRow', guessRows);
    }
};

const checkRow = () => {
    const guess = guessRows[currentRow].join('');
    if (currentTile > 4) {
        flipTile();
        console.log(`my guess is ${guess}, wordle is ${wordle}`);
        if (wordle === guess) {
            showMessage('Good Job. Well done!');
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
    messageEl.textContent = message;
    messageDisplay.append(messageEl);
    setTimeout(() => messageDisplay.removeChild(messageEl), 5000);
}

const flipTile = () => {
    const rowTiles = document.querySelector(`#guessRow-${currentRow}`).childNodes; // grabbing the guess row and getting all the children
    rowTiles.forEach((tile, index) => {
        const dataLetter = tile.getAttribute('data');

        if (dataLetter === wordle[index]) {
            tile.classList.add('green-overlay');
        } else if (wordle.includes(dataLetter)) {
            tile.classList.add('yellow-overlay');
        } else {
            tile.classList.add('grey-overlay');
        }
    })
}