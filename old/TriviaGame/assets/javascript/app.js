//game begins
//shows questions and starts timer
//(A) right answer , shows you were correct this takes some time, ads to score, shows next question with no user input
//(B) wrong answer, shows you were incorrect this takes some time, substracts from score, shows next question with no user input
//(C) timer runs out, shows right answer, substracts from score, shows next question with no user input
// all questions are answered , shows score, asks to play again, does not reload the page but the game alone

var questionsDB = [
    ["What is the first full lenght CGI movie", "A bugs life", "Monsters Inc", "Toy Story", "The Lion King", 0],
    ["Which of these is NOT a name of one of the spice girls", "Sporty Spice", "Fred Spice", "Scary Spice", "Posh Spice", 1],
    ["Which NBA team won the most titles in the 90's", "New York Knicks", "Portland Trailblazers", "Los Angeles Lakers", "Chicago Bulls", 2],
    ["How many days are there in a regular year", "1", "10", "none", "364", 3],
    ["Which month is the fourth?", "July", "December", "June", "April", 3],
    ["How many days in a week", "5", "7", "Sunday and Saturday", "just one", 1],
    ["What is the answer to the ultimate question", "love", "42", "revenge", "none really", 1],
    ["Which on is the most important meal of the day", "dinner", "lunch", "brunch", "breackfast", 3],
    ["Which bear is best?", "brown", "black", "polar", "best", 3],
    ["How many eggs to make a cake", "1", "one if it is really big", "depends on the cake", "depends on the recipe", 2]]



class Trivia {
    constructor([question, option0, option1, option2, option3, answer]) {
        this.question = question;
        this.options = [option0, option1, option2, option3];
        this.answer = answer;
    }
};

function turn(newQuestion) {
    if (pointer < questionsDB.length) {
        console.log("new turn")
        currenTrivia = new Trivia(newQuestion);
        console.log(currenTrivia);
        //show the trivia
        $("#game-container").html("<p class='display-4' id='timer' >" + timer + "</p><p class='display-4'>" + currenTrivia.question + "</p><ul></ul>")
        //populates the options
        for (i in currenTrivia.options) {
            $("ul").append("<li class='display-4' value='" + i + "' >" + currenTrivia.options[i] + "</li>")
        }
    }
    else {
        clearInterval(clock);
        $("#game-container").html("<p class='display-3'><strong>Game Over</strong></p><p class='display-4'>your score was " + score + "/10</p><button class='display-4' id='start'>Play Again</button>")
    }
}



function game() {
    console.log("starting game")
    score = 0;
    pointer = 0;
    timer = 30;
    turn(questionsDB[pointer]);
    clock = setInterval(function () {
        timer--;
        $("#timer").html(timer);
        if (timer === 0) {
            timer = 33;
            $("#game-container").html("<p class='display-4'>Times is Up</p><p class='display-4'>the answer was " + currenTrivia.options[currenTrivia.answer] + "</p>")
            setTimeout(function () {
                pointer++;
                turn(questionsDB[pointer]);
            }, 1000 * 3)
        }
    }, 1000)
    $(document).on({
        "click": function () {
            timer = 33;
            if ($(this).val() === currenTrivia.answer) {
                console.log("correct")
                score++;
                $("#game-container").html("<p class='display-3'>You were correct</p>")
            }
            else {
                console.log("incorrect")
                $("#game-container").html("<p class='display-3'>You were wrong<p><p class='display-4'>ther right answer was " + currenTrivia.options[currenTrivia.answer] + "</p>")
            }
            //$("#game-container").html("<p class='display-4'>time is up<p/><p class='display-4>the answer was " + currenTrivia.answer + "</p>")
            setTimeout(function () {
                pointer++;
                turn(questionsDB[pointer]);
            }, 3 * 1000)

        }
    }, "li")
}





// here is where the game would begin
$("document").ready(function () {
    $(document).on({
        "click": function () {
            game();
        }
    }, "#start")
});




