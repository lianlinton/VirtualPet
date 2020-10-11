var dog, happyDog, database, foodS, foodStock;
var dogImage, happyDogImage;

function preload(){
  dogImage = loadImage("images/Dog.png");
  happyDogImage = loadImage("images/happydog.png"); 
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();

  dog = createSprite(200, 200, 10, 30);
  dog.addImage("dog", dogImage);

  happyDog = createSprite(100, 100, 10, 30);
  happyDog.addImage("happy", happyDogImage); 

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }
  drawSprites();
  
  textSize(10);
  fill("white");
  stroke(2);
  text("Note: Press UP_ARROW key to feed the Dog", 140, 140);
}

function readStock(Data){
  foodS = data.val();
}

function writeStock(data){
  if (data <= 0){
    data = 0;
  } else {
    data = data -1;
  }
  database.ref('/').update({
    Food: data
  })
}



