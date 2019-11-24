function Letter(character) {
    this.character = character,
        this.guessed = false,
        this.displayWord = function () {
            if (this.guessed) {
                return this.character.toUpperCase();
            }
            else {
                return "_";
            }
        },
        this.checkLetter = function (input) {
            if (input.toLowerCase() === this.character.toLowerCase()) {
                this.guessed = true;
                return true;
            }
            else {
                return false;
            }
        }
}

module.exports = Letter;