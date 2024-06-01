const display = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newgamebtn = document.querySelector(".btn");

let currentPlayer;
let gamegrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function gameInit(){
    currentPlayer = 'X';
    gamegrid = ["", "", "", "", "", "", "", "", ""];

    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    
        
    display.innerText = `Current player - ${currentPlayer}`;
    newgamebtn.classList.remove("active");
}

gameInit();

function handleCheck(index){
    if(gamegrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gamegrid[index] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
        display.innerText = `Current player - ${currentPlayer}`;
        // Add logic to check for winner here
        checkGameOver();
    }
}


function checkGameOver() {
    // Loop through each winning position
    for (let i = 0; i < winningPositions.length; i++) {
        const [a, b, c] = winningPositions[i];
        // Check if the current winning position is occupied by the same player
        if (gamegrid[a] && gamegrid[a] === gamegrid[b] && gamegrid[a] === gamegrid[c]) {
            // The game has been won by the current player
            display.innerText = `Player ${gamegrid[a]} wins!`;
            // Highlight winning boxes
            boxes[a].classList.add("win");
            boxes[b].classList.add("win");
            boxes[c].classList.add("win");
            // Disable further clicks on boxes
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
            newgamebtn.classList.add("active");
            return;
        }
    }
    
    // If no winning positions are occupied, check if the game is a draw
    if (!gamegrid.includes("")) {
        // All boxes are filled and no player has won, it's a draw
        display.innerText = "It's a draw!";
        newgamebtn.classList.add("active");
        return;
    }
}



// Adding event listener to all the boxes
boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleCheck(index);
    });
});

newgamebtn.addEventListener('click' , gameInit);