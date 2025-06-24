const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

const progressTextt = document.getElementById("progressText");
const scoreText = document.getElementById("score");

const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnwers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const questions = [
  {
    // COLOCAR AS QUESTÕES
    // FAZER SCRAMBLER DPS(embaralhar as questões)
    question: "",
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "T",
    answer: 2,
  },
  {
    question: "",
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
    answer: 3,
  },
  {
    question: "",
    choice1: "",
    choice2: " ",
    choice3: "",
    choice4: " ",
    answer: 2,
  },
  {
    question: "",
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
    answer: 1,
  },
  {
    question: "",
    choice1: "",
    choice2: " ",
    choice3: " ",
    choice4: " ",
    answer: 2, // Tom Hanks
  },
  {
    question: "",
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
    answer: 2,
  },
  {
    question: "",
    choice1: " ",
    choice2: " ",
    choice3: " ",
    choice4: " ",
    answer: 2,
  },
  {
    question: "",
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
    answer: 1,
  },
  {
    question: "",
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
    answer: 1,
  },
  {
    question: "",
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
    answer: 1,
  },
];

//CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (
    questionCounter >= MAX_QUESTIONS ||
    questionCounter >= availableQuestions.length
  ) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html");
  }

  currentQuestion = availableQuestions[questionCounter];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  questionCounter++;
  progressText.innerText = "Question " + questionCounter + "/" + MAX_QUESTIONS;
  acceptingAnwers = true;

  //progressbar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnwers) return;
    acceptingAnwers = false;

    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
