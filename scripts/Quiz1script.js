const questions = [
    {
        question: "What is the primary purpose of data visualization in a business context?",
        answers: [
            {text: "To confuse employees with complex graphics", correct: false},
            {text: "To limit communication between individuals in the organization", correct: false},
            {text: "To provide efficient ideas for achieving business objectives", correct: true},
            {text: "To replace existing trends with new patterns", correct: false},
        ]
    },
    {
        question: "What does \"Everyday data viz\" focus on in the context of data visualization?",
        answers: [
            {text: "Elaborating on the details of new trends or patterns", correct: true},
            {text: "Discovering the pattern flow of generated ideas", correct: false},
            {text: "Monitoring the process or status of ideas", correct: false},
            {text: "Training employees for specific sub-tasks", correct: false},
        ]
    },
    {
        question: "Why is data visualization considered important for individuals working in a business?",
        answers: [
            {text: "To create confusion and complexity in information", correct: false},
            {text: "To hinder understanding of information", correct: false},
            {text: "To limit the use of information in business processes", correct: false},
            {text: "To help individuals understand information better", correct: true},
        ]
    },
    {
        question: "What advantage does data visualization offer in terms of sales analysis?",
        answers: [
            {text: "Increased complexity in analyzing sales data", correct: false},
            {text: "Better accuracy in analyzing sales data", correct: true},
            {text: "Difficulty in communication between salespeople", correct: false},
            {text: "Ignoring data modification in sales analysis", correct: false},
        ]
    },
    {
        question: "What is a potential disadvantage of data visualization related to biased information?",
        answers: [
            {text: "Enhanced understanding of unbiased data", correct: false},
            {text: "Ignoring information that is considered important", correct: false},
            {text: "Leaving out other data with prejudiced results", correct: true},
            {text: "Limited interpretation of visual representations", correct: false},
        ]
    },
    {
        question: "Which of the following is an advantage of data visualization in terms of information sharing?",
        answers: [
            {text: "Creating barriers to communication", correct: false},
            {text: "Establishing systems that limit communication", correct: false},
            {text: "Avoiding communication with managers", correct: false},
            {text: "Enabling communication between individuals in the organization", correct: true},
        ]
    },
    {
        question: "What may happen if individuals in the organization are not properly focused on data visualization representations?",
        answers: [
            {text: "Skipping the core message of the visual representation", correct: true},
            {text: "Enhanced understanding of the core message", correct: false},
            {text: "Increased assistance in interpreting information", correct: false},
            {text: "Improved focus on biased information", correct: false},
        ]
    },
    {
        question: "What is the purpose of the pie chart representation of different countries in the European Union?",
        answers: [
            {text: "Showing data on the price distribution of Airbnb apartments", correct: false},
            {text: "Representing the percentage of each country's population in the EU", correct: true},
            {text: "Elaborating on the details of new trends in Europe", correct: false},
            {text: "Focusing on biased information in the EU", correct: false},
        ]
    },
    {
        question: "What type of data does the histogram representation of Airbnb apartments in the south of France show?",
        answers: [
            {text: "Percentage of each country's population", correct: false},
            {text: "Biased information about the European Union", correct: false},
            {text: "Price distribution of Airbnb apartments at night", correct: true},
            {text: "Patterns and trends in the European market", correct: false},
        ]
    },
    {
        question: "What is the role of visual discovery in data visualization?",
        answers: [
            {text: "Monitoring the process or status of ideas", correct: false},
            {text: "Discovering the pattern flow of generated ideas and trends", correct: true},
            {text: "Elaborating on the details of new trends or patterns", correct: false},
            {text: "Training employees for specific sub-tasks", correct: false},
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