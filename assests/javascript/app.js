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
        q: "something?",
        a1: "pig",
        a2: "chicken",
        a3: "cat",
        a4: "dog",
        correctAnswer: "cat",
        gifCorrect: "https://i.giphy.com/media/WNJVp6owOFjBlO0e8w/giphy.webp",
        gifIncorrect: "https://i.giphy.com/media/WNJVp6owOFjBlO0e8w/giphy.webp"
    },
    {
        id: "question2",
        q: "something?",
        a1: "lemon",
        a2: "orange",
        a3: "tomato",
        a4: "apple",
        correctAnswer: "lemon",
        gifCorrect: "https://i.giphy.com/media/WNJVp6owOFjBlO0e8w/giphy.webp",
        gifIncorrect: "https://i.giphy.com/media/WNJVp6owOFjBlO0e8w/giphy.webp"
    },
    {
        id: "question3",
        q: "something?",
        a1: "LOL",
        a2: "Smite",
        a3: "DOTA",
        a4: "TFT",
        correctAnswer: "LOL",
        gifCorrect: "https://i.giphy.com/media/WNJVp6owOFjBlO0e8w/giphy.webp",
        gifIncorrect: "https://i.giphy.com/media/WNJVp6owOFjBlO0e8w/giphy.webp"
    },
    {
        id: "question4",
        q: "something?",
        a1: "basketball",
        a2: "football",
        a3: "golf",
        a4: "tennis",
        correctAnswer: "golf",
        gifCorrect: "https://i.giphy.com/media/WNJVp6owOFjBlO0e8w/giphy.webp",
        gifIncorrect: "https://i.giphy.com/media/WNJVp6owOFjBlO0e8w/giphy.webp"
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
}

function createQuestions(question, parentId) {
    let resultElement = "<div class='text-content' id='" + question.id + "'>";
    resultElement += "<span id='timer'>  </span>"
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
            dataElement += "<p>You got it right!</p>";
            dataElement += "<img src=" + question.gifCorrect + ">";
            break;
        case "incorrect":
            dataElement += "<p>Incorrect! The correct answer is " + question.correctAnswer + "</p>";
            dataElement += "<img src=" + question.gifIncorrect + ">";
            break;
        case "outOfTime":
            dataElement += "<p>You ran out of time! The correct answer is " + question.correctAnswer + "</p>";
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