var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = 0;

//starting the game with first keydown
$(document).keydown(function(){
    if(!start){    
        $("h1").text("LEVEL " + level);
        nextSequence();
        start = 1;
    }
})

//to play sounds
function playSound(event){
    var audio = new Audio("./sounds/" + event + ".mp3");
    audio.play();
}

//to animate the pressed button
function animatePress(colour){
    $("#" + colour).addClass("pressed");

    setTimeout(function () {
        $("#" + colour).removeClass("pressed");
    },100);

};


//to create and animated the sequence
function nextSequence() {

    userClickedPattern = [];
    level++;
    $("h1").text("LEVEL " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

//to check which button is getting clicked
$('.btn').click(function(event){

    var userChosenColour = event.target.id; // $(this).attr("id");
    animatePress(userChosenColour);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);

    check(userClickedPattern.length-1);
});

//checking the patterns
function check(currentlvl){
    
    if(userClickedPattern[currentlvl] === gamePattern[currentlvl]){

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 500);
        }
    }
    
    else{
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        },250);

        $("h1").text("Game Over!! Press Any Key To Restart");

        start = 0;
        level = 0;
        userClickedPattern = [];
        gamePattern = [];
    }
}





