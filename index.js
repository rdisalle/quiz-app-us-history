//questions database
const STORE = {
    questions: [
    {
        question: 'What is the name of the ship that brought the Pilgrims to America?',
        answers: [
            'Discovery',
            'Mayflower',
            'Speedwell',
            'Godspeed'
        ],
        correctAnswer: 'Mayflower'
    },
    {  question: 'What battle is considered the turning point of the American Revolution?',
        answers: [
            'Battle of Fort Sumter',
            'Battle of Saratoga',
            'Battle of Gettysburg',
            'Battle of Trenton',
            ],
        correctAnswer: 'Battle of Saratoga'
    },
    {   question: 'What year was the Boston Massacre?',
        answers: [
            '1770',
            '1772',
            '1774',
            '1776'
        ],
        correctAnswer: '1770'
    },
    {   question: 'Name the Founding Father who was the leader of the Sons of Liberty?',
        answers: [
            'John Adams',
            'Patrick Henry',
            'Samuel Adams',
            'John Jay',
        ],
        correctAnswer: 'Samuel Adams'
    },
    {   question: 'Who was the first president to live in the White House?',
        answers: [
            'John Adams',
            'Thomas Jefferson',
            'George Washington',
            'James Madison'
        ],
        correctAnswer: 'John Adams'
    },
    {   question: 'What political party formed in 1834 from anti-Andrew Jackson forces?',
        answers: [
            'Federalist',
            'Whig',
            'Libertarian',
            'Democratic Republican'
        ],
        correctAnswer: 'Whig'
    },
    {   question: 'What act gave settlers 160 acres of land if they agreed to live on it for five years?',
        answers: [
            'Public Lands Act',
            'Homestead Act',
            'Dawes Severalty Act',
            'Land Act'
        ],
        correctAnswer: 'Homestead Act'
    },
    {   question: 'Who was the confederate president during the Civil War?',
        answers: [
            'Abraham Lincoln',
            'Jefferson Davis',
            'Stonewall Jackson',
            'James Waddell'
         ],
        correctAnswer: 'Jefferson Davis'
    },
    {   question: 'What year did the Great Depression start?',
        answers: [
            '1905',
            '1919',
            '1929',
            '1941'
        ],  
        correctAnswer: '1929'
    },
    {   question: 'Which president used the phrase “speak softly and carry a big stick?',
        answers: [
            'Theodore Roosevelt',
            'James Polk',
            'Franklin D. Roosevelt',
            'Harry Truman'
        ],
        correctAnswer: 'Theodore Roosevelt'
}
],
questionCounter: 0,
score: 0
}

//increase questionCounter value by 1
    //display question increase
function updateQuestionCounter() {
    STORE.questionCounter++;
    $('.questionCounter').text(STORE.questionCounter + 1);
}

//increase score value by 1
    //display scores increase 
function updateScore() {
    STORE.score++;
    $('.score').text(STORE.score);
}

//generate question
    //generate question and answers to screen
    //update question number
function generateQuestion() {
    if (STORE.questionCounter < STORE.questions.length) {
        return createQ(STORE.questionCounter); 
    }
    else {
        $('.question.box').hide();
        $('.questionCounter').text(10);
        finalScore();
    }
}

//creates html for question form
function createQ(questionIndex) {
    let formMaker = $(`<form>
      <fieldset>
        <legend class="questionText">${STORE.questions[questionIndex].question}</legend>
      </fieldset>
    </form>`)
  
    let fieldSelector = $(formMaker).find('fieldset');
  
    STORE.questions[questionIndex].answers.forEach(function (answerValue, answerIndex) {
      $(`<label for="${answerIndex}">
          <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
          <span>${answerValue}</span>
        </label>
        `).appendTo(fieldSelector);
    });
    $(`<button class="submitButton button">Submit</button>`).appendTo(fieldSelector);
    return formMaker;
  }

//Start quiz
    //generate question
    //update to #/10
    //update start button to submit button
function startQuiz() {
    $('.altBox').hide();
    $('.introBox').on('click', '.startButton', function(event) {
        $('.introBox').hide();
        $('.questionCounter').text(1);
        $('.questionBox').show();
        $('.questionBox').prepend(generateQuestion());
    } );
}


//submit answer
    //submits chosen answer
    //compares answer to the correct answer 
    //returns message based on if correct or not
function submitAnswer() {
    $('.overallBox').on('submit', function(event) {
        event.preventDefault();
        $('.altBox').hide();
        $('.answerFeedback').show();
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = STORE.questions[STORE.questionCounter].correctAnswer;
        if (answer === correct) {
            correctAnswer();
        }
        else {
            wrongAnswer();
        }
    });
}

//correct answer
    //display message if answer is correct
    //update score
function correctAnswer() {
    $('.answerFeedback').html(
        `<h3>You are correct!</h3>
        <img src="pictures/correct-pic.jpg" alt="Uncle Sam" class="images">
            <p>Great job! You got the answer right!</p>
        <button class="nextButton button">Next</button>`
    );
    updateScore();
}

//wrong answer
    //display message if incorrect
    //display correct answer
function wrongAnswer() {
    $('.answerFeedback').html(
        `<h3>Incorrect!<h3>
        <img src="pictures/wrong-pic.jpg" alt="Red X" class="images">
            <p>Sorry, but the answer is:<p>
            <p>${STORE.questions[STORE.questionCounter].correctAnswer}<p>
        <button class="nextButton button">Next</button>`
    );
}

//next question
    //generates next question in quiz order
function nextQuestion() {
    $('.overallBox').on('click', '.nextButton', function(event) {
        $('.altBox').hide();
        $('.questionBox').show();
        updateQuestionCounter();
        $('.questionBox form').replaceWith(generateQuestion());
    });
}

//final score screen
    //display final score out of 10
    //displays message based on score
function finalScore() {
    $('.altBox').hide();
    $('.quizResults').show();

    const passed = [
      'Great job!',
      'pictures/ending-pic.jpg',
      'American Flag',
      'You Passed!'
    ];
      
    const failed = [
      'Sorry, you failed',
      'pictures/ending-pic.jpg',
      'American Flag',
      'Please try again!'
    ];
      
    if (STORE.score >= 7) {
      array = passed;
    } else {
      array = failed;
    }
    return $('.quizResults').html(
      `<h3>${array[0]}</h3>
          <img src="${array[1]}" alt="${array[2]}" class="images">
          <h3>Your score is ${STORE.score} / 10</h3>
          <button class="restartButton button">Restart</button>`
    );
  }

//reset all stats to start quiz over
function resetStats() {
     STORE.questionCounter = 0;
     STORE.score = 0;
     $('.questionCounter').text(0);
     $('.score').text(0);
}
      
//restart quiz
  //takes you back to start screen of quiz
function restartQuiz() {
    $('.overallBox').on('click', '.restartButton', function(event) {
        event.preventDefault();
        resetStats();
        $('.altBox').hide();
        $('.introBox').show();
    });     
 }

//runs functions
function makeQuiz() {
    startQuiz();
    submitAnswer();
    nextQuestion();
    restartQuiz();
}

$(makeQuiz);