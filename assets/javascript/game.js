
    var hangman = {
    guessesRemain: 10,
    targetWordArray: [],
    mysteryWord: "",
    lettersGuessed: [],
    matchesList: [],
    winsCounter: 0,
    wordBank: ["alignment",
      "healthy",
      "impression",
      "orthodontist",
      "cleaning",
      "gingivitis",
      "embroider",
      "fastener",
      "buttonhole",
      "limbert"
    ],

    //word selection //
    configHangman: function() {
      this.mysteryWord = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
      this.targetWordArray = [];
      this.matchesList = [];
      for (var i = 0; i < this.mysteryWord.length; i++) {
        this.targetWordArray.push(this.mysteryWord.charAt(i));
      }
      for (var i = 0; i < this.mysteryWord.length; i++) {
        this.matchesList.push("-");
      }
      document.getElementById("hangmanTargetWord").innerHTML = this.matchesList.join(" ");
      this.guessesRemain = 10;
      document.getElementById("guessesRemain").innerHTML = this.guessesRemain;
      this.lettersGuessed = [];
      document.getElementById("guessed").innerHTML = " ";
    },

    // guessed letters //
    updateLettersGuessed: function(incorrectLetter) {
      this.lettersGuessed.push(incorrectLetter);
      document.getElementById("guessed").innerHTML = this.lettersGuessed.join(", ");
      this.guessesRemain--;
      document.getElementById("guessesRemain").innerHTML = this.guessesRemain;
    },
    //game over conditional //
    gameOverPardner: function() {
      if (this.matchesList.indexOf("-") == -1) {
        this.winsCounter++; 
        document.getElementById("totalWins").innerHTML = this.winsCounter;
        return true;
      } else if (this.guessesRemain > 0) {
        return false;
      } else {
        return true;
      }

    },
    // view //
    showTarget: function(letterPosition) {
      this.matchesList[letterPosition] = this.targetWordArray[letterPosition];
      this.targetWordArray[letterPosition] = "-";
      document.getElementById("hangmanTargetWord").innerHTML = hangman.matchesList.join(" ");
    }

  }


  hangman.configHangman();

  document.onkeyup = function execute(event) {

    var guess = String.fromCharCode(event.keyCode).toLowerCase();
    var letterOrder = hangman.targetWordArray.indexOf(guess);

    console.log(guess);
    console.log(hangman.targetWordArray);
    console.log(letterOrder);

    if (letterOrder >= 0) {
      while (letterOrder >= 0) {
        hangman.showTarget(letterOrder);
        var letterOrder = hangman.targetWordArray.indexOf(guess);
      }
    } else {
      hangman.updateLettersGuessed(guess);
    }
    //next game//
    if (hangman.gameOverPardner()) {
    hangman.configHangman();
    }

  };



