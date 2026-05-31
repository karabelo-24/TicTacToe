const board =
["","","","","","","","",""];

const cells =
document.querySelectorAll(".cell");

const status =
document.getElementById("status");

const players =
Number(
    localStorage.getItem("players")
);

const difficulty =
localStorage.getItem("difficulty");

const human = "X";
const ai = "O";

let currentPlayer = "X";
let running = true;

const wins = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];

cells.forEach(cell => {

    cell.addEventListener(
        "click",
        handleClick
    );

});

updateStatus();

function handleClick(){

    const i =
    Number(
        this.dataset.index
    );

    if(
        board[i] !== "" ||
        !running
    ) return;

    if(
        players === 1 &&
        currentPlayer !== human
    ) return;

    makeMove(
        i,
        currentPlayer
    );

    if(
        players === 1 &&
        running &&
        currentPlayer === ai
    ){

        setTimeout(
            aiMove,
            500
        );

    }

}

function makeMove(i, player){

    board[i] = player;

    cells[i].textContent =
        player;

    cells[i].classList.add(
        player.toLowerCase()
    );

    if(checkWinner(player)){

        running = false;

        if(players === 1){

            if(player === human){

                showResult(
                    "YOU WIN!"
                );

            }else{

                showResult(
                    "COMPUTER WINS!"
                );

            }

        }else{

            showResult(
                `PLAYER ${player} WINS!`
            );

        }

        return;

    }

    if(!board.includes("")){

        running = false;

        showResult(
            "DRAW!"
        );

        return;

    }

    currentPlayer =
    currentPlayer === "X"
    ? "O"
    : "X";

    updateStatus();

}

function updateStatus(){

    if(!running) return;

    if(players === 1){

        if(currentPlayer === human){

            status.textContent =
            "Your Turn";

        }else{

            status.textContent =
            "Computer Thinking...";

        }

    }else{

        status.textContent =
        `Player ${currentPlayer}'s Turn`;

    }

}

function showResult(message){

    const overlay =
    document.getElementById("overlay");

    const resultText =
    document.getElementById("resultText");

    resultText.textContent =
    message;

    overlay.classList.remove(
        "hidden"
    );

    document
    .querySelector(".board")
    .classList.add("fade");

    setTimeout(() => {

        overlay.classList.add(
            "hidden"
        );

        document
        .querySelector(".board")
        .classList.remove("fade");

    }, 2000);

}

function checkWinner(player){

    return wins.some(pattern => {

        return pattern.every(index => {

            return board[index]
            === player;

        });

    });

}

function randomMove(){

    const available = [];

    for(
        let i = 0;
        i < 9;
        i++
    ){

        if(
            board[i] === ""
        ){

            available.push(i);

        }

    }

    const randomIndex =
    Math.floor(
        Math.random() *
        available.length
    );

    makeMove(
        available[randomIndex],
        ai
    );

}

function bestMove(){

    let bestScore =
    -Infinity;

    let move;

    for(
        let i = 0;
        i < 9;
        i++
    ){

        if(board[i] === ""){

            board[i] = ai;

            let score =
            minimax(
                board,
                false
            );

            board[i] = "";

            if(
                score >
                bestScore
            ){

                bestScore =
                score;

                move = i;

            }

        }

    }

    makeMove(
        move,
        ai
    );

}

function aiMove(){

    if(!running) return;

    if(
        difficulty === "easy"
    ){

        randomMove();
        return;

    }

    if(
        difficulty === "medium"
    ){

        if(
            Math.random() < 0.4
        ){

            randomMove();

        }else{

            bestMove();

        }

        return;

    }

    bestMove();

}

function minimax(
    board,
    isMax
){

    if(checkWinner(ai))
        return 10;

    if(checkWinner(human))
        return -10;

    if(!board.includes(""))
        return 0;

    if(isMax){

        let best =
        -Infinity;

        for(
            let i = 0;
            i < 9;
            i++
        ){

            if(
                board[i] === ""
            ){

                board[i] = ai;

                best = Math.max(
                    best,
                    minimax(
                        board,
                        false
                    )
                );

                board[i] = "";

            }

        }

        return best;

    }

    let best =
    Infinity;

    for(
        let i = 0;
        i < 9;
        i++
    ){

        if(
            board[i] === ""
        ){

            board[i] = human;

            best = Math.min(
                best,
                minimax(
                    board,
                    true
                )
            );

            board[i] = "";

        }

    }

    return best;

}

document
.getElementById(
    "restartBtn"
)
.addEventListener(
    "click",
    () => {

        location.reload();

    }
);

document
.getElementById(
    "newGameBtn"
)
.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "players"
        );

        localStorage.removeItem(
            "difficulty"
        );

        window.location.href =
        "../index.html";

    }
);