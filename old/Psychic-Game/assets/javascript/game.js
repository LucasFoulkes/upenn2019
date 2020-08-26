let wins = document.querySelector('#wins');
let losses = document.querySelector('#losses');
let guessesLeft = document.querySelector('#guessesLeft');
let guesses = document.querySelector('#guesses');

wins.textContent = 0;
losses.textContent = 0;
guessesLeft.textContent = 10;

// this surprisingly works
let letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
// this is the games picked word
let letter = letters[Math.floor(Math.random() * letters.length)];

document.addEventListener("keypress", function (event) {
    // checks if it is a letter
    if (letters.indexOf(event.key) !== -1) {
        // this checks if letter already guessed
        if (guesses.textContent.split(', ').indexOf(event.key) === -1) {
            guesses.textContent += event.key + ', '
            // if do guess the world
            if (event.key === letter) {
                alert('You Win')
                guesses.textContent = ''
                guessesLeft.textContent = 10;
                wins.textContent = parseInt(wins.textContent) + 1;
                letter = letters[Math.floor(Math.random() * letters.length)];
            }
            else {
                guessesLeft.textContent = parseInt(guessesLeft.textContent) - 1;
                if (guessesLeft.textContent === '0') {
                    alert('You Lost')
                    guesses.textContent = ''
                    guessesLeft.textContent = 10;
                    losses.textContent = parseInt(losses.textContent) + 1;
                    letter = letters[Math.floor(Math.random() * letters.length)];
                }
            }
        }
        else {
            alert('Already guessed that one mate')
        }
    }
    else {
        alert('Not a letter bub')
    }
})


