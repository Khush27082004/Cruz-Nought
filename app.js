let moves = Array(9).fill(null);
let history = [];
let symbol = "X";
let isGameStarted = false;
let p1Name = "";
let p2Name = "";
let xMoveCount = 0;
let oMoveCount = 0;
let timer = null;  // Timer ID
let timeLeft = 10;  // 8seconds per move

function gameStart() {
    var p1 = document.getElementById("player1");
    var p2 = document.getElementById("player2");

    if (p1.value.trim() != "" && p2.value.trim() != "") {
        p1Name = p1.value;
        p2Name = p2.value;
        document.getElementById("board").style.display = "block";
        p1.readOnly = true;
        p2.readOnly = true;
        document.getElementById("startBtn").disabled = true;
        moves = Array(9).fill(null);
        symbol = "X";
        isGameStarted = true;
        xMoveCount = 0;
        oMoveCount = 0;
        updateMoveCounts();
        document.getElementById("message").innerHTML = "";  // Reset message when game starts
        startTimer();  // Start the timer when the game begins
    } else {
        alert("Enter players name!!");
    }
}

let winCells = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

function checkWin() {
    for (let index = 0; index < winCells.length; index++) {
        let win = winCells[index];
        if (moves[win[0]] != null && moves[win[0]] == moves[win[1]] &&
            moves[win[0]] == moves[win[2]] &&
            moves[win[1]] == moves[win[2]]) {
            return true;
        }
    }
    return false;
}

function reset() {
    var p1 = document.getElementById("player1");
    var p2 = document.getElementById("player2");

    p1.readOnly = false;
    p2.readOnly = false;
    document.getElementById("startBtn").disabled = false;
}

function updateMoveCounts() {
    document.getElementById("xMoveCount").innerText = xMoveCount;
    document.getElementById("oMoveCount").innerText = oMoveCount;
}

function onCellClick(cellNo) {
    if (isGameStarted == false)
        return;

    if (moves[cellNo] == null) {
        var cell = document.getElementById("cell" + cellNo);
        moves[cellNo] = symbol;
        cell.innerHTML = symbol;

        history.push(cellNo);
        if (history.length > 6) {
            var hCellNo = history.shift();
            cell = document.getElementById("cell" + hCellNo);
            cell.innerHTML = "";
            moves[hCellNo] = null;
        }

        if (symbol === "X") {
            xMoveCount++;
        } else {
            oMoveCount++;
        }

        updateMoveCounts();  // Update the move counts after every move

        if (checkWin()) {
            displayWinMessage(symbol === "X" ? p1Name : p2Name);
            reset();
            isGameStarted = false;
            stopTimer();  // Stop the timer when the game ends
            return;
        }

        symbol = (symbol === "X") ? "O" : "X";  // Switch between X and O
        resetTimer();  // Reset the timer for the next player
    }
}

// Display the winning message with styled name
function displayWinMessage(winner) {
    document.getElementById("message").innerHTML = `<span class='winner'>${winner} Wins This Game!!</span>`;
}

// Timer logic
function startTimer() {
    document.getElementById("message").innerHTML = `Player ${symbol}'s turn. Time left: ${timeLeft} seconds`;
    timer = setInterval(function () {
        timeLeft--;
        document.getElementById("message").innerHTML = `Player ${symbol}'s turn. Time left: ${timeLeft} seconds`;
        if (timeLeft <= 0) {
            handleTimeout();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);  // Clear the existing timer to avoid multiple intervals
    timeLeft = 10;         // Reset the timer to 10 seconds
    startTimer();          // Start the timer again
}

function stopTimer() {
    clearInterval(timer);  // Ensure no timers are running in the background
}

function handleTimeout() {
    let winner = (symbol === "X") ? p2Name : p1Name;
    displayWinMessage(winner);
    reset();
    stopTimer();  // Stop the timer when the game ends
    isGameStarted = false;
}

// Get the restart and new game button elements
let restartBtn = document.getElementById("restartBtn");
let newGameBtn = document.getElementById("newGameBtn");

// Add event listeners to the buttons
restartBtn.addEventListener("click", restartGame);
newGameBtn.addEventListener("click", newGame);

// Define the restartGame function
function restartGame() {
    stopTimer();  // Stop the current timer when restarting the game
    timeLeft = 10;  // Reset the timer to 10 seconds

    // Reset the game state
    moves = Array(9).fill(null);
    history = [];
    symbol = "X";
    isGameStarted = true;  // Mark game as started

    // Reset the game board
    let cells = document.querySelectorAll(".grid-item");
    cells.forEach((cell) => {
        cell.innerHTML = "";
    });

    // Clear the winning message and start the timer again
    document.getElementById("message").innerHTML = `Player ${symbol}'s turn. Time left: ${timeLeft} seconds`;
    resetTimer();  // Start a new timer with the reset time
}

// Define the newGame function
function newGame() {
    stopTimer();  // Stop the current timer when starting a new game
    timeLeft = 10;  // Reset the timer to 10 seconds

    // Reset the game state
    moves = Array(9).fill(null);
    history = [];
    symbol = "X";
    isGameStarted = false;
    p1Name = "";
    p2Name = "";

    // Reset the game board
    let cells = document.querySelectorAll(".grid-item");
    cells.forEach((cell) => {
        cell.innerHTML = "";
    });

    // Reset the input fields and start button
    let p1 = document.getElementById("player1");
    let p2 = document.getElementById("player2");
    p1.value = "";
    p2.value = "";
    p1.readOnly = false;
    p2.readOnly = false;
    document.getElementById("startBtn").disabled = false;

    // Clear the winning message
    document.getElementById("message").innerHTML = "";
}
