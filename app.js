'use strict'

const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.key-container');

const allKeyboardCharacters = 'qwertyuiopasdfghjklzxcvbnm'.toUpperCase();
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
]

// setting id for each row and tile
guessRows.forEach((guessRow, guessRowIndex) => {
    const rowEl = document.createElement('div');
    rowEl.setAttribute('id', 'guessRow-' + guessRowIndex);
    guessRow.forEach((guess, guessIndex) => {
        const tileEl = document.createElement('div');
        tileEl.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex);
        tileEl.classList.add('tile');
        rowEl.append(tileEl);
    })
    tileDisplay.append(rowEl);
});

const handleClick = () => {
    console.log('clicked');
}

keys.forEach(key => {
    const buttonEl = document.createElement('button');
    buttonEl.textContent = key;
    buttonEl.setAttribute('id', key);
    buttonEl.addEventListener('click', handleClick)
    keyboard.append(buttonEl);
});

