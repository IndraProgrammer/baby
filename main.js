var img="";
var objects=[];
var status="";
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectdetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="status:Detecting objects";
}
function modelLoaded(){
    status=true;
    console.log("modelLoaded");
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
 
    }
    
}
function draw(){
    image(video,0,0,640,400);
    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectdetector.detect(video,gotResult);
        if(objects.length>0){
            if(objects[0].label=="person"){
                document.getElementById("status").innerHTML="status: baby detected";
                music.stop();
          fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+"  "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            }
            else{
                document.getElementById("status").innerHTML="status: baby not detected";
                music.play();
            }
        }
    }
}
function preload(){
    music=loadsound("grinch.mp3");
}
