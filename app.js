let boxes = document.querySelectorAll(".box");

let turn = "X";
let isGameOver = false;

document.querySelector(".box-x").style.backgroundColor = "#103b99";

boxes.forEach(e => {
    e.innerHTML = ""
    e.addEventListener("click", ()=>{
        if (!isGameOver && e.innerHTML==""){
            e.innerHTML = turn;
            checkWinner();
            checkDraw();
            changeTurn();
        }
    })
});

function changeTurn(){
    if (turn ==="X"){
        turn = "O";
        document.querySelector(".box-x").style.removeProperty("background-color");
        document.querySelector(".box-o").style.backgroundColor = "#103b99";
    }
    else{
        turn = "X";
        document.querySelector(".box-o").style.removeProperty("background-color");
        document.querySelector(".box-x").style.backgroundColor = "#103b99";
    }
}

function checkDraw(){
    if (!isGameOver){
        let isDraw = true;
        boxes.forEach(e =>{
            if (e.innerHTML === "") isDraw = false;
        });

        if (isDraw) {
            isGameOver = true;
            document.querySelector("#result").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

function checkWinner() {
    let winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i=0; i<winningConditions.length; i++){
        let v0 = boxes[winningConditions[i][0]].innerHTML;
        let v1 = boxes[winningConditions[i][1]].innerHTML;
        let v2 = boxes[winningConditions[i][2]].innerHTML;

        if (v0!="" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            document.querySelector("#result").innerHTML = turn + " Wins";
            document.querySelector("#play-again").style.display = "inline";

            for (let j=0; j<3; j++){
                boxes[winningConditions[i][j]].style.backgroundColor = "#AB43E2";
                boxes[winningConditions[i][j]].style.color = "#FFFFF2";
            }
            // alert(turn);
        }
    }
}

document.querySelector("#play-again").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    document.querySelector(".box-o").style.removeProperty("background-color");
    document.querySelector(".box-x").style.backgroundColor = "#103b99";

    document.querySelector("#result").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#FFF";
    });
})