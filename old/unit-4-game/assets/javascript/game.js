//souces used
//https://stackoverflow.com/questions/8608145/jquery-on-method-with-multiple-event-handlers-to-one-selector
//https://stackoverflow.com/questions/203198/event-binding-on-dynamically-created-elements
//https://www.w3schools.com/jsref/met_loc_reload.asp
//-----------------------------------------------------------------------------------------------------------
// 1 you select your character; character has a name, attack strenght, health, and talent (wich affects how much attack increases?)
// 2 you select you are gona fight
// 3 you fight
// 3.1 every time you fight you attacks become a bit stronger ( gain experience)
// 4.a if you win pick someone else to fight
// 4.b if you loose you the game resets

$("document").ready(function () {
    var player;
    var enemy;
    var charactersInfo = [
        ["Walter White", 20, 100, "walter-white.jpg"],
        ["Jessy Pinkman", 5, 100, "jesse-pinkman.jpg"],
        ["Soul Goodman", 10, 100, "saul-goodman.jpg"],
        ["Hank Schrader", 30, 100, "hank-schrader.jpg"]];
    //creates the character object from characters info
    //this might be pointles ass the info can already be accesed thru indexes
    class Character {
        constructor([name, attack, health, image]) {
            this.name = name;
            this.attack = attack;
            this.health = health;
            this.image = image;
        }
    };
    avaibleCharacters = function (target, className) {
        $(target).html("");
        for (i in charactersInfo) {
            $(target).append("<button class='" + className + "' value='" + i + "'><p>" + charactersInfo[i][0] + "</p><img src='assets/images/" + charactersInfo[i][3] + "'><p>" + charactersInfo[i][1] + "</p></button>");
            $("#comments").html("")
        };
    };


    // functions before this point-------------------------------------------------------------------------------------------------------
    avaibleCharacters("#character-selection", "characters");

    $(document).on({
        'click': function () {
            player = new Character(charactersInfo[$(this).val()]);
            charactersInfo.splice($(this).val(), 1);
            // gets rid of the first bar
            $("#character-selection").remove();
            // sends our guy to the second bar
            $("#your-character").append("<button id='player'><p>" + player.name + "</p><img src='assets/images/" + player.image + "'><p>" + " &#x2764;" + player.health + " &#x2694;" + player.attack + "</p></button>")
            //fills the enemy bar;
            avaibleCharacters("#enemies-available", "enemies");
        },
    }, ".characters");

    $(document).on({
        "click": function () {
            enemy = new Character(charactersInfo[$(this).val()]);
            charactersInfo.splice($(this).val(), 1);
            // removes the guy from the enemy section
            $(this).remove();
            $("#fight-section").append("<button id='enemy'><p>" + enemy.name + "</p><img src='assets/images/" + enemy.image + "'><p>" + " &#x2764;" + enemy.health + " &#x2694;" + enemy.attack + "</p></button>")
            $("#comments").append("<h5>you selected " + enemy.name + "</h5>")
        }
    }, ".enemies");

    $("#attack").click(
        function () {
            if (player && enemy) {
                $("#comments").html("")
                $("#comments").append("<h5>you attacked  " + enemy.name + "</h5>")
                $("#comments").append("<h5>you been attacked</h5>")
                enemy.health -= player.attack;
                player.health -= enemy.attack;
                player.attack += 5;
                $("#player").html("<p>" + player.name + "</p><img src='assets/images/" + player.image + "'><p>" + " &#x2764;" + player.health + " &#x2694;" + player.attack + "</p>")
                $("#enemy").html("<p>" + enemy.name + "</p><img src='assets/images/" + enemy.image + "'><p>" + " &#x2764;" + enemy.health + " &#x2694;" + enemy.attack + "</p>")
                //atack animation
                $("#player").css("background", "red");
                setTimeout(function () {
                    $("#player").css("background", "white");
                    $("#enemy").css("background", "red");
                    setTimeout(function () {
                        $("#enemy").css("background", "black");
                    }, 500)
                }, 500);
                //
                if (player.health <= 0) {
                    console.log("you lose");
                    $("#comments").html("")
                    $("#comments").append("<h5>" + enemy.name + "  has defeted you </h5>")
                    $(".game").html("<p><h1>YOU LOSE</h1></p><p><button id='restart'>play again?</button>")

                } else if (enemy.health <= 0) {
                    console.log("you win");
                    $("#enemy").remove();
                    $("#comments").html("")
                    $("#comments").append("<h5>you defeated  " + enemy.name + "</h5>")
                    $("#comments").append("<h5>pick new enemy</h5>")
                    enemy = null;
                    $("#enemies-available").html("");
                    avaibleCharacters("#enemies-available", "enemies");
                    if (charactersInfo.length === 0) {
                        $(".game").html("<p><h1>YOU WIN</h1></p><p><button id='restart'>play again?</button>")
                    }
                }
            } else {
                alert("you havent made a selection");
            }
        }
    );
    $(document).on({
        "click": function () {
            location.reload();
        }
    }, "#restart");
});

