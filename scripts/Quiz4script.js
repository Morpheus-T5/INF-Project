const questions = [
    {
        question: "What is one of the primary roles of AI in information systems?",
        answers: [
            {text: "Reducing human decision-making capabilities", correct: false},
            {text: "Increasing manual tasks for efficiency", correct: false},
            {text: "Enhancing capabilities of human decision-makers", correct: true},
            {text: "Ignoring diverse data sources", correct: false},
        ]
    },
    {
        question: "How does AI assist in automating repetitive and complex tasks in an accounting firm?",
        answers: [
            {text: "By scanning and extracting information from documents", correct: true},
            {text: "By introducing more errors in data processing", correct: false},
            {text: "By slowing down the task execution", correct: false},
            {text: "By generating manual reports", correct: false},
        ]
    },
    {
        question: "Which AI application is involved in the analysis and generation of natural language, allowing users to interact with data more intuitively?",
        answers: [
            {text: "Computer vision", correct: false},
            {text: "Machine learning", correct: false},
            {text: "Natural language processing (NLP)", correct: true},
            {text: "Data mining", correct: false},
        ]
    },
    {
        question: "In the context of decision-making, how does AI provide insights and predictions?",
        answers: [
            {text: "By ignoring large and complex datasets", correct: false},
            {text: "By relying solely on human intuition", correct: false},
            {text: "By avoiding statistical modeling", correct: false},
            {text: "By applying advanced techniques such as machine learning", correct: true},
        ]
    },
    {
        question: "What does computer vision, as a branch of AI, primarily deal with?",
        answers: [
            {text: "Processing and understanding of visual information", correct: true},
            {text: "Speech analysis and generation", correct: false},
            {text: "Sentiment analysis", correct: false},
            {text: "Text summarization", correct: false},
        ]
    },
    {
        question: "Which practical application of AI involves creating facial recognition, object detection, and image editing?",
        answers: [
            {text: "Machine learning", correct: false},
            {text: "Computer vision", correct: true},
            {text: "Natural language processing (NLP)", correct: false},
            {text: "Data mining", correct: false},
        ]
    },
    {
        question: "How can AI in information systems save time and improve accuracy in an accounting firm?",
        answers: [
            {text: "By introducing more manual tasks", correct: false},
            {text: "By slowing down task execution", correct: false},
            {text: "By automating the scanning and extraction of relevant information", correct: true},
            {text: "By generating complex reports", correct: false},
        ]
    },
    {
        question: "What branch of AI deals with the creation and application of algorithms that learn from data and improve their performance over time?",
        answers: [
            {text: "Natural language processing (NLP)", correct: false},
            {text: "Machine learning", correct: true},
            {text: "Computer vision", correct: false},
            {text: "Data mining", correct: false},
        ]
    },
    {
        question: "In the context of AI and decision-making, what role does machine learning play?",
        answers: [
            {text: "Improving performance over time by learning from data", correct: true},
            {text: "Creating barriers to effective decision-making", correct: false},
            {text: "Hindering the understanding of data", correct: false},
            {text: "Ignoring data patterns and trends", correct: false},
        ]
    },
    {
        question: "How can NLP be applied in information systems?",
        answers: [
            {text: "Creating facial recognition", correct: false},
            {text: "Processing and understanding visual information", correct: false},
            {text: "Creating recommendation systems", correct: false},
            {text: "Analyzing and generating natural language, such as text and speech", correct: true},
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