var Word = require("./word");
var inquirer = require("inquirer");
var list = ["Captain America", "Iron Man", "Avengers Endgame", "Captain Marvel", "Black Panther", "Thor", "Antman and the Wasp", "X Men", "Spiderman Homecoming", "Venom", "Thor The Dark World"];
var curWord;
var alphabet = /[a-zA-Z]/;
var guessLeft = 10;
var letterGuess = [];
var used = [];
var first = true;

function selectRandomWord() {
    var selected = list[Math.floor(Math.random() * list.length)];
    if (used.indexOf(selected) < 0) {
        curWord = new Word();
        curWord.wordToArray(selected);
        used.push(selected);
    }
    else if (used.length !== list.length) {
        selectRandomWord();
    }
    else {
        console.log("You held your own against Thanos! His army retreated!");
        playAgain();
    }
}

function wordGuessed() {
    var word = curWord.wordArray;
    for (var i = 0; i < word.length; i++) {
        if (!word[i].guessed && word[i] !== " ") {
            return false;
        }
    }
    return true;
}

function prompt() {
    if (guessLeft <= 0) {
        console.log("Thanos defeated the Avengers! Everyone stays dusted... 'Balanced, as all things should be'");
        playAgain();
    }
    else if (!wordGuessed()) {
        if (first) {
            console.log("Try to guess the Marvel movie!");
            curWord.displayWord();
            first = false;
        }
        inquirer.prompt([
            {
                type: "input",
                name: "guess",
                message: "Guess a letter: ",
                validate: function (input) {
                    if (letterGuess.indexOf(input.trim().toLowerCase()) >= 0) {
                        console.log("\n You already guessed this letter! Try again!");
                        return false;
                    }
                    else if (alphabet.test(input) && input.trim().length === 1) {
                        return true;
                    }
                    else {
                        console.log("\n Please enter a single letter");
                        return false;
                    }
                }
            }
        ]).then(function (user) {
            curWord.check(user.guess);
            curWord.displayWord();
            if (curWord.check(user.guess)) {
                console.log("CORRECT!");
            }
            else {
                guessLeft--;
                console.log("INCORRECT! You have " + guessLeft + " Avengers left!");
            }
            letterGuess.push(user.guess.trim().toLowerCase());
            prompt();

        })
    }
    else {
        console.log("You defeated the mad titan!");
        playAgain();
    }
}

function playAgain() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "Would you like to challenge Thanos again?",
            default: true
        }
    ]).then(function (user) {
        if (user.confirm) {
            first = true;
            letterGuess = [];
            guessLeft = 10;
            selectRandomWord();
            prompt();
            if (used.length === list.length) {
                used = [];
            }
        }
        else {
            console.log("Thanks for playing!");
        }
    })
}

selectRandomWord();
prompt();