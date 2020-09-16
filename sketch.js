var foodS, foodStock, database, dog, happyDog, dogEatingImg;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  dogEatingImg = loadImage("images/Capture-removebg-preview.png");
}

function setup() {
  createCanvas(500, 500);
  database= firebase.database();
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);


  dog = createSprite(250, 300, 30, 50);
  dog.addImage(dogImg);
  dog.scale= 0.3;

} 


function draw() {  
  background(46, 139, 87);

if(keyWentDown('SPACE')){
  writeStock(foodS);
  dog.addImage(dogEatingImg);
  dog.scale= 1.2;
  
  }
  
if(keyWentUp('SPACE')){
  writeStock(foodS);
  dog.addImage(happyDogImg);
  dog.scale = 0.3;
  }

  drawSprites();

  stroke('black');
  fill('white')
  textSize(25);
  text("Press 'space' to feed Draco", 100, 30);
  text("Release 'space' key to play with Draco", 45, 60);


}

function readStock(data){
  foodS= data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x= x-1;
  }
  
  database.ref('/').update({
    Food:x
  })
}
