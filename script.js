//===========================
// YOUR QUESTIONS
//===========================

const questions = [
{
    question: "What does HTML stand for?",
    answers: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Home Tool Markup Language",
        "Hyperlink Tool Mark Language"
    ],
    correct: 0
},

{
    question: "Which language is used for styling web pages?",
    answers: [
        "Python",
        "Java",
        "CSS",
        "PHP"
    ],
    correct: 2
},

{
    question: "Which language makes a webpage interactive?",
    answers: [
        "JavaScript",
        "HTML",
        "CSS",
        "SQL"
    ],
    correct: 0
},

{
    question: "Which tag creates a hyperlink?",
    answers: [
        "<img>",
        "<a>",
        "<table>",
        "<div>"
    ],
    correct: 1
},

{
    question: "What does CSS stand for?",
    answers: [
        "Computer Style Sheets",
        "Creative Style System",
        "Cascading Style Sheets",
        "Color Style Sheet"
    ],
    correct: 2
}
];

//===========================
// VARIABLES
//===========================

let currentQuestion = 0;
let score = 0;
let timeLeft = 300; // 5 minutes

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

const question = document.getElementById("question");
const answers = document.getElementById("answers");

const timer = document.getElementById("timer");
const progress = document.getElementById("progress");

//===========================
// START QUIZ
//===========================

startBtn.addEventListener("click", function(){

    const name =
    document.getElementById("Name").value;

    if(name==""){
        alert("Please enter your name.");
        return;
    }

    history.pushState(null,null,location.href);

    window.onpopstate=function(){
        history.pushState(null,null,location.href);
    }

    startScreen.classList.add("hide");
    quizScreen.classList.remove("hide");

    startTimer();
    showQuestion();

});

//===========================
// SHOW QUESTION
//===========================

function showQuestion(){

    nextBtn.style.display="none";

    answers.innerHTML="";

    progress.innerHTML=
    "Question "+
    (currentQuestion+1)+
    " of "+
    questions.length;

    question.innerHTML=
    questions[currentQuestion].question;

    questions[currentQuestion].answers.forEach(function(answer,index){

        const btn=document.createElement("button");

        btn.innerHTML=answer;

        btn.className="answer-btn";

        btn.onclick=function(){

            checkAnswer(index);

        }

        answers.appendChild(btn);

    });

}

//===========================
// CHECK ANSWER
//===========================

function checkAnswer(selected){

    const buttons=document.querySelectorAll(".answer-btn");

    buttons.forEach(button=>{
        button.disabled=true;
    });

    if(selected===questions[currentQuestion].correct){
        score++;
    }

    nextBtn.style.display="block";

}

//===========================
// NEXT BUTTON
//===========================

nextBtn.addEventListener("click",function(){

    currentQuestion++;

    if(currentQuestion<questions.length){

        showQuestion();

    }

    else{

        showResult();

    }

});

//===========================
// TIMER
//===========================

function startTimer(){

    const countdown=setInterval(function(){

        let minutes=Math.floor(timeLeft/60);

        let seconds=timeLeft%60;

        if(seconds<10){
            seconds="0"+seconds;
        }

        timer.innerHTML=
        minutes+":"+seconds;

        timeLeft--;

        if(timeLeft<0){

            clearInterval(countdown);

            showResult();

        }

    },1000);

}

//===========================
// RESULT
//===========================

function showResult(){

    quizScreen.classList.add("hide");

    resultScreen.classList.remove("hide");

    const name=
    document.getElementById("Name").value;

    document.getElementById("Result").innerHTML=
    "Name: "+name;

    document.getElementById("score").innerHTML=
    "Score: "+score+" / "+questions.length;

    let percent=
    (score/questions.length)*100;

    document.getElementById("percentage").innerHTML=
    "Percentage: "+percent.toFixed(0)+"%";

}