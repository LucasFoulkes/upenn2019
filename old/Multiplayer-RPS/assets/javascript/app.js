// screen shows game
// asks you to login
// name and user are logged to the database
// if game session open then join
// else create game sesion
// create game sesion , opens new entry to db loads current player to db and cookies in case conection is lost
// waits for player 2
// player2 is logged to the game and info saved to cokies
// once both players game can begin
// players select option is logged to cookies is final cant be changed
// once on player choses the other one can see that he has especial event listener?
// once both players play winner is showed this is saved to the db
// you can play again or exit the game
// if you chose to exit there is a ranking screen

$(document).ready(function () {
    var player = "";
    var turn = "";
    var playerState = "";
    // Firebase configuration
    var config = {
        apiKey: "AIzaSyBcH_2y83E1YX7Ui4d8PEuE062poG8xmSU",
        authDomain: "decent-vertex-113209.firebaseapp.com",
        databaseURL: "https://decent-vertex-113209.firebaseio.com",
        projectId: "decent-vertex-113209",
        storageBucket: "decent-vertex-113209.appspot.com",
        messagingSenderId: "220877645003",
        appId: "1:220877645003:web:03e29f13273a12d3"
    };
    // Initialize Firebase
    firebase.initializeApp(config);
    // create variable for firebase database
    var my_database = firebase.database();
    //createNewSession();
    var display = $("#game-display");
    // populates the display with play and scoreboard options

    function page1() {
        display.html("");
        display.append("<div><button class='btn btn-dark' id='play' ><h3>Play</h3></button></div><div><button class='btn btn-outline-dark' id='scores'>Scores</button></div>");
    };
    function inError(message) {
        $("#input-name").val("");
        $("#input-password").val("");
        $(".form-group").append("<p class='bg-danger text-center'>" + message + "</p>")
        setTimeout(function () {
            $("p").remove();
        }, 1000);
    };
    function createNewSession() {
        my_database.ref("games").push({
            player1: "",
            player2: "",
            plays: {
                0: "",
                1: "",
            }
        })
    }

    function saveScore(player, result) {
        my_database.ref("users").once("value", function (snapshot) {
            var sv = snapshot.val();
            console.log(sv);
            for (i in sv) {
                console.log(i);
                if (sv[i].name === player) {
                    console.log(sv[i]);
                    console.log(sv[i].sessions);
                    var newResult = sv[i].sessions + result;
                    console.log("ma man, but like with Samuel Jackson voice and cadence");
                    my_database.ref("users/" + i).update({ sessions: newResult });

                }
            }
        });
    };

    page1();
    $(document).on({
        "click": function () {
            page1();
        }
    }, "#return");
    function returnButton(style) {
        display.append("<button class='btn btn-outline-dark' id='return' style='" + style + "'>");
        $("#return").html("&#x2190");
    }

    $(document).on({
        "click": function () {
            // we refresh diplay and aks for login
            display.html("");
            display.append("<div><button class='btn btn-dark' id='login'>");
            $("#login").html("<h4>login");
            display.append("<div><button class='btn btn-outline-dark' id='signup'>");
            $("#signup").text("sign up");
            display.append("<div><button class='btn btn-outline-dark' id='visitor'>");
            $("#visitor").text("visitor");
            returnButton();
        }
    }, "#play"
    );
    // login, so many ways to set all of this up

    $(document).on({
        "click": function () {
            display.html("<div class='form-group'><input type='text' class='form-control' id='input-name' placeholder='name'></div><div class='form-group'><input type='password' class='form-control' id='input-password' data-toggle='password' placeholder='password'></div>");
            display.append("<button class='btn btn-dark' id ='submit-login'>");
            returnButton("float: right");
            $("#submit-login").text("Start");
            $("#submit-login").on("click", function () {
                var inputName = $("#input-name").val().trim();
                var inputPwd = $("#input-password").val().trim();
                my_database.ref("users").once("value", function (snapshot) {
                    var sv = snapshot.val();
                    var userUnique = false;
                    for (i in sv) {
                        if (sv[i].name === inputName) {
                            console.log("you in the vip list");
                            userUnique = true;
                            if (sv[i].password === inputPwd) {
                                console.log("right answer")
                                player = inputName;
                                break
                            }
                            else {
                                console.log("wrong answer, now you must die")
                                inError("incorrect password");
                            };
                        }
                    };
                    if (userUnique === false) {
                        inError("incorrect user")
                    };
                    console.log(player);
                    game();
                });
            })
        }
    }, "#login");


    $(document).on({
        "click": function () {
            display.html("<div class='form-group'><input type='text' class='form-control' id='input-name' placeholder='name'></div><div class='form-group'><input type='password' class='form-control' id='input-password' placeholder='password'></div>");
            display.append("<button class='btn btn-dark' id ='input-login'>");
            returnButton("float: right");
            $("#input-login").text("Start");
            $("#input-login").on("click", function () {
                if ($("#input-name").val() !== "" && $("#input-password").val() !== "" ) {
                    my_database.ref("users").once("value", function (snapshot) {
                        var sv = snapshot.val();
                        var inputName = $("#input-name").val().trim();
                        var inputPwd = $("#input-password").val().trim();
                        var nameUnique = true;
                        for (i in sv) {
                            console.log("name:  " + sv[i].name)
                            if (sv[i].name === inputName) {
                                nameUnique = false;
                                break
                            }
                        };
                        if (nameUnique === true) {
                            my_database.ref("users").push({
                                name: inputName,
                                password: inputPwd,
                                sessions: "",
                            });
                            player = inputName;
                        }
                        else {
                            console.log("already a thing");
                            inError("EXISTING PLAYER")
                        }
                        console.log(player);
                        game();
                    });
                   
                }

            })

        }
    }, "#signup");
    $(document).on({
        "click": function () {
            display.html("<div class='form-group'><input type='text' class='form-control' id='input-name' placeholder='name'></div>");
            display.append("<button class='btn btn-dark' id ='begin-game'>");
            returnButton("float: right");
            $("#begin-game").text("Start");
            $("#begin-game").on("click", function () {
                var inputName = $("#input-name").val().trim();
                player = inputName;
                console.log(player)
                game();
            })
        }
    }, "#visitor");

    $(document).on({
        "click": function () {
            display.html("<table class='table'>");
            $("table").append("<thead>><tr></thead>");
            $("tr").append("<th scope='col'><strong>Player</strong></th>")
            $("tr").append("<th scope='col'><strong>Wins</strong></th>")
            $("tr").append("<th scope='col'><strong>Loses</strong></th>")
            $("tr").append("<th scope='col'><strong>Ties</strong></th>")
            $("table").append("<tbody id='table-contents'></tbody>");
            returnButton();
            my_database.ref("users").on("child_added", function (snapshot) {

                var sv = snapshot.val();

                var newRow = $("<tr>");
                var nameData = $("<td>");
                nameData.text(sv.name);
                var wins = 0;
                var loses = 0;
                var ties = 0;

                for (i in sv.sessions) {
                    console.log("i: " + sv.sessions[i]);
                    if (sv.sessions[i] === "w") {
                        wins += 1;
                    }
                    else if (sv.sessions[i] === "l") {
                        loses++;
                    }
                    else if (sv.sessions[i] === "l") {
                        ties++;
                    };
                };
                var winData = $("<td>");
                winData.text(wins);
                var losesData = $("<td>");
                losesData.text(loses);
                var tiesData = $("<td>");
                tiesData.text(ties);
                newRow.append(nameData, winData, losesData, tiesData);
                $("#table-contents").append(newRow);
            })
            // my_database.ref("users").off();
        }
    }, "#scores");



    function game() {
        display.html("");
        currentGame = my_database.ref("games").limitToLast(1);
        currentGame.once("value", function (snapshot) {
            var sv = snapshot.val();
            var svv = sv[Object.keys(sv)[0]];
            if (svv.player1 === "") {
                my_database.ref("games/" + Object.keys(sv)[0]).update({ player1: player, });
                turn = 0;
                display.append("<button class='btn btn-outline-dark btn-lg' id='play-start-button'>You are Player  " + turn + "</button>");
                $("#play-start-button").on("click", function () {
                    gameChooseningOftheThing();
                })
            }
            else if (svv.player1 !== "" && svv.player2 === "") {
                my_database.ref("games/" + Object.keys(sv)[0]).update({ player2: player, });
                turn = 1;
                display.append("<button class='btn btn-outline-dark btn-lg' id='play-start-button'>You are Player  " + turn + "</button>");
                $("#play-start-button").on("click", function () {
                    gameChooseningOftheThing();
                })
            }
            else {
                display.append("<h4>The table is full, sorry</h4>");
            }
            returnButton();
        });
    }
    function gameChooseningOftheThing() {
        display.html("");
        display.append("<div id='game-moves'>");
        $("#game-moves").append("<button class='badge badge-pill badge-danger open' id='rock' value='r'>");
        $("#rock").append("<h1 class='display-4'>&#x270a;</h1>")
        $("#game-moves").append("<button class='badge badge-pill badge-danger open' id='paper' value='p'>");
        $("#paper").append("<h1 class='display-4'>&#x270b;</h1>")
        $("#game-moves").append("<button class='badge badge-pill badge-danger open' id='scissors' value='s'>");
        $("#scissors").append("<h1 class='display-4'>&#x1f596;</h1>")
        $(".open").on("click", function () {
            var choice = $(this).val();
            $(this).removeClass("open");
            $(".open").remove();
            currentGame = my_database.ref("games").limitToLast(1);
            currentGame.once("value", function (snapshot) {
                var sv = snapshot.val();
                var svv = sv[Object.keys(sv)[0]];
                var gamePlays = svv.plays;
                gamePlays = Array.from(gamePlays);
                gamePlays[turn] = choice;
                my_database.ref("games/" + Object.keys(sv)[0]).update({ plays: gamePlays, });
                currentGame.on("value", function (snapshot) {
                    var sv = snapshot.val();
                    var svv = sv[Object.keys(sv)[0]];
                    var one = svv.plays[0];
                    var two = svv.plays[1];
                    if (one !== "" && two !== "") {
                        currentGame.off();
                        if (one === two) {
                            display.html("<h1>is a tie!</h1>")
                            returnButton();
                            playerState = "t";

                        }
                        else if (one === "r" && two === "s" || one === "s" && two === "p" || one === "p" && two === "r") {
                            if (turn === 0) {
                                display.html("<h1>You Won!</h1>")
                                playerState = "w";
                            }
                            else {
                                display.html("<h1>You Lose!</h1>")
                                playerState = "l";
                            };
                            returnButton();

                        }
                        else {
                            if (turn === 1) {
                                display.html("<h1>You Won!</h1>")
                                playerState = "w";
                            }
                            else {
                                display.html("<h1>You Lose!</h1>")
                                playerState = "l";
                            };
                            returnButton();

                        }
                        createNewSession();
                        console.log("temp:   " + playerState);
                        saveScore(player, playerState);
                    }
                });
            });
        });
    };
});

//svv = sv[Object.keys(sv)[0]];
//svname = Object.keys(sv)[0];
//my_database.ref().push
//currentGame = my_database.ref().limitToLast(1);
//currentGame.once("value", function (snapshot) {
//sv = snapshot.val();
//svv = sv[Object.keys(sv)[0]];
//my_database.ref(Object.keys(sv)[0]).update({ state: 2, });
//my_database.ref(Object.keys(sv)[0]).update({ player2: $(this).attr("id"), });
