song_1="";
song_2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scorerightWrist=0;
song1_status="";
song2_status="";

function preload()
{
    song_1 = loadSound('music1.mp3');
    song_2 = loadSound('music2.mp3');     
}

function setup()
{
    canvas= createCanvas(600,500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('poseNet is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0.2)
    {
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist= " + scoreLeftWrist);

        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        console.log("leftWristX= " + leftWristX + "leftWristY= " + leftWristY);

        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("rightWristX= " + rightWristX + "rightWristY= " + rightWristY);
    }
    
    if(results.length > 0.2)
    {
        console.log(results);
        scorerightWrist=results[0].pose.keypoints[10].score;
        console.log("scorerightWrist= " + scorerightWrist);

        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        console.log("leftWristX= " + leftWristX + "leftWristY= " + leftWristY);

        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("rightWristX= " + rightWristX + "rightWristY= " + rightWristY);
    }
    

}

function draw()
{
    image(video, 0, 0, 600, 500);
    
    song1_status= song_1.isPlaying();
    song2_status= song_2.isPlaying();

   fill('#FF0000');
    stroke('#FF0000');

    if(scorerightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song_2.stop();
        if(song1_status == false)
        {
            song_1.play();
            document.getElementById("song").innerHTML="Playing- Harry Potter Theme Song";
        }

    
    }

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song_1.stop();
        if(song2_status == false)
        {
            song_2.play();
            document.getElementById("song").innerHTML="Playing- Peter Pan Song";
        }

        
    }
}