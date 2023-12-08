let errors=0;
let cardList=[
    "taco",
    "cat",
    "goat",
    "cheese",
    "pizza"
]
let cardSet;
let board=[];
let rows=2;
let columns=5;
let card1;
let card2;

window.onload=function(){
    shuffleCards();
    startGame();
}

function shuffleCards(){
    cardSet=cardList.concat(cardList);
    console.log(cardSet);

    for(let i=0; i<cardSet.length; i++){
        let j=Math.floor(Math.random()*cardSet.length);
        let temp=cardSet[i];
        cardSet[i]=cardSet[j];
        cardSet[j]=temp;
    }
    console.log(cardSet);
}
function startGame(){
    for(let r=0;r<rows;r++){
        let row=[];
        for(let c=0;c<columns;c++){
            let cardImg=cardSet.pop();
            row.push(cardImg);

            let card=document.createElement("img");
            card.id=r.toString()+"-"+c.toString();
            card.src=cardImg+".jpg";
            card.classList.add("card");
            card.addEventListener("click",selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }
    console.log(board);
    setTimeout(hideCards,1000);
}
function hideCards(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns;c++){
            let card=document.getElementById(r.toString()+"-"+c.toString());
            card.src="Back.jpg";
        }
    }
}
function selectCard(){
    if(this.src.includes("Back")){
        if(!card1){
            card1=this;

            let coords=card1.id.split("-");
            let r=parseInt(coords[0]);
            let c=parseInt(coords[1]);

            card1.src=board[r][c]+".jpg";
        }
        else if(!card2 && this !=card1){
            card2=this;
            let coords=card2.id.split("-");
            let r=parseInt(coords[0]);
            let c=parseInt(coords[1]);

            card2.src=board[r][c]+".jpg";
            setTimeout(update,1000);
        }
    }
}
function update(){
    if(card1.src != card2.src){
        card1.src="Back.jpg";
        card2.src="Back.jpg";
        errors += 1;
        document.getElementById("errors").innerText=errors;
    }
    card1=null;
    card2=null;
}