//Global Variables
gameOver = false;
let rightAnswers = ["cat", "LOL", "lemon", "golf"]
let results =
{
    id: "results",
    closingText: "All done, here is how you did!",
    correctAnswers: 0,
    incorrectAnswers: 0,
    unanswered: 0,
}

let questions = [
    {
        id: "question1",
        q: "something?",
        a1: "pig",
        a2: "chicken",
        a3: "cat",
        a4: "dog",
    },
    {
        id: "question2",
        q: "something?",
        a1: "lemon",
        a2: "orange",
        a3: "tomato",
        a4: "apple",

    },

    {
        id: "question3",
        q: "something?",
        a1: "LOL",
        a2: "Smite",
        a3: "DOTA",
        a4: "TFT",
    },
    {
        id: "question4",
        q: "something?",
        a1: "basketball",
        a2: "football",
        a3: "golf",
        a4: "tennis",
    }


];



function questionSelection() {
    let randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    let question = randomQuestion;
    createQuestions(randomQuestion, "questions")
    for (let i = 0; i < questions.length; i++) {
        if (questions[i] === randomQuestion) {
            questions.splice(i, 1);
        }
    }
    console.log(questions)
}





function createQuestions(question, parentId) {
    if (questions.length === 0) {
        endGame()
        return
    }
    else {
        let time= 30;
        let resultElement = "<div class='text-content' id='" + question.id + "'>";
        resultElement+= "<span id='timer'>  </span>"
        resultElement += "<h3> " + question.q + "</h3>";
        resultElement += "<div class='answers'>"
        resultElement += "<p id='q1'>" + question.a1 + "</p>";
        resultElement += "<p id='q1'>" + question.a2 + "</p>";
        resultElement += "<p id='q1'>" + question.a3 + "</p>";
        resultElement += "<p id='q1'>" + question.a4 + "</p>";
        resultElement += "</div>"
        resultElement += "</div>";
        $("#" + parentId).append(resultElement);

        let timer = function(x) {
            let check= false;
            if(x === 0) {
                results.unanswered++;
                
                questionSelection()
                $("#"+question.id).empty();
                check= true;
               return;
            }
           
           $("#timer").html(x)
            return setTimeout(() => {timer(--x)}, 1000)
           }
           
           timer(5);



        $("#question.id").on("click", "#q1", function () {
            $(this)[0]
            let answerPicked = [];
            let text = $(this).text();
            answerPicked.push(text)
            console.log(answerPicked)

            found = false;
            for (let i = 0; i < rightAnswers.length; i++) {
                if (text === rightAnswers[i]) {
                    
                    found = true;
                    results.correctAnswers++
                    console.log(results.correctAnswers)
                    console.log(rightAnswers)
                    break;
                }
            }
            if (found===false) {
                results.incorrectAnswers++
            }

        })
    }
}



function createClosingPage(result, parentId) {
    let resultElement = "<div class='text-content' id='" + result.id + "'>";
    resultElement += "<p> " + result.closingText + "</p>";
    resultElement += "<p> Correct Answers:" + result.correctAnswers + "</p>";
    resultElement += "<p> Incorrect Answers:" + result.incorrectAnswers + "</p>";
    resultElement += "<p>Unanswered:" + result.unanswered + "</p>";
    resultElement += "</div>";
    $("#" + parentId).append(resultElement);
}



$("#start").on("click", function () {
    $("#start").css("display", "none")
    questionSelection();


});

$("#questions").on("click", function () {
    $(this).empty();
    questionSelection()
    if (questions.lenght === 0) {
        createClosingPage(results, "questions")
    }
})

function endGame() {

    createClosingPage(results, "questions")

}







