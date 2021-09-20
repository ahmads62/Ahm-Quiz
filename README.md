# Ahm-Quiz

## Description
This week’s Challenge invites you to build a timed coding quiz with multiple-choice questions. This app will run in the browser, and will feature dynamically updated HTML and CSS powered by JavaScript code that you write. It will have a clean, polished, and responsive user interface. This week’s coursework will teach you all the skills you need to succeed in this assignment.

## User Story
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers

## Acceptance Criteria 
*   GIVEN I am taking a code quiz
    *   WHEN I click the start button
        *   THEN a timer starts and I am presented with a question
    *   WHEN I answer a question
        *   THEN I am presented with another question
    *   WHEN I answer a question incorrectly
        *   THEN time is subtracted from the clock
    *   WHEN all questions are answered or the timer reaches 0
        *   THEN the game is over
    *   WHEN the game is over
        *   THEN I can save my initials and score
    
### Tasks Accomplished to achieve the acceptance criteria 
*   1 used array objects to store questions and answer
*   2 created multiple section in index.html to show different state of the quiz
*   3 develop quiz.js and added three key function:
    *   getQuestions() get the next question from the array and build answer options
    *   questionClick() when user click on the options it vlidates answer add / subtract score and time
    *   quizEnd() Ask user to type in initials Added a validation to makeusre initial exists, initials and scores are saved in localstorage     
*   4 User can view the highscores by clicking on the View High Score
*   5 User can remove the highscore by clikcing on Clear High Score button on highscore page    
*   6 Added media query for smaller screens.

### Desktop Screen Images
Main Pages / Header / Body / Footer
![Main](./assets/pic/QuizMain.jpg?raw=true "Main Pages / Header / Body / Footer")
User Input
![Quiz-1](./assets/pic/Quiz-1.jpg?raw=true "Quiz in Progress")
![Quiz-2](./assets/pic/Quiz-2.jpg?raw=true "Quiz End")
HighScores Page
![HighScore](./assets/pic/Highscores.jpg?raw=true "High Scores")

### Links
* Code Repository Link  (https://github.com/ahmads62/Ahm-Quiz)
* Deployed Website Link (https://ahmads62.github.io/Ahm-Quiz/index.html)

## Installation
Upload index.html, and assets folder, assets folder contains JS and CSS folder and releated files.