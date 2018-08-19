var interval;
var correctAnswers = 0;
var wrongAnswers = 0;
var count = 0;
var audio = new Audio(
    "http://www.freesfx.co.uk/rx2/mp3s/4/16405_1460641087.mp3"
);
$("button").on("click", next);
var time = $("#time");
var userAnswer;
function next() {
    displayQuestion(count);
}

function displayQuestion(j) {
    $.getJSON("https://opentdb.com/api.php?amount=10&type=multiple", {
        format: "json"
    }).done(function(data) {
        console.table(data);

        var answers = [
            data["results"][j]["correct_answer"],
            data["results"][j]["incorrect_answers"][0],
            data["results"][j]["incorrect_answers"][1],
            data["results"][j]["incorrect_answers"][2]
        ];
        function populate() {
            $("#correct").html(correctAnswers);
            $("#wrong").html(wrongAnswers);
            $("#question").html(data["results"][j]["question"]);
            var i = Math.floor(Math.random() * 4);

            $("#answer1").html(answers[i]);
            answers.splice(i, 1);
            i = Math.floor(Math.random() * 3);
            $("#answer2").html(answers[i]);
            answers.splice(i, 1);
            i = Math.floor(Math.random() * 2);
            $("#answer3").html(answers[i]);
            answers.splice(i, 1);

            $("#answer4").text(answers[0]);
            $(".answer").off("click");
            $(".answer").on("click", function() {
                console.log("clicked");
                checkAnswer(
                    this.innerHTML,
                    data["results"][j]["correct_answer"]
                );
            });
            $("#category").html(data["results"][j]["category"]);
            $("#difficulty").html(data["results"][j]["difficulty"]);
            $(".answer").show();
            $("#scoreboard").show();
            $("button").hide();
            $("#info").hide();
            time.html(30);
        }
        setTimeout(populate, 1000);

        function checkAnswer(userGuess, correctAnswer) {
            count++;
            console.log("made it to function");
            clearInterval(interval);
            $(".answer").hide();
            $("#scoreboard").hide();

            if (count >= 8) {
                $("button").show();
                $("#question").html("Quiz complete good Job");
                $("button").html("Play Again");
                $("button").on("click", function() {
                    location.reload();
                });
            } else if (userGuess == correctAnswer) {
                console.log("right");
                correctAnswers++;
                $("#correct").html(correctAnswers);
                $("#question").html("RIGHT!");
                setTimeout(next, 500);
            } else {
                console.log("wrong");
                wrongAnswers++;
                $("#wrong").html(wrongAnswers);
                $("#question").html("WRONG!");
                $("#info").show();
                $("#info").html(
                    "The correct answer was: " +
                        data["results"][j]["correct_answer"]
                );
                setTimeout(next, 100);
            }
        }

        interval = setInterval(timer, 1000);
    });
}

function timer() {
    var timenum = document.getElementById("time").innerHTML;
    if (timenum <= 0) {
        count++;
        $(".answer").hide();
        $("#scoreboard").hide();
        $("button").show();
        $("#question").html("Times Up");
        time.html("TIMES UP!");
        console.log("wrong");
        wrongAnswers++;
        $("#wrong").html(wrongAnswers);

        clearInterval(interval);
    } else {
        time.html(timenum - 1);
    }
}
