
var Letter = require("./letter");

function Word() {
    this.wordArray = [],
        this.wordToArray = function (curWord) {
            for (var i = 0; i < curWord.length; i++) {
                // Only create a letter object if it is not a space 
                if (curWord[i] !== " ") {
                    var letterObject = new Letter(curWord[i]);
                    this.wordArray.push(letterObject);
                }
                else {
                    this.wordArray.push(" ");
                }
            }
        }
    this.displayWord = function () {
        var word = [];
        for (var i = 0; i < this.wordArray.length; i++) {
            if (this.wordArray[i] !== " ") {
                var letterString = this.wordArray[i].displayWord();
                word.push(letterString);
            }
            else {
                word.push(" ");
            }
        }
        console.log(word.join(" "));
    }
    this.check = function (input) {
        var correct = false;
        for (var i = 0; i < this.wordArray.length; i++) {
            if (this.wordArray[i] !== " ") {
                if (this.wordArray[i].checkLetter(input)) {
                    correct = true;
                }
            }
        }
        if (correct) {
            return true;
        }
        else {
            return false;
        }
    }
}

module.exports = Word;