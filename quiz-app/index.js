const questionElement = document.getElementById("question");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");

let currentQuestion = 0;

const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: "Mars",
    selected: null
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["William Wordsworth", "William Shakespeare", "Charles Dickens", "Jane Austen"],
    answer: "William Shakespeare",
    selected: null
  },
  {
    question: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    answer: "Tokyo",
    selected: null
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Carbon Dioxide",
    selected: null
  },
  {
    question: "What is H2O commonly known as?",
    options: ["Oxygen", "Salt", "Water", "Hydrogen Peroxide"],
    answer: "Water",
    selected: null
  },
  {
    question: "Which is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    answer: "Blue Whale",
    selected: null
  },
  {
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    answer: "7",
    selected: null
  },
  {
    question: "What is the boiling point of water at sea level?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    answer: "100°C",
    selected: null
  },
  {
    question: "Which instrument is used to measure temperature?",
    options: ["Thermostat", "Thermometer", "Barometer", "Hygrometer"],
    answer: "Thermometer",
    selected: null
  },
  {
    question: "Who was the first person to walk on the Moon?",
    options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "Michael Collins"],
    answer: "Neil Armstrong",
    selected: null
  }
];




const welcomeBtn = document.getElementById("welcome");
const welcomeScreen = document.getElementById("welcome-screen");
const mainContainer = document.getElementById("container");

welcomeBtn.addEventListener("click", () => {
  welcomeScreen.style.display = "none";
  mainContainer.style.display = "block";
  showQuestion();
});

const nextBtn = document.getElementById("next");
nextBtn.addEventListener("click", () => {
  prevBtn.disabled = false;
  if (currentQuestion < questions.length - 1) {
    currentQuestion += 1;
  }
  if (currentQuestion === questions.length - 1) {
    nextBtn.disabled = true;
  }
  showQuestion();
});

const prevBtn = document.getElementById("previous");
prevBtn.addEventListener("click", () => {
  if (currentQuestion < 1) {
    prevBtn.disabled = true;
  }
  nextBtn.disabled = false;
  currentQuestion -= 1;
  showQuestion();
});

const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", () => {
  calculatePoints();
  const isSure = confirm("Are you sure?");
  if (isSure) {
    questionElement.textContent = `Total Questions Attempted: ${currentQuestion + 1}`;
    const containerDiv = document.getElementsByClassName("container-ans");
    for (let div of containerDiv) {
      div.innerHTML = `Total Points: ${points}`;
    }
  }
});

function showQuestion() {
  const q = questions[currentQuestion];
  questionElement.textContent = q.question;
  option1.innerHTML = q.options[0];
  option2.innerHTML = q.options[1];
  option3.innerHTML = q.options[2];
  option4.innerHTML = q.options[3];

  const options = [option1, option2, option3, option4];
  options.forEach(btn => {
    btn.classList.remove("selectedAns");
    if (q.selected === btn.textContent) {
      btn.classList.add("selectedAns");
    }
  });
}

document.querySelectorAll(".selected-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const chosenAns = e.target.textContent;
    const options = [option1, option2, option3, option4];
    options.forEach((btn) => btn.classList.remove("selectedAns"));
    e.target.classList.add("selectedAns");
    questions[currentQuestion].selected = chosenAns;
  });
});

let points = 0;

function calculatePoints() {
  points = 0;
  questions.forEach((q) => {
    if (q.selected === q.answer) {
      points += 1;
    }
  });
}
