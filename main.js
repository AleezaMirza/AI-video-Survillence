video="";
status="";
objects = [];

function preload(){
    video= createVideo("video.mp4");
    video.hide();
}

function draw(){
    image(video, 0, 0, 300, 300);
    if(status!= ""){
        objectDetector.detect(video, gotResult);
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Dectected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: " + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y +15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function setup(){
    canvas = createCanvas(300, 300);
    canvas.center();
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects"; 
}

function modelLoaded(){
    console.log("model Loaded");
    status=true;
    video.loop();
    video.volume(0);
    video.speed(1);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}