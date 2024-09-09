let candidateRegistrations = JSON.parse(localStorage.getItem('candidateRegistrations')) || [];
let currentCandidate = candidateRegistrations[candidateRegistrations.length -1]
document.getElementById('candidateWelcomeName').innerHTML = `${currentCandidate.canName}`

document.getElementById('startBtn').addEventListener('click', ()=>{
    document.getElementById('startDiv').classList.add('hidden')
    startQuiz();
})


// Quiz Section
let quizData = [
    {
        question: "What is the capital of France?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Rome",
        correct: "c"
    },
    {
        question: "Which is the largest planet in the solar system?",
        a: "Earth",
        b: "Jupiter",
        c: "Mars",
        d: "Venus",
        correct: "b"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        a: "Harper Lee",
        b: "George Orwell",
        c: "J.K. Rowling",
        d: "Ernest Hemingway",
        correct: "a"
    },
    {
        question: "What is the square root of 64?",
        a: "6",
        b: "7",
        c: "8",
        d: "9",
        correct: "c"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const quizSection = document.getElementById('quizSection');
const quizForm = document.getElementById('submitBtn');
const quizContainer = document.getElementById('quizContainer')

// Shuffle Questions
quizData = quizData.sort(() => Math.random() - 0.5);

function getSelected() {
    const answers = document.getElementsByName('answer');
    let selectedAnswer = undefined;
    answers.forEach((answer) => {
        if (answer.checked) {
            selectedAnswer = answer.value;
        }
    });
    return selectedAnswer;
}

quizForm.addEventListener('click', () => {
    console.log('click');
    const selectedAnswer = getSelected();
    if (selectedAnswer) {
        if (selectedAnswer === quizData[currentQuestionIndex].correct) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showNextQuestion();
        } else {
            showResults();
        }
    }else {
        alert("Please select an answer before submitting.");
    }
});

function startQuiz() {
    quizSection.style.display = 'block';
    showNextQuestion();
    startTimer(120);
}

function showNextQuestion() {
    const currentQuizData = quizData[currentQuestionIndex];
    quizContainer.innerHTML  = `
            <div class="bg-gray-100 lg:px-10 px-5 lg:py-5 py-3 shadow-md rounded-full mb-5">
                <p class="font-medium lg:text-2xl text-xl text-center">${currentQuizData.question}</p>
            </div>
            <form action="">
                <div class="grid lg:grid-cols-2 lg:gap-10">
                    <div class="bg-gray-100 lg:px-10 px-5 lg:py-5 py-3 shadow-md rounded-full flex items-center gap-5 lg:mb-0 mb-3">
                        <div class="flex items-center gap-">
                            <input type="radio" id="option1" name="answer" value="a" class="">
                            <p class="font-semibold lg:text-xl text-lg">A.</p>
                        </div>
                        <p class="font-semibold lg:text-xl text-lg">${currentQuizData.a}</p>
                    </div>
                    <div class="bg-gray-100 lg:px-10 px-5 lg:py-5 py-3 shadow-md rounded-full flex items-center gap-5 lg:mb-0 mb-3">
                        <div class="flex items-center gap-">
                            <input type="radio" id="option2" name="answer" value="b" class="">
                            <p class="font-semibold lg:text-xl text-lg">B.</p>
                        </div>
                        <p class="font-semibold lg:text-xl text-lg">${currentQuizData.b}</p>
                    </div>
                    <div class="bg-gray-100 lg:px-10 px-5 lg:py-5 py-3 shadow-md rounded-full flex items-center gap-5 lg:mb-0 mb-3">
                        <div class="flex items-center gap-">
                            <input type="radio" id="option3" name="answer" value="c" class="">
                            <p class="font-semibold lg:text-xl text-lg">C.</p>
                        </div>
                        <p class="font-semibold lg:text-xl text-lg">${currentQuizData.c}</p>
                    </div>
                    <div class="bg-gray-100 lg:px-10 px-5 lg:py-5 py-3 shadow-md rounded-full flex items-center gap-5">
                        <div class="flex items-center gap-">
                            <input type="radio" id="option4" name="answer" value="d" class="">
                            <p class="font-semibold lg:text-xl text-lg">D.</p>
                        </div>
                        <p class="font-semibold lg:text-xl text-lg">${currentQuizData.d}</p>
                    </div>
                    
                </div>
            </form>
    `;

}

// Timer Functionality
function startTimer(duration) {
    const timerElement = document.getElementById('timer');
    let time = duration;
    
    const timerInterval = setInterval(() => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        time--;
        
        if (time < 0) {
            clearInterval(timerInterval);
            showResults();
        }
    }, 1000);
}

// Results Section
function showResults() {
    quizSection.style.display = 'none';
    const resultSection = document.getElementById('resultSection');
    resultSection.classList.remove('hidden');
    
    const results = document.getElementById('results');
    results.innerHTML = `<p>Your score: ${score}/${quizData.length}</p>`;
    
    let candidateRegistrations = JSON.parse(localStorage.getItem('candidateRegistrations')) || [];
    let currentCandidate = candidateRegistrations[candidateRegistrations.length -1]

    const resultText = `Institution: ${currentCandidate.institution} Candidate: ${currentCandidate.canName}, ${(score / quizData.length * 100).toFixed(2)}%`;
    results.innerHTML += `<p>${resultText}</p>`;
    
    // Save Winner
    if (score / quizData.length * 100 > 50) {
        saveWinner(currentCandidate.institution, currentCandidate.canName, (score / quizData.length * 100).toFixed(2));
    }
}

// Save Winner to LocalStorage
function saveWinner(schoolName, candidateName, percentage) {
    let winners = JSON.parse(localStorage.getItem('winners')) || [];
    winners.push({ schoolName, candidateName, percentage });
    localStorage.setItem('winners', JSON.stringify(winners));
}

document.getElementById('seeWinners').addEventListener('click', ()=>{
    showWinners();
})

// Show Winners in Modal
function showWinners() {
    const winnersModal = document.getElementById('winnersModal');
    winnersModal.classList.remove('hidden')
    
    const winnersList = document.getElementById('winnersList');
    let winners = JSON.parse(localStorage.getItem('winners')) || [];
    
    winnersList.innerHTML = '';
    winners.forEach(winner => {
        winnersList.innerHTML += `<p>${winner.schoolName}, ${winner.candidateName}, ${winner.percentage}%</p>`;
    });
    
    document.getElementById('close').addEventListener('click', () => {
        winnersModal.style.display = 'none';
    });
}
document.getElementById('closeGame').addEventListener('click', () => {
    window.location.href="index.html"
});