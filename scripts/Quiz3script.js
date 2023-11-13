const questions = [
    {
        question: "What is the primary focus of data ethics?",
        answers: [
            {text: "Evaluation of financial practices", correct: false},
            {text: "Evaluation of data practices impacting people and society", correct: true},
            {text: "Assessment of marketing strategies", correct: false},
            {text: "Analysis of political ideologies", correct: false},
        ]
    },
    {
        question: "Why is data ethics important in the modern age?",
        answers: [
            {text: "To increase the blurring of the line between private and public", correct: false},
            {text: "To maximize profits by selling personal information", correct: false},
            {text: "To protect the privacy and safety of individuals", correct: true},
            {text: "To eliminate the need for rules and regulations", correct: false},
        ]
    },
    {
        question: "Which regulation ensures that consumers have more control over personal information collected by businesses?",
        answers: [
            {text: "EU's General Data Protection Regulation", correct: true},
            {text: "California's CCPA", correct: false},
            {text: "Harvard's Data Transparency Act", correct: false},
            {text: "Amazon's Privacy Policy", correct: false},
        ]
    },
    {
        question: "What major issue did Amazon face with its hiring algorithm?",
        answers: [
            {text: "Hiring more women than men", correct: false},
            {text: "Bias resulting in hiring more men than women", correct: true},
            {text: "Perfectly unbiased hiring outcomes", correct: false},
            {text: "No impact on the hiring process", correct: false},
        ]
    },
    {
        question: "In 2018, what did research reveal about facial recognition algorithms?",
        answers: [
            {text: "They perform equally well on all skin tones", correct: false},
            {text: "They are not used for law enforcement", correct: false},
            {text: "They have no error rates", correct: false},
            {text: "They perform worse on dark-skinned females", correct: true},
        ]
    },
    {
        question: "What was Uber's \"god-mode\" used for in 2014?",
        answers: [
            {text: "Tracking individuals, including celebrities and politicians", correct: true},
            {text: "Enhancing user experience", correct: false},
            {text: "Implementing cybersecurity measures", correct: false},
            {text: "Improving hiring algorithms", correct: false},
        ]
    },
    {
        question: "What did Uber try to cover up in October 2016?",
        answers: [
            {text: "A massive cybersecurity attack", correct: true},
            {text: "A new feature for users", correct: false},
            {text: "A change in leadership", correct: false},
            {text: "A merger with a competitor", correct: false},
        ]
    },
    {
        question: "What is the essential aim of the principles of big data ethics?",
        answers: [
            {text: "To maximize financial gains", correct: false},
            {text: "To translate basic human rights into the digital age", correct: true},
            {text: "To create biased algorithms", correct: false},
            {text: "To eliminate transparency in data practices", correct: false},
        ]
    },
    {
        question: "What does the principle of transparency in big data ethics involve?",
        answers: [
            {text: "Keeping data practices secret", correct: false},
            {text: "Avoiding accountability for data leaks", correct: false},
            {text: "Ignoring user agency in data control", correct: false},
            {text: "Clear communication about data gathering and usage", correct: true},
        ]
    },
    {
        question: "What is one business benefit of implementing data ethics?",
        answers: [
            {text: "Increased unintended bias", correct: false},
            {text: "Decreased transparency", correct: false},
            {text: "Enhanced reputation and brand value", correct: true},
            {text: "Ignoring data privacy compliance", correct: false},
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