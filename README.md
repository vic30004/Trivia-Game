# Super Hero Trivia-Game


This is a simple trivia game that will ask the user questions about super heros. 


Once you start the game, you will have 30 seconds to answer a question. Once you select an answer the content will update and it will let the user know if you selected the correct answer. If you run out of the time, the content will update and it will provide the user with the correct answer. At the end of the game, the score will be displayed and the user will be able to reset the game. 

What was used to create this game:

Html
CSS
Javascript
Jquery 


How the game works

The questions, answers, gifs and results are all stored in object. My code pretty much grabs this information and creates the each page. 

The questions are being selected randomly, and once they are selected they are being removed from the object. Once there are no more questions left in the object, the game will display the results and end the game. 


Challenges:

One of the main challenges was getting the timer to work properly. Everytime I clicked an answer, the content on the page reset, but the timer did not. There were two timers running on top of each other and once the timer ran out of time, it was calling a function. I was able to figure out that what I was missing was just a simple clearInterval function. Once I adjusted my code everything worked fine. 

This was a good way to understand how to manipulate the DOM and how specificty works as well. I was able to notice how certain code won't work if it's being called outside the function, so placement was key. 

Overall this was a fun challenge, and it helped better understand objects, timers, and specificity. 
