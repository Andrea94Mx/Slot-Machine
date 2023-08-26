document.addEventListener("DOMContentLoaded", () => {

    const ROWS = 3;
    const COLS = 3;

    const SYMBOLS_HOWMANY = {
        "♥": 2,
        "♣": 4,
        "◭": 6,
        "✪": 8
    };
    
    const SYMBOL_MULTIPLIER = {
        "♥": 5,
        "♣": 4,
        "◭": 3,
        "✪": 2
    };
    
    const depositButton = document.getElementById("depositButton");
    const depositInput = document.getElementById("depositInput");
    const promptText = document.getElementById("promptText");

    let depositAmount = 0;
    let numberOfLines = 0;
    let step = 0; // Keeps track of the current step in the process

    depositButton.addEventListener("click", () => {
    /*step 0 ---------------------------------------------------------------------*/
        if (step === 0) {
            depositAmount = parseInt(depositInput.value);
            if (isNaN(depositAmount) || depositAmount <= 0) {
                promptText.innerHTML = "Invalid deposit amount, try again";
                depositInput.value = ""; // Clear the input field
            } else {
                promptText.innerHTML = "You deposited $" + depositAmount + "<br>Pick your lines, cowboy!";
                step = 1; // Move to the next step
                depositInput.value = ""; // Clear the input field
            }
    /*step 1 ---------------------------------------------------------------------*/
        } else if (step === 1) {
            numberOfLines = parseInt(depositInput.value);
            if (isNaN(numberOfLines) || numberOfLines < 1 || numberOfLines > 3) {
                promptText.textContent = "Invalid number of lines, try a number between 1 and 3";
                depositInput.value = ""; // Clear the input field
            } else {
                const linesMessage = numberOfLines === 1 ? "1 line" : numberOfLines + " lines";
                promptText.innerHTML = linesMessage + "<br>Enter your bet per line:";
                step = 2; // Move to the next step
                depositInput.value = ""; // Clear the input field
            }
    /*step 2 ---------------------------------------------------------------------*/
        } else if (step === 2) { // Added this condition
            const betPerLine = parseFloat(depositInput.value);
    
            if (isNaN(betPerLine) || betPerLine <= 0 || (betPerLine * numberOfLines) > depositAmount) {
                promptText.textContent = "Invalid bet amount, try again";
                depositInput.value = ""; // Clear the input field
            } else {
                const totalBetAmount = (betPerLine * numberOfLines).toFixed(2);
                step = 3;



                promptText.innerHTML = "Betting $" + totalBetAmount + "<br>CLICK 'ENTER' TO SPIN";

                const hideInput = document.getElementById("depositInput");
                depositInput.style.visibility = "hidden"; // Hide the input temporarily
            }
    /*step 3 ---------------------------------------------------------------------*/
            } else if (step === 3) {
  
            const betPerLine = parseFloat(depositInput.value);
            promptText.innerHTML = "";

           const spin = () => {
            const symbols = [];10
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
    
        
        return transposedRows;
        };
        
        const printResults = (rows) => {
        let resultsHTML = '';
        
        for (const row of rows) {
            let rowString = "";
            for (const [i, symbol] of row.entries()){
                rowString += symbol
                if (i !== row.length - 1) {
                    rowString += " | ";
                }  
            }
                resultsHTML += rowString + '<br>'; 
        }
        
        ReelsDisplay.innerHTML = resultsHTML; 
         
        
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
        /*logic for spin ------------------------------------------------------*/
        
        
        
                        const transposedRows = spin();
                        printResults(transposedRows);
                        const winnings = getPrize(transposedRows, betPerLine, numberOfLines);
                        const betAmount = betPerLine * numberOfLines;

                        // Deduct the total bet amount from the deposit
                        depositAmount -= betAmount;
                        

                        depositAmount += winnings; // Update the balance
                        promptText.innerHTML = "You won, $" + winnings + "<br>you have a balance of $" + depositAmount +"<br>Click ENTER to continue";
                        depositInput.value = "";
                        step = 4;
/*step 4 ---------------------------------------------------------------------*/

} else if (step === 4) {
    const hideInput = document.getElementById("depositInput");
    depositInput.style.visibility = "visible"; // unhides the text input
    ReelsDisplay.innerHTML = "";
    console.log("this is the step where I check if ur outta cash or if u wanna play again");
    if (depositAmount <= 0) {
        promptText.innerHTML = "You're outta cash, partner!";
    } else {
        promptText.innerHTML = "Do you wanna play again? (Y/N)";
        step = 4.5; 
        depositInput.value = ""; // Clear the input field
    }
} else if (step === 4.5) {
    if (depositInput.value === "Y"||depositInput.value === "y") {
        step = 1; // Move to spin step
        promptText.innerHTML = "Pick your lines again cowboy!";
        depositInput.value = ""; // Clear the input field
        depositInput.style.visibility = "visible"; // Show the input
        depositButton.style.visibility = "visible"; // Show the button
        

    } else {
        promptText.innerHTML = "See ya later, partner!" + "<br>Press enter to play again";
        step = 6;
        depositInput.style.visibility = "hidden";
    }

        
  }  else if (step === 6) { 
                promptText.innerHTML = "Whatcha going to deposit this time?"
                step = 0;
                depositInput.style.visibility = "visible"; 
                depositButton.style.visibility = "visible"; 
                depositInput.value = ""; 
            }



    
            


    });
    
});
