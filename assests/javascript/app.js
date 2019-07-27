//Global Variables
let results = {
    id: "results",
    closingText: "All done, here is how you did!",
    correctAnswers: 0,
    incorrectAnswers: 0,
    unanswered: 0
};

let allQuestions = [
    {
        id: "question1",
        q: "Who are the author's of the miniseries Deadpool Kills the Marvel Universe?",
        a1: "Alan Moore and Neil Gaiman",
        a2: "Cullen Bunn and Dalibor Talajić's",
        a3: "Warren Ellis and Stan Lee",
        a4: "Jack Kirby",
        correctAnswer: "Cullen Bunn and Dalibor Talajić's",
        gifCorrect: "https://i.giphy.com/media/l0MYDGA3Du1hBR4xG/giphy.webp",
        gifIncorrect: "https://i.giphy.com/media/yvBAuESRTsETqNFlEl/giphy.webp"
    },
    {
        id: "question2",
        q: "Who was the Batman in Flashpoint?",
        a1: "Bruce Wayne",
        a2: "The Joker",
        a3: "Alfred",
        a4: "Thomas Wayne",
        correctAnswer: "Thomas Wayne",
        gifCorrect: "https://i.giphy.com/media/PSByJSyJmNep2/giphy.webp",
        gifIncorrect: "https://i.giphy.com/media/wt2lezbcFW9qg/giphy.webp"
    },
    {
        id: "question3",
        q: "What is the name of the DC MOBA game?",
        a1: "Infinite Crisis",
        a2: "DC MOBA",
        a3: "Justice League",
        a4: "League of Legends",
        correctAnswer: "Infinite Crisis",
        gifCorrect: "https://i.giphy.com/media/3osxYp14leBym7WiVa/giphy.webp",
        gifIncorrect: "https://i.giphy.com/media/DmWeptBrmLYUU/giphy.webp"
    },
    {
        id: "question4",
        q: "Who is the most powerful Mutant?",
        a1: "Dark Phoenix",
        a2: "Professor X",
        a3: "Santa",
        a4: "Wolverine",
        correctAnswer: "Santa",
        gifCorrect: "https://i.giphy.com/media/EBCzEAdeUvPTDTjbyR/giphy.webp",
        gifIncorrect: "https://i.giphy.com/media/9LIzdSmzvq8vu/giphy.webp"
    }
];
let questions = $.extend(true, [], allQuestions);

function questionSelection() {
    if (questions.length !== 0) {
        let randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        createQuestions(randomQuestion, "questions")
        for (let i = 0; i < questions.length; i++) {
            if (questions[i] === randomQuestion) {
                questions.splice(i, 1);
            }
        }
    }
    else {
        endGame();
    }
}


function createQuestions(question, parentId) {
    let resultElement = "<div class='text-content' id='" + question.id + "'>";
    resultElement += "<div id='timer'>  </div>"
    resultElement += "<h3> " + question.q + "</h3>";
    resultElement += "<div class='answers'>"
    resultElement += "<p class='q1'>" + question.a1 + "</p>";
    resultElement += "<p class='q1'>" + question.a2 + "</p>";
    resultElement += "<p class='q1'>" + question.a3 + "</p>";
    resultElement += "<p class='q1'>" + question.a4 + "</p>";
    resultElement += "</div>";
    resultElement += "</div>";
    $("#" + parentId).append(resultElement);

    let timeLeft = 30;
    $("#timer").html(timeLeft);
    let countDown = setInterval(function () {
        timeLeft -= 1;
        $("#timer").html(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(countDown);
            results.unanswered++;
            $("#" + question.id).remove();
            createQuestionData("outOfTime", question);
        }
    }, 1000);

    $("#" + question.id).on("click", ".q1", function () {
        let text = $(this).text();

        if (text === question.correctAnswer) {
            results.correctAnswers++;
            createQuestionData("correct", question);
        } else {
            results.incorrectAnswers++;
            createQuestionData("incorrect", question);
        }
        clearInterval(countDown);
        $("#" + question.id).remove();
    });
}

function createQuestionData(state, question) {
    let dataElement = "<div class='text-content''>";
    switch (state) {
        case "correct":
            dataElement += "<p class='inform'>You got it right!</p>";
            dataElement += "<img src=" + question.gifCorrect + ">";
            break;
        case "incorrect":
            dataElement += "<p class='inform'>Incorrect! The correct answer is " + question.correctAnswer + "</p>";
            dataElement += "<img src=" + question.gifIncorrect + ">";
            break;
        case "outOfTime":
            dataElement += "<p class='inform'>You ran out of time! The correct answer is " + question.correctAnswer + "</p>";
            dataElement += "<img src=" + question.gifIncorrect + ">";
            break;
    }
    dataElement += "</div>";
    $("#questionData").append(dataElement);

    let timeLeft = 3;
    let countDown = setInterval(function () {
        timeLeft -= 1;
        if (timeLeft <= 0) {
            clearInterval(countDown);
            $("#questionData").empty();
            questionSelection();
        }
    }, 1000);
}

function createClosingPage(result, parentId) {
    let resultElement = "<div class='text-content' id='" + result.id + "'>";
    resultElement += "<p>" + result.closingText + "</p>";
    resultElement += "<p>Correct Answers: " + result.correctAnswers + "</p>";
    resultElement += "<p>Incorrect Answers: " + result.incorrectAnswers + "</p>";
    resultElement += "<p>Unanswered: " + result.unanswered + "</p>";
    resultElement += "<button id='reset'>Reset</button>";
    resultElement += "</div>";
    $("#" + parentId).append(resultElement);
}

$("#start").on("click", function () {
    $("#start").css("display", "none");
    questionSelection();
});

$("#finalResults").on("click", "#reset", function () {
    $("#finalResults").empty();
    questions = $.extend(true, [], allQuestions);
    results.unanswered = 0;
    results.incorrectAnswers = 0;
    results.correctAnswers = 0;
    questionSelection();
});

function endGame() {
    createClosingPage(results, "finalResults");
}