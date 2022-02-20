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

