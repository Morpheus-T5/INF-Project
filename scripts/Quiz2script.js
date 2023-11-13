const questions = [
    {
        question: "What does information quality primarily refer to?",
        answers: [
            {text: "The quantity of information available", correct: false},
            {text: "The degree to which information is accurate, reliable, relevant, timely, and complete", correct: true},
            {text: "The popularity of information sources", correct: false},
            {text: "The complexity of information structures", correct: false},
        ]
    },
    {
        question: "Which of the following is NOT a criterion for information quality?",
        answers: [
            {text: "Uniqueness", correct: true},
            {text: "Accuracy", correct: false},
            {text: "Timeliness", correct: false},
            {text: "Completeness", correct: false},
        ]
    },
    {
        question: "What does the criterion of reliability in information quality imply?",
        answers: [
            {text: "Information should be error-free", correct: false},
            {text: "Information should be up-to-date", correct: false},
            {text: "Information should be suitable to the topic at hand", correct: false},
            {text: "Information should be accurate and consistent over time", correct: true},
        ]
    },
    {
        question: "In information quality, what does timeliness refer to?",
        answers: [
            {text: "The speed at which information is gathered", correct: false},
            {text: "The availability of information for its intended use", correct: true},
            {text: "The relevance of information to the topic", correct: false},
            {text: "The consistency of information over time", correct: false},
        ]
    },
    {
        question: "What does completeness ensure in information quality?",
        answers: [
            {text: "Information reflects the meaning of data", correct: false},
            {text: "Information is free from mistakes", correct: false},
            {text: "Information gives a full picture of reality", correct: true},
            {text: "Information is suitable to the topic at hand", correct: false},
        ]
    },
    {
        question: "What is the evaluation method that ensures an information system meets its intended goals?",
        answers: [
            {text: "Formative evaluation", correct: false},
            {text: "Summative evaluation", correct: false},
            {text: "Criteria-based evaluation", correct: false},
            {text: "Goal-based evaluation", correct: true},
        ]
    },
    {
        question: "Which evaluation method involves testing a new software application with users to identify usability issues?",
        answers: [
            {text: "Formative evaluation", correct: true},
            {text: "Summative evaluation", correct: false},
            {text: "Criteria-based evaluation", correct: false},
            {text: "Goal-based evaluation", correct: false},
        ]
    },
    {
        question: "What does goal-free evaluation involve?",
        answers: [
            {text: "Evaluating an information system during its development without clear goals", correct: false},
            {text: "Evaluating an information system after being implemented", correct: false},
            {text: "Evaluating an information system based on user goals", correct: false},
            {text: "Evaluating an information system based on predefined criteria", correct: true},
        ]
    },
    {
        question: "Which resource is commonly used for evaluating websites using the CRAAP Test?",
        answers: [
            {text: "Snopes", correct: false},
            {text: "CRAAP Test Worksheet", correct: true},
            {text: "QuestionPro", correct: false},
            {text: "whiterose.ac.uk", correct: false},
        ]
    },
    {
        question: "What does Snopes primarily focus on?",
        answers: [
            {text: "Summative evaluation of websites", correct: false},
            {text: "Goal-based evaluation of information systems", correct: false},
            {text: "Fact-checking and debunking rumors", correct: true},
            {text: "Criteria-based evaluation of information quality", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const SelectedBtn = e.target;
    const isCorrect =SelectedBtn.dataset.correct === "true";
    if(isCorrect){
        SelectedBtn.classList.add("correct");
        score++;
    }
    else{
        SelectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach( button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();