class Letter {
    constructor(character) {
        this.character = character;
        this.guessed = false;
        // guessed = false;
        this.status = function () {
            if (this.guessed) {
                return this.character
            } else {
                return "_"
            }
        };
        this.guess = function (term) {
            if (term === this.character) {
                this.guessed = true;
            }
        }
    }
};

module.exports = Letter;