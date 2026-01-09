let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset");
let replayButton = document.querySelector("#replay");
let messageContainer = document.querySelector("#messageContainer");
let msg = document.querySelector("#msg");

let turn0 = true; // turn : X or turn : O
//2d array for winning patterns
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const resetGame = ()=>{  //logic of reset game
    turn0 = true;
    enableBoxes();
    messageContainer.classList.add("hide");
    getWinner = false;
    moveCount = 0;
    boxes.forEach((box, index) => {
    setTimeout(() => {
        box.style.backgroundColor = "#7fffd4";
    }, index * 200); // 200ms gap between boxes
});


}

resetButton.addEventListener("click",resetGame)  //reset

replayButton.addEventListener("click",resetGame); //replay

let moveCount = 0;

boxes.forEach((box) =>{      //config for each box
    box.addEventListener("click",()=>{
        if(turn0){   //turn:X
            box.innerText="X";
            turn0 = false;
            moveCount++;
        }else{      // turn:O
            box.innerText = "O";
            turn0 = true;
            moveCount++;
        }
        box.disabled = true;   // once clicked, cannot change again
        checkWinner();
    })
})

const disableBoxes =() =>{   // ther must be no input when we get the winner for once
    for(let box of boxes){
        box.disabled = true; 
    }
}
const enableBoxes =() =>{   // used when reset or replay
    for(let box of boxes){
        box.disabled = false; 
        box.innerText = "";
    }
}

const showWinner=(winner)=>{   //print the winner and show the hidden message and remove the class.
    msg.innerText = `Congrats!.. ${winner} is our Winner`;
    messageContainer.classList.remove("hide");
}
let getWinner = false;
const checkWinner = ()=>{    // check for the winning patterns and give the winner
    for(let pattern of winPatterns){   
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner",pos1Val);
                boxes[pattern[0]].style.backgroundColor = "#ffd166";
                boxes[pattern[1]].style.backgroundColor = "#ffd166";
                boxes[pattern[2]].style.backgroundColor = "#ffd166";
                getWinner = true;
                disableBoxes();
                showWinner(pos1Val);
                return;
            }
    
            if(moveCount === 9 && !getWinner){
                    drawCondition();
                }
                
            
            
        }
    }
}

const drawCondition = ()=>{
    
        msg.innerText = "Match Draw!.. Play Again";
        messageContainer.classList.remove("hide");
    
}
