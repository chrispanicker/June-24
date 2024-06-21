let mic;

function preload(){
  font = loadFont("src/TiemposHeadline-Black.woff")
}

function setup(){
  let cnv = createCanvas(windowWidth, windowHeight);

  let msg = "SELECTS", txtX=0, txtY=0;

  if(width<900){
      w=5;
      fontSize=80;
      points = font.textToPoints(msg, txtX, txtY, fontSize, {sampleFactor: .02});
  }else{
      w=10;
      fontSize=200;
      points = font.textToPoints(msg, txtX, txtY, fontSize, {sampleFactor: .16});
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
  let senstivities = .1
  background(0)
  stroke(255)
  noFill()
  micLevel = mic.getLevel();
  push()
  for(let i=0; i<width; i++){
    let amt = map(i,0,width, 0,1)
    let color1 = color(map(micLevel, 0, .3, 0, 255), 0, map(micLevel, 0, .3, 200, 255))
    let color2 = color(map(micLevel, 0, .3, 100, 255), map(micLevel, 0, .3, 200, 255), 0)
    let myColor = lerpColor(color1, color2, amt)
    stroke(myColor)
    line(i, 0, i,height)
  }
  pop()

  beginShape()
  for(let pt of points){
    if(pt.y<height/2){
      let y = map(micLevel, 0, senstivities, height/2, pt.y);
      ellipse(pt.x, random(y, pt.y), 10*micLevel*3)
      vertex(pt.x, random(y, pt.y))
    }
  }
  endShape()
  beginShape()
  for(let pt of points){
    if(pt.y<height/2){

    }else{
      let y = map(micLevel, 0, senstivities, height/2, pt.y);
      ellipse(pt.x, random(y, pt.y), 10*micLevel*3)
      vertex(pt.x, random(y, pt.y))
    }
  }
  endShape()
}

