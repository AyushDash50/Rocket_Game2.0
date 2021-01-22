//variables
var BgImg , crash; 
var SpaceBg;
var Rocket;
var score ,highscore , life;
var obstaclesGroup;
var Gamestate;

// preloading images and sound
function preload(){
BgImg = loadImage("SpaceBg.png");

crash = loadSound("crash.mp3")
RocketImg = loadImage("Rocket1.png")

ObstacleImg = loadImage("AsteroidImage.png")
Obstacle2Img = loadImage("Asteroid2Image.png")
Obstacle3Img = loadImage("Fireball_Image.png")
Obstacle4Img = loadImage("Asteroid3Img.png")

RestartImg = loadImage("restartcopy.png")
life5Img = loadImage("Heart1Img.png");
life4Img = loadImage("Heart2Img.png");
life3Img = loadImage("Heart3Img.png");
life2Img = loadImage("Heart4Img.png");
life1Img = loadImage("Heart5Img.png");
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  // Space background
  SpaceBg = createSprite(windowWidth/2, windowHeight/2, 50, 50);
  SpaceBg.addImage("BgImg", BgImg);
  SpaceBg.scale = 3.5;
  SpaceBg.velocityX = -2;
  
// Rocket
  Rocket = createSprite(180,windowHeight/2); 
Rocket.addImage(RocketImg);
Rocket.scale = 1.75;
Rocket.setCollider("rectangle",0,10,90,50);

  //create Obstacle group
  obstaclesGroup = createGroup();
     
  score = 0;
  highscore = 0;

  life = 5;

  Gamestate = "Play";
  
  resetButton = createSprite(windowWidth/2 , windowHeight/2+100);
  //add reset image
  resetButton.addImage(RestartImg);
}

function draw() {
  background(0);
 //resetting the background
  
 if(SpaceBg.x<windowWidth/2-100){
  SpaceBg.x = windowWidth/2
}

 if (Gamestate === "Play"){
         
  resetButton.visible = false;
    
//move rocket up
  if(keyDown("w")){
    Rocket.y -=4
  }  
//move rocket down
  if(keyDown("s")){
    Rocket.y +=4
  }  
//move rocket forward
  if(keyDown("d")){
    Rocket.x +=2
  }  
  //reseting rocket if it goes too front
  if(Rocket.x>windowWidth-900){
    Rocket.x = 180;    
  }

  //reseting rocket if it goes too down 
  if(Rocket.y>windowHeight){
    Rocket.x = 180;  
    Rocket.y = windowHeight/2;
  }
  
  //reseting rocket if it goes too up
  if(Rocket.y<windowHeight/2-500){
    Rocket.x = 180;  
    Rocket.y = windowHeight/2;
  }
  
  score = score + Math.round(getFrameRate() / 60);
 
  //spawn obstacles 
  Obstacle();
// check is touching and destroy the asteroid. Also reduce the life 
  if(life >0){
    for(var i=0; i< obstaclesGroup.length;i++){
      if(Rocket.isTouching(obstaclesGroup.get(i))){
        obstaclesGroup.get(i).destroy();
//        crash.play();
        life--
         //add code to remove life image;

      }
    }

  } else{
        Gamestate = "end" 
      }
    
    
  }
 drawSprites();
  //Life image
  heart();
 //gamestate end
  if (Gamestate === "end"){
      fill("red");
      stroke("yellow");
      textSize(40);
      obstaclesGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
      text("GAMEOVER", windowWidth/2-100 , windowHeight/2-100)
      
      resetButton.visible = true;
      
      if(mousePressedOver(resetButton)){
        restart();
      }
  }

  //displaying score
fill ("blue");
stroke("yellow");
textSize(32);
text("Score: " + score, windowWidth-340, 125);

if(highscore>0){
   
  text("High Score: " + highscore, windowWidth-340, 75);

}

fill("blue");
text("To move use W S D keys", windowWidth/2-70 , 75);

}
//restarting the game
function restart(){

  Gamestate = "Play";
  if(highscore<score){
     highscore = score;

  }
  score = 0;
  life = 5;
  obstaclesGroup.destroyEach();
}



//asteroid creation
function Obstacle(){
   if (frameCount % 25 === 0){
    obstacle = createSprite(windowWidth,Math.round(random(2,windowHeight-2)),50,50);
    obstacle.velocityX = -(11 + score / 100);
    

    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch (rand) {
      case 1:
        obstacle.addImage(ObstacleImg);
        break;
      case 2:
        obstacle.addImage(Obstacle2Img);
        break;
      case 3:
        obstacle.addImage(Obstacle3Img)  
        obstacle.scale = 0.5;
        obstacle.setCollider("rectangle",0,0,330,100);
        break;
      case 4:
        obstacle.addImage(Obstacle4Img);
        obstacle.setCollider("rectangle",0,0,60,60);
        break;  
    }  
       //Giving obstacle lifetime
       obstacle.lifetime = 159;

     // obstacle.debug = true

       //Adding into group
       obstaclesGroup.add(obstacle);
       
   }

}
function heart(){
  switch (life) {
   case 1:
      image(life1Img, 100,30,75,75);
      break;
    case 2:
      image(life1Img, 100,30,75,75)
      image(life2Img, 200,30,75,75)
      break;
    case 3:
      image(life1Img, 100,30,75,75)
      image(life2Img, 200,30,75,75)
      image(life3Img, 300,30,75,75)
      break;
      case 4:
      image(life1Img, 100,30,75,75)
      image(life2Img, 200,30,75,75)
      image(life3Img, 300,30,75,75)
      image(life4Img, 400,30,75,75)
      break;
      
      case 5:
      image(life1Img, 100,30,75,75)
      image(life2Img, 200,30,75,75)
      image(life3Img, 300,30,75,75)
      image(life4Img, 400,30,75,75)
      image(life5Img, 500,30,75,75)
      break;
  }  
}