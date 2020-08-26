// i wonder if this is best practice
var wins = document.getElementById('wins');
var losses = document.getElementById('losses');
var guessesLeft = document.getElementById('guessesLeft');
var guesses = document.getElementById('guesses');
var msg = document.getElementById('msg');
var display = document.getElementById('display');
var current = 0;
var flag = false;
var flagDisplay = false;
var flagGameOVer = false;

wins.textContent = 0;
losses.textContent = 0;
guessesLeft.textContent = 10;
msg.textContent = 'Press any key to start'
guesses.textContent = 'nothing yet'


var words = 'bed,desk,table,rent,student,pencil,water'.split(',')
// guess i dont to randomize this
// var word = words[Math.floor(Math.random() * words.length)];
// this surprisingly works
var letters = 'abcdefghijklmnopqrstuvwxyz'.split('')


document.addEventListener("keypress", function (event) {
    if (!flagGameOVer) {
        // createsthe hidden display once and resets values
        if (!flagDisplay) {
            display.textContent = ''
            for (i in words[current]) {
                display.textContent += '_ '
            }
            flagDisplay = true;
            msg.textContent = 'Guess letter'
            guesses.textContent = ''
            msg.textContent = 'press any key to play'
            guessesLeft.textContent = 10;
            guesses.textContent = ''
        }

        if (flag) {
            // checks if it is a letter
            if (letters.indexOf(event.key) !== -1) {
                // checks if guessed before
                if (guesses.textContent.indexOf(event.key) === -1) {
                    guesses.textContent += event.key + ', ';
                    guessesLeft.textContent = parseInt(guessesLeft.textContent) - 1;
                    // ======================
                    // + checks if you lost +
                    // ======================
                    if (guessesLeft.textContent === "0") {
                        losses.textContent = 0;
                        display.textContent = 'You Lost...'
                        flag = false;
                        flagDisplay = false;
                        current++;
                        msg.textContent = 'the word was ' + words[current]
                        losses.textContent = parseInt(losses.textContent) + 1;

                    }
                    // checks if letter correctly guessed
                    if (words[current].indexOf(event.key) !== -1) {
                        msg.textContent = '[' + event.key + ' is correct]'
                        // we make into and array 
                        var temp = display.textContent.split(' ')
                        // we do this in case there is letter repetition like in yellow, it has to l
                        for (i in words[current]) {
                            if (words[current][i] === event.key) {
                                temp[i] = event.key
                            }
                        }
                        // then back to an array 
                        display.textContent = (temp.join(' '))
                        // ====================================
                        // + here we check if you are winning +
                        // ====================================
                        if (display.textContent.indexOf('_') === -1) {
                            wins.textContent = parseInt(wins.textContent) + 1;
                            display.textContent = 'You Win!!'
                            flag = false;
                            flagDisplay = false;
                            msg.textContent = 'the word was ' + words[current]
                            current++;
                        }
                        // ===========================
                        // + checks if no more words +
                        // ===========================
                        if (current === words.length) {
                            console.log(words.length + '||' + current)
                            display.textContent = 'Game Over'
                            msg.textContent = 'Press F5 to play again'
                            flagGameOVer = true;
                        }
                    }
                    else {
                        msg.textContent = '[' + event.key + ' is not it]'
                    }
                }
                else {
                    msg.textContent = 'Wrong input [Already ' + event.key + ']'
                }
            }
            else {
                msg.textContent = 'Wrong input [Not a letter]'
            }
        }
        else {
            flag = true
        }
    }
})


