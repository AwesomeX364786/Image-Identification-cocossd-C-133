img = "";
status = "";
objects = [];

function preload(){
img = loadImage('dog_cat.jpg');
}

function setup(){
canvas = createCanvas(650, 430);
canvas.center();
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById('status').innerHTML = "Status : Detecting Objects!"; 
}

function modelLoaded(){
console.log("Model Loaded");
status = true;
objectDetector.detect(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
image(img, 0, 0, 650, 430);
if(status != ""){
    for(i = 0; i < objects.length; i++){
        document.getElementById('status').innerHTML = "Status : Objects Detected!"; 
        fill("#0000FF");
        percent = Math.floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y + 15);
        noFill();
        stroke("#0000FF");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}
}