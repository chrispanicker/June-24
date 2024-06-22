let mic;

function preload(){
  font = loadFont("src/TiemposHeadline-Black.woff")
}

function setup(){
  let cnv = createCanvas(windowWidth, windowHeight);

  let msg = "SELECTS", txtX=0, txtY=0;

  if(width<900){
      w=5;
      fontSize=140;
      points = font.textToPoints(msg, txtX, txtY, fontSize, {sampleFactor: .1});
  }else if(width<1100){
    w=10;
    fontSize=200;
    points = font.textToPoints(msg, txtX, txtY, fontSize, {sampleFactor: .16});
  }else if(width<1440){
      w=10;
      fontSize=300;
      points = font.textToPoints(msg, txtX, txtY, fontSize, {sampleFactor: .16});
  }else{
    w=10;
    fontSize=350;
    points = font.textToPoints(msg, txtX, txtY, fontSize, {sampleFactor: .2});
  }
  
  let bounds = font.textBounds(msg, txtX, txtY, fontSize);

  // Center text around the origin based on the bounding box.
  for (let pt of points) {
    pt.x = (pt.x - bounds.x - bounds.w/2)+width/2;
    pt.y = (pt.y - bounds.y - bounds.h/2)+height/2;
  }

  cnv.mousePressed(userStartAudio);
  textAlign(CENTER);
  mic = new p5.AudioIn();
  mic.start();
}

function draw(){
  let wave=0;
  let senstivities = .04
  background(0)
  stroke(255)
  strokeWeight(2)
  noFill()
  micLevel = mic.getLevel();
  push()
  for(let i=0; i<width; i++){
    let amt = map(i,0,width, 0,1)
    let color1 = color(map(micLevel, 0, senstivities, 0, 255), 0, map(micLevel, 0, senstivities, 200, 255))
    let color2 = color(map(micLevel, 0, senstivities, 100, 255), map(micLevel, 0, senstivities, 200, 255), 0)
    let myColor = lerpColor(color1, color2, amt)
    stroke(myColor)
    line(i, 0, i,height)
  }
  pop()

  beginShape()
  for(let pt of points){
    if(pt.y<height/2){
      let y = map(micLevel, 0, .01, height/2, pt.y);
      ellipse(pt.x, random(y, pt.y), 10*micLevel*3)
      vertex(pt.x, random(y, pt.y))
    }
  }
  endShape()
  beginShape()
  for(let pt of points){
    if(pt.y<height/2){

    }else{
      let y = map(micLevel, 0, .01, height/2, pt.y);
      ellipse(pt.x, random(y, pt.y), 10*micLevel*3)
      vertex(pt.x, random(y, pt.y))
    }
  }
  endShape()
}
