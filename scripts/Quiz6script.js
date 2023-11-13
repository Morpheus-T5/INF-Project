const questions = [
    {
        question: "What is customization in the context of information systems?",
        answers: [
            {text: "Ignoring the needs of end-users", correct: false},
            {text: "Modifying software, databases, user interface, and integration to meet specific requirements", correct: true},
            {text: "Eliminating the testing phase for efficiency", correct: false},
            {text: "Avoiding the use of third-party solutions", correct: false},
        ]
    },
    {
        question: "What is one benefit of database customization?",
        answers: [
            {text: "Focus on addressing the needs and objectives of the organization", correct: true},
            {text: "Increased complexity in report design", correct: false},
            {text: "Ignoring specific requirements in report design", correct: false},
            {text: "Elimination of custom queries and reports", correct: false},
        ]
    },
    {
        question: "Why is user interface customization important in a business setting?",
        answers: [
            {text: "To limit access to resources for users", correct: false},
            {text: "To avoid any changes to the existing interfaces", correct: false},
            {text: "To enhance the user experience and usability", correct: true},
            {text: "To reduce the need for training development", correct: false},
        ]
    },
    {
        question: "What testing method involves inspecting smaller application segments for more efficient function?",
        answers: [
            {text: "Integration testing", correct: false},
            {text: "User acceptance testing", correct: false},
            {text: "Unit testing", correct: true},
            {text: "User interface testing", correct: false},
        ]
    },
    {
        question: "What is the purpose of user acceptance testing in the customization process?",
        answers: [
            {text: "To ensure the software works as planned", correct: true},
            {text: "To ignore errors in customized components", correct: false},
            {text: "To eliminate the need for training development", correct: false},
            {text: "To limit the scope of customization", correct: false},
        ]
    },
    {
        question: "What is integration in the context of information systems customization?",
        answers: [
            {text: "Ignoring the combination of different systems", correct: false},
            {text: "Avoiding the use of application programming interfaces", correct: false},
            {text: "Eliminating the need for data flow efficiency", correct: false},
            {text: "Combining different systems and applications with software tools", correct: true},
        ]
    },
    {
        question: "How can security be enhanced in customized information systems?",
        answers: [
            {text: "Ignoring software updates and attachments", correct: false},
            {text: "Regularly updating and attaching software parts", correct: true},
            {text: "Avoiding the identification of potential disadvantages", correct: false},
            {text: "Eliminating the need for security measures", correct: false},
        ]
    },
    {
        question: "What does scalability in information systems customization refer to?",
        answers: [
            {text: "Ignoring the impact on the whole system after customization", correct: false},
            {text: "Limiting the growth of the business", correct: false},
            {text: "Prioritizing IS requirements based on weight", correct: true},
            {text: "Eliminating the need for maintenance", correct: false},
        ]
    },
    {
        question: "Why is compliance important in a customized information system?",
        answers: [
            {text: "To manage risks and qualify for a specific industry", correct: true},
            {text: "To avoid industry standards and rules", correct: false},
            {text: "To limit business growth", correct: false},
            {text: "To eliminate the need for updates", correct: false},
        ]
    },
    {
        question: "What is a key aspect of maintenance in customized information systems?",
        answers: [
            {text: "Ignoring changes in the system", correct: false},
            {text: "Providing a disorganized schedule for maintaining changes", correct: false},
            {text: "Avoiding communication about changes in the system", correct: false},
            {text: "Aligning system requirements with the growth of the business", correct: true},
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