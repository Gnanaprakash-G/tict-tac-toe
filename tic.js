let i=0;
let score=JSON.parse(localStorage.getItem("score"))||[0,0,0];
let x=score[0]||0;
let tie=score[1]||0;
let o=score[2]||0;
let X=document.querySelector(".x");
let Tie=document.querySelector(".tie");
let O=document.querySelector(".o");
X.innerHTML="X:"+x;
Tie.innerHTML="Tie:"+tie;
O.innerHTML="O:"+o;
let board=[['1','2','3'],['4','5','6'],['7','8','9']];
let display=document.querySelector(".display");

move=(n)=>
{
    let curr='';
    const y=n%10;
    const x=Math.floor(n/10);
    if(board[x-1][y-1]=="X"||board[x-1][y-1]=="O")
    {
        return;
    }
    if (i%2==0)
    {
        curr='X';
    }
    else{
        curr='O';
    }
    board[x-1][y-1]=curr;
    document.querySelector(".btn"+n).innerHTML=curr;
    i+=1;
    win();
  }

win=()=>
  {
    for(let i=0;i<3;i++)
    {
      if(board[i][0]==board[i][1]&&board[i][1]==board[i][2])
      {
        change(i,1);
        return;
      }
    }
    for(let i=0;i<3;i++)
    {
      if(board[0][i]==board[1][i]&&board[1][i]==board[2][i])
      {
        change(1,i);
        return;
      }
    }
    if((board[0][0]==board[1][1]&&board[1][1]==board[2][2])|| (board[0][2]==board[1][1]&&board[1][1]==board[2][0]))
    {
      change(1,1);
      return;
    }
    draw();
}

change=(a,b)=>
{
    if(board[a][b]==='X')
    {
        x+=1
        X.innerHTML="X:"+x;
    }
    else if(board[a][b]==='O')
    {
        o+=1
        O.innerHTML="O:"+o;
    }
    localStorage.setItem("score",JSON.stringify([x,tie,o]));
    let btns=document.querySelectorAll(".btn");
    btns.forEach(btn => {
        btn.disabled=true;
    });
    display.innerHTML=board[a][b]+" Won";
    display.style.right="0";
    setTimeout(()=>{display.innerHTML="";
    emty();
},5000);
}

emty=()=>
{
display.style.right="-50%";
let arr=document.querySelectorAll(".btn");
arr.forEach(ar => {
    ar.innerHTML="";
});
board=[['1','2','3'],['4','5','6'],['7','8','9']];
i=0;
let btns=document.querySelectorAll(".btn");
btns.forEach(btn => {
    btn.disabled=false;
});
}

draw=()=>
{
let arr=document.querySelectorAll(".btn");
for (let i=0;i<arr.length;i++)
{
    if(arr[i].innerHTML=="")
    {
        return;
    }
}
tie+=1;
Tie.innerHTML="Tie:"+tie;
localStorage.setItem("score",JSON.stringify([x,tie,o]));
let btns=document.querySelectorAll(".btn");
btns.forEach(btn => {
        btn.disabled=true;
    });
    display.innerHTML="Draw";
    display.style.right="0";
    setTimeout(()=>{display.innerHTML="";
    emty();
},5000);
}

reset=()=>
{
    localStorage.setItem("score",JSON.stringify([0,0,0]));
    x=0;
    tie=0;
    o=0;
    X.innerHTML="X:"+x;
    Tie.innerHTML="Tie:"+tie;
    O.innerHTML="O:"+o;
}