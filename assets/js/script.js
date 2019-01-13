var rect = 0;
var i = 0;
var time = 1300;
var playing = false;
var animation;
var score = 0;
var changing = 0;
var rotateSd = 0;
var leftRandom = 0;
var velocity = 100;
var difficult = 0;
var verify = 0;

function onDeviceReady() {
    document.removeEventListener('deviceready', onDeviceReady, false);
      alert('Anúncios configurados.');
    
      // Set AdMobAds options:
    admob.setOptions({
      publisherId:          "NONE",                                    // Replace with your AdMob id (if you don't have any, set it to "NONE")
      tappxIdiOS:           "NONE",            // Replace with your Tappx Id for iOS
      tappxIdAndroid:       "pub-45642-android-4249",        // Replace with your Tappx Id for Android
      tappxShare:           1                                          // Do not use lower tappxShare ratio if you have set publixherId to "NONE"
    });

    // Start showing banners (will show atomatically as autoShowBanner is set to true by default)
    admob.createBannerView();

    // Request interstitial (will present automatically as autoShowInterstitial is set to true by default)
    admob.requestInterstitial();
  }
  
document.addEventListener("deviceready", onDeviceReady, false);

function anim() {
    return setInterval(load, time);
}

$(function () {
    animation = anim();
});
 

function load() {

    if(window.innerHeight > window.innerWidth){
        leftRandom = window.innerWidth * 0.6 * Math.random();
    }

    else{
        leftRandom = window.innerHeight * 0.6 * Math.random();
    }

    if(playing == false){
        leftRandom = window.innerWidth * Math.random();
        leftRandom = leftRandom - window.innerWidth * 0.2;
    }

    $("<div>")
        .attr({
            "class": "rect",
            "data-top": -120,
            "data-left": leftRandom
        })

        .appendTo("#game")
        .on("touchstart touchend mouseover", function() {
            $(this).remove();
            if (playing == true) {
                score++;
                $("#score").html(score);

                if (score % 10 == 0) { changing = 1; }
                if (score % 3 == 0) { rotateSd++; }
            }   
         });

        $(".rect")
        .each(function () {
            $(this)
            .css({
                "top": $(this).attr("data-top") + "px",
                "left": $(this).attr("data-left") + "px",
                "opacity": ((playing)?(1):(0.6))
            })
            .attr({
                "data-top": Number($(this).attr("data-top")) + velocity
            })

            if (playing == true) {
                difficult++;

                console.log(difficult);
                switch(difficult){
                    case 1: velocity = 100; break;
                    case 2: velocity = 125; break;
                    case 3: velocity = 170; break;
                    case 5: velocity = 200; break;
                    case 11: velocity = 225; break;
                    case 22: velocity = 280; break;
                    case 44: velocity = 320; break;
                    case 88: velocity = 340; break;
                    case 88*2: velocity = 500; break;
                }

                $("#gameBoard")
                .css({ "border-bottom": "15px solid white" });


                if ($(this).attr("data-top") >= (window.innerHeight + 560)) {
                    clearInterval(animation);
                    $(".rect").remove();
                    lose();
                    
                    return false;
                }
            }
        });

    i++;

    if (time > 500) { 
        if(score <= 100){time = time * 0.999999;}
        else{time = (time - (score / 10));}  
        
        $(".rect").css({ 
            "transform": "scale(" + Math.sin(i) + ")" });
    }

    if (time < 700) { document.body.style.filter = "hue-rotate(" + i * 0.01 + "deg)"; }
    
    if(rotateSd % 2 == 0){
        rotateDeg = 0.5;
    }

    else{
        rotateDeg = 0;
    }

    if (playing == true) {
        $("#gameBoard").css({
            "transform": "rotate(" + (rotateSd * 30) + "deg) scale(" + (0.8 - rotateDeg) + ")"
        });
    }



    if(changing == 1){
        var bodyColor = "rgb("
            + Math.round(Math.random() * 255) + ","
            + Math.round(Math.random() * 255) + ","
            + Math.round(Math.random() * 255) + ")";

        var rectColor = "rgb("
            + Math.round(Math.random() * 255) + ","
            + Math.round(Math.random() * 255) + ","
            + Math.round(Math.random() * 255) + ")";

        $("body").css({
            "background": bodyColor
        });
        
        $("*").css({
            "border-color": rectColor
        });

        changing = 0;
    }

    clearInterval(animation);
    animation = setInterval(load, time);
}

function play(){

    $(".board").css("border-color", "white");

    score = 0;
    playing = true;
    clearInterval(animation);
    $("#loseBoard")
    .css({ "display": "none", "opacity": 0, "z-index": -1 });

    $("#mainBoard")
    .css({ "opacity": 0, "z-index": -1 });

    $("#gameBoard")
    .css({ "overflow": "hidden", "z-index": 400 });
    
    $("#alertBoard")
    .css({ "display": "block", "opacity": 1, "border": "none"});

    $(".rect").remove();
    animation = anim();
    
    $("#gameBoard").css({
        "transform": "rotate(0deg)"
    });

    $("body").css({
        "background": "rgb(20, 20, 20)"
    })

    rotateSd = 0;
    $("#score").html(0);
}

function lose(){
    playing = false;
    difficult = 0;

    $("#loseBoard")
    .css({ "display": "block", "opacity": 1,"z-index":400, "border": "none" });
    
    $("#gameBoard")
    .css({ "overflow": "hidden", "z-index":-1 });

    $("#score")
    .html(score);
}

function menu(){
    $(".board").css("border-color", "transparent");
    rotateSd = 0;

    $("#gameBoard").css({
        "transform": "rotate(0deg)"
    });

    $("body").css({
        "background": "rgb(20, 20, 20)"
    })

    
    $("#alertBoard")
    .css({"opacity": 0 });

    $("#loseBoard")
    .css({ "display": "none", "opacity": 0 });
    
    $("#mainBoard")
    .css({ "opacity": 1, "z-index": 30 });

    $("#gameBoard")
    .css({ "overflow": "", "z-index":20, "border-bottom": "none" });
    
}

//