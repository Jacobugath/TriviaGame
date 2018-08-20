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
            checkAnswer(this.innerHTML, data["results"][j]["correct_answer"]);
        });
        $("#category").html(data["results"][j]["category"]);
        $("#difficulty").html(data["results"][j]["difficulty"]);
        $(".answer").show();
        $("#scoreboard").show();
        $("button").hide();
        $("#info").hide();
        if (count >= 8) {
            $("button").show();
            $(".answer").hide();
            $("#question").html("Quiz complete good Job <br>");
            $("button").html("Play Again");
            clearInterval(interval);
            $("button").off("click");
            $("button").on("click", function() {
                $("button").off("click");
                $("button").on("click", next);
                correctAnswers = 0;
                wrongAnswers = 0;
                count = 0;
                displayQuestion(count);
            });
        }
        time.html(30);

        function checkAnswer(userGuess, correctAnswer) {
            count++;
            clearInterval(interval);
            $(".answer").hide();
            $("#scoreboard").hide();

            if (userGuess == correctAnswer) {
                correctAnswers++;
                $("#correct").html(correctAnswers);
                $("#question").html("RIGHT!<br> <Br> <br> <br> <br>");
                setTimeout(next, 1000);
            } else {
                wrongAnswers++;
                $("#wrong").html(wrongAnswers);
                $("#question").html("WRONG!");
                $("#info").show();
                $("#info").html(
                    "The correct answer was: " +
                        data["results"][j]["correct_answer"] +
                        "<br> <Br> <br> <br>    "
                );
                setTimeout(next, 1500);
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
        wrongAnswers++;
        $("#wrong").html(wrongAnswers);

        clearInterval(interval);
    } else {
        time.html(timenum - 1);
    }
}
