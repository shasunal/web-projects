const TEST = true;
//20 seconds the wave changes color
const WaveTime = 20000;
//wave colors that blend
let WaveColA, WaveColB;

//sun and moon and raft
let sunImg, moonImg, raftImg;

//sparkles
let sparkles = [];



//waves
let rows = 5;
let waveMaxHeight = 150;
let baseT = 0;

//this runs first with p5. Load images
function preload(){
    sunImg = loadImage("imgs/sun.png");
    moonImg = loadImage("imgs/moon.png");
    raftImg = loadImage("imgs/bambooraft.png");
}

function timeTester(){
    //manual enter time
  if (TEST) return 12 + 30/60; 
  return hour() + minute()/60 + second()/3600;
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  noStroke();
//colors for the waves
  WaveColA = color(27, 60, 83, 100);
  WaveColB = color(3, 138, 148, 100);

  //sparkles
  initSparkles();
}

//draw function runs every frame
function draw(){
    
  const h = timeTester();
  const morning = 6, noon = 13, evening = 17, night = 24;

//gradient points
  let fromColor, toColor, t;
  //night to morning
  if (h >= 0 && h < morning) { 
    fromColor = color("#0d2030"); 
    toColor = color("#f8b195"); 
    t = (h-0)/(morning-0);
    //morning to noon
  } else if (h >= morning && h < noon) { 
    fromColor = color("#F8B195"); 
    toColor = color("#B4C4F4"); 
    t = (h-morning)/(noon-morning);
    //noon to evening
  } else if (h >= noon && h < evening) { 
    fromColor = color("#B4C4F4"); 
    toColor = color("#CDA1E3"); 
    t = (h-noon)/(evening-noon);
  } else { 
    //evening to night
    fromColor = color("#CDA1E3"); 
    toColor = color("#0d2030"); 
    t = (h-evening)/(night-evening); }

 //lerp blends color
  const bg = lerpColor(fromColor, toColor, constrain(t, 0, 1));
  background(bg); //make sky background

  // gradient radial
  let gradFrom, gradTo;
  if (h >= 0 && h < morning) { 
    gradFrom = color("#355C7D"); 
    gradTo = color("#fcd658"); 
    t = (h-0)/(morning-0);
  } else if (h >= morning && h < noon) { 
    gradFrom = color("#fcd658"); 
    gradTo = color("#4fb3ff"); 
    t = (h-morning)/(noon-morning);
  } else if (h >= noon && h < evening) { 
    gradFrom = color("#4fb3ff"); 
    gradTo = color("#81eefc"); 
    t = (h-noon)/(evening-noon);
  } else { 
    gradFrom = color("#81eefc"); 
    gradTo = color("#355C7D"); 
    t = (h-evening)/(night-evening); }

    //gradient of radius
  const gradCol = lerpColor(gradFrom, gradTo, 
    constrain(t, 0, 1)); 
  drawRadialGradient(
    width/2, height/2, //center 
     max(width, height) * 0.4 ,//radius
      gradCol); //fades to transparent color

  //draw sun and moon
  drawSunAndMoon(h);

  // draw waves
  drawWaves(rows);
  //draw sparkles
  drawWaterSparkles();

  //draw raft
  drawRaft();
}
 //draws sun or moon
function drawSunAndMoon(h){
  const morning = 6, evening = 17;
  const cx = width / 2;
  const yTop = height * 0.3;
  const yBottom = height * 0.8;

  //sun and moon scale size
  const sunScale = 0.65;  
  const moonScale = 0.5; 

  const sunW = min(width, height) * sunScale;
  const moonW = min(width, height) * moonScale;

  //keep image ratio
  const sunH = sunW * (sunImg.height / sunImg.width);   
  const moonH = moonW * (moonImg.height / moonImg.width);

  imageMode(CENTER);

  //sun
  if (h >= morning && h < evening){
    let t = map(h, morning, evening, 0, 1);
    let y = (t < 0.5)
      ? map(t, 0, 0.5, yBottom, yTop)
      : map(t, 0.5, 1, yTop, yBottom);
    image(sunImg, cx, y, sunW, sunH);
  }

  //Moon
  else {
    let totalNight = (24 - evening) + morning;
    let nightHour = (h >= evening) ? (h - evening) : (h + (24 - evening));
    let t = map(nightHour, 0, totalNight, 0, 1);
    let y = (t < 0.5)
      ? map(t, 0, 0.5, yBottom, yTop)
      : map(t, 0.5, 1, yTop, yBottom);
    image(moonImg, cx, y, moonW, moonH);
  }
}

//gradient
function drawRadialGradient(cx, cy, r, col){
  push(); //save

  drawingContext.save();

  const grad = drawingContext.createRadialGradient
  (cx, cy, 0, //inner circle radius
    cx, cy, r); //outer circle radius
  grad.addColorStop(0,
    //inner circle is slightly transparent
     `rgba(${red(col)},${green(col)},${blue(col)},0.7)`);
  grad.addColorStop(1, 
    //outter circle is also slightly transparent
    `rgba(${red(col)},${green(col)},${blue(col)},0.0)`);
  drawingContext.fillStyle = grad; //fill gradient
  rect(0, 0, width, height); //whole canvas

  drawingContext.restore();
  pop();
}
//wave color change
function WaveColorChange(ms, period){
  const x = (ms % period) / period;     
  return x < 0.5 ? x * 2 : (1 - x) * 2;  //increase/decrease
}

function drawWaves(count){ //draws each layer of wave
  for (let i = 0; i < count; i++){
    drawWave(i, count);
  }
  baseT += 0.01; //for noise
}

function drawWave(n, rows){
    //each wave is slightly higher
  const baseY = height - n * (waveMaxHeight / 3);
  //offset for each wave
  let t = baseT + n * 100;

  //start from left
  let startX = 0;
  //save 
  push();
  //rbg mode
colorMode(RGB, 255);
//no outline
  noStroke();

  //offset each wave's color
   const rowPhaseMs = (n * 700) % WaveTime;  
         //color blend 
  const blend = WaveColorChange(millis() + rowPhaseMs, WaveTime)
const c = lerpColor(WaveColA, WaveColB, blend);
//waves slightly transparent
  c.setAlpha(200); 
  //fill color
  fill(c);

  //start drawing the shape
  beginShape();
  //start on the left
  vertex(startX, baseY);
  //go across the width
  for (let x = startX; x <= width; x += 10) {
    //noise for variance
    const y = baseY - map(noise(t), 0, 1, 10, waveMaxHeight);
    //adds a point  and increases noise
    vertex(x, y);
    t += 0.01;
  }
  vertex(width, baseY);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  pop();

}

function initSparkles(count = 500){
  sparkles = [];

 
  const waterTop = height - waveMaxHeight - 100;

  for (let i = 0; i < count; i++){
    sparkles.push({
      x: random(width),
      y: random(waterTop, height - 6),
      r: random(1, 3),
      phase: random(TWO_PI),
      speed: random(0.02, 0.08)
    });
  }
}



function drawRaft(){
    imageMode(CENTER);
    const x = width *0.5;
    const y = height* 0.95;
    const w = min(width, height) * 1.5;
    const h = w * 0.5;

   const angle = sin(frameCount * 0.03) * 0.04;

    push();
   translate(x,y);
  rotate(angle);
  image(raftImg, 0, 0, w, h);
  pop();
    }

    function drawWaterSparkles(){
  const waterTop = height - waveMaxHeight - 130; // same boundary as init
  const ctx = drawingContext;

  // clip to a simple water rectangle so sparkles never enter the sky
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, waterTop, width, height - waterTop);
  ctx.clip();

  noStroke();
  for (let i = 0; i < sparkles.length; i++){
    const s = sparkles[i];
    // speed of "sparkling"
    const a = map(sin(frameCount * s.speed * 3 + s.phase), -1, 1, 40, 180);
    fill(255, 255, 255, a);
    // controls size
    const d = s.r + random(0.5, 2);
    ellipse(s.x, s.y, d, d);
  }

  ctx.restore();
}



 

//full screen canvas
function windowResized(){ 
    resizeCanvas(windowWidth, windowHeight); 
    initSparkles();
}
