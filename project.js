//1-Deposit money
//2-Determine number of lines to bet on
//3-collect bet amount
//4-spin slot machine
//5-check if user won
//6-give winnings if any
//7-play again

//function deposit() {
//return 1
//}

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_HOWMANY = {
        "A": 2,
        "B": 4,
        "C": 6,
        "D": 8
}

const SYMBOL_MULTIPLIER = {
        "A": 5,
        "B": 4,
        "C": 3,
        "D": 2

}

const deposit = () => { 
        while (true) {
        const depositAmount = prompt("Insert Coins: ");
        const numberDepositAmount = parseInt(depositAmount);
        
        if (isNaN(numberDepositAmount)|| numberDepositAmount<=0) {
                console.log("Invalid deposit amount, try again");
        } else {
                return numberDepositAmount;
        }
        }
};

const lines = () => {
        while (true) {
        const linesAmount = prompt ("Pick your lines, cowboy! ");
        const numberOfLines = parseInt(linesAmount);
        
        if (isNaN(numberOfLines)|| numberOfLines<=0 || numberOfLines > 3) {
                console.log("Invalid number of lines, try a number between 1-3");
        } else {
                return numberOfLines;
        }}

};

const spin = () => {
        const symbols = [];
        for  (const [symbol, howmany] of Object.entries(SYMBOLS_HOWMANY)){
                for (let i = 0; i < howmany; i++){
                symbols.push(symbol);
                
        }
}
const reels = [];

for (let i=0; i<COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
for (let j=0; j<ROWS; j++) {
const randomIndex = Math.floor(Math.random() * reelSymbols.length);
        const selectedSymbol = reelSymbols[randomIndex];
        reels[i].push(selectedSymbol);
        reelSymbols.splice(randomIndex, 1);
}
}
console.log(reels);
};

const numberDepositAmount = deposit();

console.log("$" + numberDepositAmount);

const numberOfLines = lines();

const linesAmount = numberOfLines


if (linesAmount===1) {
        console.log(linesAmount + " Line");

} else {
console.log(linesAmount + " Lines");
}

let balance = numberDepositAmount;
const getBet = (balance, lines) => {
        while (true) {
        const betAmount = prompt ("Enter your bet per line: ");
        const numberBet = parseInt(betAmount);

        if (isNaN(numberBet)|| numberBet > balance || numberBet <= 0 || numberBet > (balance / numberOfLines)) {
                console.log("Invalid bet buddy, try again");
        } else {
                return numberBet;
        }}

}


const numberBet = getBet(balance, numberOfLines);
console.log("u just bet $" + (numberBet * numberOfLines));

spin();



//Model
//View
//Controller