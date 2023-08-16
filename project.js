
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

const transpose = (reels) => {
        const rows = [];

        for (let i=0; i< ROWS; i++) {
                rows.push([]);
                for (let j=0; j<COLS; j++){
                        rows[i].push(reels[j][i]);
                }
        };
        return rows;
};
const transposedRows = transpose(reels);

//console.log(reels);
//console.log(transposedRows);

return transposedRows;
};

const printResults = (rows) => {
        for (const row of rows) {
            let rowString = "";
            for (const [i, symbol] of row.entries()){
                rowString += symbol
                if (i !== row.length - 1) {
                    rowString += " | ";
                }  
            }
            console.log(rowString);  
        
    }
};     

const getPrize = (transposedRows,numberBet, numberOfLines) => {
let winnings = 0;

for (let row = 0; row < numberOfLines; row++) {
        const symbols =  transposedRows[row];

        let allSame = true;

        for (const symbol of symbols) {
                if (symbol !== symbol [1]) {
                        allSame = false;
                        break;
                }
        }

        if (allSame) {
                winnings += numberBet * SYMBOL_MULTIPLIER[symbols[1]]
        }
}
        return winnings;
};

const numberDepositAmount = deposit();

console.log("$" + numberDepositAmount);
    
let balance = numberDepositAmount;

const game = () => {

while (true) {

const numberOfLines = lines();

const linesAmount = numberOfLines


if (linesAmount===1) {
        console.log(linesAmount + " Line");

} else {
console.log(linesAmount + " Lines");
}
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
balance -= numberBet * numberOfLines;

console.log("u just bet $" + (numberBet * numberOfLines));

const transposedRows = spin();
printResults(transposedRows);
const winnings = getPrize (transposedRows, numberBet, numberOfLines)
balance += winnings;
console.log("You won, $" +winnings)

console.log("you have a balance of $" + balance)

if (balance <= 0) {
        console.log ("you're outta cash partner!")
        break;
}

const playAgain = prompt ("Do you want to play again?(Y/N)")

if (playAgain !== "Y" && playAgain !== "y") break; 

}
}
game ();