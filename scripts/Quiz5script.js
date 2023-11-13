const questions = [
    {
        question: "What is the first step in the process of information systems integration?",
        answers: [
            {text: "Implement and test the integration solution", correct: false},
            {text: "Assess the current state of information systems", correct: false},
            {text: "Define the objectives and scope of integration", correct: true},
            {text: "Design the integration solution", correct: false},
        ]
    },
    {
        question: "Why is it important to assess the current state of information systems during integration?",
        answers: [
            {text: "To slow down the integration process", correct: false},
            {text: "To identify opportunities and challenges", correct: true},
            {text: "To avoid any changes in the system", correct: false},
            {text: "To ignore existing gaps and overlaps", correct: false},
        ]
    },
    {
        question: "Which step involves choosing the type and method of integration, as well as the tools and technologies to support integration?",
        answers: [
            {text: "Define the objectives and scope of integration", correct: false},
            {text: "Assess the current state of information systems", correct: false},
            {text: "Design the integration solution", correct: true},
            {text: "Implement and test the integration solution", correct: false},
        ]
    },
    {
        question: "What does the \"type of integration\" refer to in the context of designing an integration solution?",
        answers: [
            {text: "The level of integration, such as data integration or application integration", correct: true},
            {text: "The industry standards", correct: false},
            {text: "The compatibility of systems", correct: false},
            {text: "The existing gaps and overlaps", correct: false},
        ]
    },
    {
        question: "What is the goal of implementing and testing the integration solution?",
        answers: [
            {text: "To slow down the operational stage", correct: false},
            {text: "To meet the requirements and expectations of integration", correct: true},
            {text: "To avoid any configuration of integration components", correct: false},
            {text: "To ignore any issues or errors that may arise", correct: false},
        ]
    },
    {
        question: "Why is monitoring and maintaining the integration solution important?",
        answers: [
            {text: "To slow down the integration process", correct: false},
            {text: "To avoid addressing problems or changes", correct: false},
            {text: "To ignore the evolving needs of the business", correct: false},
            {text: "To ensure the sustainability and improvement of integration", correct: true},
        ]
    },
    {
        question: "In the healthcare case of successful integration, what technology did the hospital group use to connect all their systems?",
        answers: [
            {text: "ETL tool", correct: false},
            {text: "API management platform", correct: false},
            {text: "Cloud-based platform", correct: true},
            {text: "Service-oriented architecture", correct: false},
        ]
    },
    {
        question: "What benefits did the retail store gain from using an API management platform for integration?",
        answers: [
            {text: "Increased costs and mistakes", correct: false},
            {text: "A smooth shopping experience for customers", correct: true},
            {text: "Challenges in managing stock", correct: false},
            {text: "Ignored data for marketing and sales", correct: false},
        ]
    },
    {
        question: "In the manufacturing case of successful integration, what tool did the industrial equipment maker use to connect their systems?",
        answers: [
            {text: "API management platform", correct: false},
            {text: "ETL tool", correct: true},
            {text: "Cloud-based platform", correct: false},
            {text: "Middleware", correct: false},
        ]
    },
    {
        question: "What did the successful integration in the manufacturing case help improve for the industrial equipment maker?",
        answers: [
            {text: "Slower product development", correct: false},
            {text: "Reduced quality of products", correct: false},
            {text: "Smoother product development and delivery", correct: true},
            {text: "Limited understanding of customers and partners", correct: false},
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