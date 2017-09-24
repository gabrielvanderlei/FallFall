var rect = 0;
var i = 0;
var time = 1300;
var playing = false;
var animation;
var score = 0;
var changing = 0;
var rotateSd = 0;
var leftRandom = 0;

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
    }

    $("<div>")
        .attr({
            "class": "rect",
            "data-top": -500,
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
                "left": $(this).attr("data-left") + "px"
            })
            .attr({
                "data-top": Number($(this).attr("data-top")) + 100
            })

            if (playing == true) {
                $("#gameBoard")
                .css({ "border-bottom": "15px solid white" });

                if ($(this).attr("data-top") >= (window.innerHeight + 80)) {
                    clearInterval(animation);
                    $(".rect").remove();
                    lose();
                    return false;
                }
            }
        });

    i++;
    if (time > 50) { time = time * 0.999;  $(".rect").css({ "transform": "scale(" + Math.sin(i) + ")" });}
    if (time < 400) { document.body.style.filter = "hue-rotate(" + i * 0.01 + "deg)"; }
    
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
    .css({ "display": "block", "opacity": 1 });

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
    $("#loseBoard")
    .css({ "display": "block", "opacity": 1,"z-index":400 });
    
    $("#gameBoard")
    .css({ "overflow": "hidden", "z-index":-1 });

    $("#score")
    .html(score);
}

function menu(){
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