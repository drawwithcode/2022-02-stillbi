//DEFINE THE ARRAY OF COLORS
const colorList = ["#13E23A", "#F70825", "#F9F9F9"];
//define the variables
var iterator = 0;
let myImage;
let myImage2;
let mySong;

//I create the function preload before the function setup to set the assets
//and set where to find my song and images
function preload() {
  myImage = loadImage("./assets/salvini.jpeg");
  myImage2 = loadImage("./assets/salvinicerchio.png");
  soundFormats("mp3", "ogg");
  mySong = loadSound("./assets/FREESTYLE.mp3");
}

//I create my canva who occupies the whole screen
function setup() {
  createCanvas(windowWidth, windowHeight);
}

//in the function draw I make things appear in my canva
//I set the background and I fill it with the photo of salvini and a black and white filter
function draw() {
  background(myImage);
  myImage.filter("gray", 5);

  //this is a cicle: draw squares on background with random colors taken from my array colorList
  for (let x = 0; x < windowWidth; x += 20) {
    for (let y = 0; y < windowHeight; y += 50) {
      let colorHex = random(colorList);
      fill(color(colorHex));

      rect(x, y, 10, 10);
    }
  }
  // perlin noise applied to my salvini picture both on x and y
  iterator++;
  let x = iterator;
  let y = (noise(iterator / 60) * width) / 2;
  image(myImage2, x, y, 200, 200);

  //I write my text
  let s = "CHIUDERE I PORTI! RUSPE RUSPE RUSPE! AH NO??";
  fill("white");
  textSize(32);
  textAlign(CENTER);
  text(s, 10, 10, windowWidth, windowHeight); // Text wraps within text box
}

//function which allows to play music when my mouse is clicked on the right part
//when you click on the left part it stops
function mousePressed() {
  if (mouseButton == LEFT) {
    if (mySong.isPlaying() == false) {
      mySong.play();
    }
  } else if (mouseButton == RIGHT) {
    if (mySong.isPlaying() == true) {
      mySong.stop();
    }
  }
}
