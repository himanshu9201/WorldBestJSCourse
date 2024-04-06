const board = document.getElementById("game-board");
const instruction = document.getElementById("isntruction-text"); 
const  logo = document.getElementById("logo");
const score = document.getElementById('score');
//define game variables
let gridSize = 20;
let snake = [{ x:10 , y:10}];
let food =  generateFood();
let direction = 'right'
let gameInterval;
let gameaSpeedDelay=200;
let gameStarted = false;
//draw the map ,snaka and food 
function draw(){
  board.innerHTML = '';
  drawsnake();
  drawFood();
  updatescore();
}
function drawsnake(){
snake.forEach((segment)=>{
  const snakeElemen = creaeGameElement('div','snake');
  setPosition(snakeElemen,segment);
  board.appendChild(snakeElemen);
});

}
function creaeGameElement(tag , classname){
   const element = document.createElement(tag);
   element.className = classname;
   return(element);
}
function setPosition(element,position){
  element.style.gridColumn = position.x;
  element.style.gridRow   = position.y;  
}
//testing draw function 
// draw();

//draw food function 
function drawFood(){
 const foodElement = creaeGameElement('div','food'); 
 setPosition(foodElement,food);
 board.appendChild(foodElement);
}

//generate food
function generateFood(){
const x = Math.floor( Math.random()*gridSize+1);
const y = Math.floor( Math.random()*gridSize+1);
return{x,y};
}

//move the snake 

function move(){
  const head = {...snake[0]};
  switch(direction) {
    case 'right':
      head.x++;
      break;
    case 'left':
      head.x--;
      break;
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
  }
  snake.unshift(head);
 
  if((head.x===food.x)&&(head.y===food.y)){
    food =generateFood();
    increaseSpeed();
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
      move();
       checkinCollision();
     draw();
    } , gameaSpeedDelay);
  }
  else{
    snake.pop();
  }
}



//start game function
function startGame(){
 gameStarted = true;
 instruction.style.display = 'none'
        logo.style.display = 'none'
    getInterval  = setInterval(() => {
        move();
        checkinCollision();
        draw();
    },gameaSpeedDelay);    
}


// //keypress event listner
function handleKeyPress(event){
  console.log('hiii');
if((!gameStarted&&event.key ===' ')){
  startGame();
}
else{
switch (event.key) {
    case 'ArrowUp':
    direction = 'up';
    break;
    case 'ArrowDown':
    direction = 'down';
    break;
    case 'ArrowLeft':
    direction = 'left';
    break;
    case 'ArrowRight':
    direction = 'right';
    break;
}
}
}



document.addEventListener('keydown',handleKeyPress); 

function increaseSpeed(){
  console.log(gameaSpeedDelay);
  if(gameaSpeedDelay>150){
    gameaSpeedDelay-=5;
  }
  else if(gameaSpeedDelay>100){
  gameaSpeedDelay-=3 ;
  }
  else if(gameaSpeedDelay>50){
  gameaSpeedDelay-=2 ;
  }
  
  else if(gameaSpeedDelay>15){
  gameaSpeedDelay-=0 ;
  }
}
 function checkinCollision(){
   const head = snake[0];
   console.log(snake[0].x);
  
   console.log(head)
   if(head.x<1||head.x>gridSize||head.y<1||head.y>gridSize){
     resetGame();
   }


  for(let i = 1; i<snake.length;i++){
    if((head.x === snake[i].x) && (head.y === snake[i].y)){
      resetGame();
    }
  }

   function resetGame(){
    snake = [{x:10,y:10}];
    food =  generateFood();
    direction = 'right';
    gameaSpeedDelay = 200;
    updatescore();
   }
  
  
  

 }
 function updatescore(){
  const currentScore = snake.length-1;
  score.textContent = currentScore.toString().padStart(3,'0');
 }

 

 
