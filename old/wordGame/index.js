// not sure how is it that we deal with repeating letters
var Word = require("./word");
var inquirer = require("inquirer");
var fs = require("fs");

var gameWord = "";

function randomWord() {
    var contents = fs.readFileSync('bunchWords.txt', 'utf8');
    contents = contents.split('"');
    var result = [];
    for (i = 1; i < contents.length; i += 2) {
        result.push(contents[i]);
    }
    return result[Math.floor(Math.random() * (result.length-1))]
}
lettersList = [];
gameWord = randomWord();
console.log(gameWord);
word = new Word(gameWord);

word.init();
attempts = word.score * 2;

function game() {
    console.clear();
    // ends win out of attempts 
    if (attempts > 0) {
        // ends game when you win
        if (word.score > 0) {
            for (i in word.newWord) {
                if (word.newWord[i].guessed) {
                    break
                }
            }
            inquirer
                .prompt([{
                    name: "letterGuessed",
                    message: "Guess a Letter." + "\n" + word.display() + "\n" + "attempts left: " + attempts + "\n" + "letters Guessed: " + lettersList + "\n",
                }, ])
                .then(function (response) {
                    // input validation by length
                    if (response.letterGuessed.length === 1) {
                        // input validation by letter
                        if (response.letterGuessed.toUpperCase() != response.letterGuessed.toLowerCase()) {

                            if (lettersList.indexOf(response.letterGuessed) === -1) {
                                word.wordGuess(response.letterGuessed);
                                lettersList.push(response.letterGuessed);
                                console.log(response.letterGuessed);
                                attempts--;
                            }

                        };
                    }
                    game();
                });
        } else {
            console.log("##############");
            console.log("#  YOU WIN   #");
            console.log("##############");
            console.log("word was:  " + gameWord);
        }
    } else {
        console.log("##############");
        console.log("#  YOU LOSE  #");
        console.log("##############");
        console.log("word was:  " + gameWord);
    }
}
game();


// this is a test word eventually we will use a word generator api somehow