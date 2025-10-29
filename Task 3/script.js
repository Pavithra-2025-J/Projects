// ---- HOME NAVIGATION ----
function showQuizSelection() {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("quizSelect").classList.remove("hidden");
}

function showJokeSection() {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("jokeSection").classList.remove("hidden");
}

function goHome() {
  document.querySelectorAll(".container").forEach((c) => c.classList.add("hidden"));
  document.getElementById("home").classList.remove("hidden");
}

// ---- QUIZ DATA ----
const quizzes = {
  html: [
    { q: "What does HTML stand for?", a: ["HyperText Markup Language", "HighText Machine Language", "Hyperlink and Text Markup Language", "None"], c: 0 },
    { q: "Which tag is used for creating a hyperlink?", a: ["<a>", "<link>", "<href>", "<url>"], c: 0 },
    { q: "Which tag is used for inserting an image?", a: ["<src>", "<image>", "<img>", "<pic>"], c: 2 },
    { q: "Which tag defines the largest heading?", a: ["<heading>", "<h6>", "<h1>", "<head>"], c: 2 },
    { q: "Which tag is used for lists?", a: ["<ul>", "<li>", "<list>", "<ol>"], c: 1 },
    { q: "Which attribute specifies an image’s alternate text?", a: ["alt", "src", "title", "href"], c: 0 },
  ],
  css: [
    { q: "What does CSS stand for?", a: ["Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets"], c: 1 },
    { q: "Which property controls text size?", a: ["font-size", "text-style", "font-weight", "text-size"], c: 0 },
    { q: "Which is used for background color?", a: ["color", "bgcolor", "background-color", "background"], c: 2 },
    { q: "How do you select an element with id 'header'?", a: [".header", "#header", "header", "*header"], c: 1 },
    { q: "Which unit is relative to the root element?", a: ["em", "px", "rem", "%"], c: 2 },
    { q: "Which property is used to make text bold?", a: ["font-weight", "font-style", "bold", "text-weight"], c: 0 },
  ],
  javascript: [
    { q: "Which keyword declares a variable?", a: ["int", "var", "string", "char"], c: 1 },
    { q: "Which symbol is used for comments?", a: ["//", "#", "<!--", "/* */"], c: 0 },
    { q: "How do you write 'Hello World' in an alert box?", a: ["alert('Hello World');", "msg('Hello World');", "alertBox('Hello World');", "console.log('Hello World');"], c: 0 },
    { q: "Which method adds an element to an array?", a: ["push()", "add()", "insert()", "append()"], c: 0 },
    { q: "What is used to parse JSON data?", a: ["JSON.parse()", "JSON.stringify()", "parse.JSON()", "toJSON()"], c: 0 },
    { q: "Which event occurs when a user clicks an HTML element?", a: ["onmouseover", "onchange", "onclick", "onmouseclick"], c: 2 },
  ],
};

let currentQuiz = [];
let currentIndex = 0;
let score = 0;

function startQuiz(topic) {
  currentQuiz = quizzes[topic];
  currentIndex = 0;
  score = 0;
  document.getElementById("quizSelect").classList.add("hidden");
  document.getElementById("quizSection").classList.remove("hidden");
  document.getElementById("quizTitle").textContent = `${topic.toUpperCase()} Quiz`;
  loadQuestion();
}

function loadQuestion() {
  const question = currentQuiz[currentIndex];
  document.getElementById("questionBox").textContent = `${currentIndex + 1}. ${question.q}`;
  const answerButtons = document.getElementById("answerButtons");
  answerButtons.innerHTML = "";

  question.a.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = () => checkAnswer(i);
    answerButtons.appendChild(btn);
  });

  document.getElementById("feedback").textContent = "";
  document.getElementById("nextBtn").classList.add("hidden");
  document.getElementById("finishBtn").classList.add("hidden");
}

function checkAnswer(selected) {
  const question = currentQuiz[currentIndex];
  const feedback = document.getElementById("feedback");

  if (selected === question.c) {
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "green";
    score++;
  } else {
    feedback.textContent = `❌ Wrong! Correct answer: ${question.a[question.c]}`;
    feedback.style.color = "red";
  }

  if (currentIndex < currentQuiz.length - 1) {
    document.getElementById("nextBtn").classList.remove("hidden");
  } else {
    document.getElementById("finishBtn").classList.remove("hidden");
  }
}

function nextQuestion() {
  currentIndex++;
  loadQuestion();
}

function showResult() {
  document.getElementById("questionBox").textContent = `🎯 Quiz Completed!`;
  document.getElementById("answerButtons").innerHTML = "";
  document.getElementById("feedback").textContent = `Your Score: ${score}/${currentQuiz.length}`;
  document.getElementById("nextBtn").classList.add("hidden");
  document.getElementById("finishBtn").classList.add("hidden");
}

// ---- JOKE FUNCTIONALITY ----
async function fetchJoke() {
  const jokeText = document.getElementById("jokeText");
  jokeText.textContent = "Loading a funny joke...";
  try {
    const res = await fetch("https://official-joke-api.appspot.com/jokes/programming/random");
    const data = await res.json();
    const joke = data[0];
    jokeText.textContent = `${joke.setup} 😂 ${joke.punchline}`;
  } catch {
    jokeText.textContent = "Could not fetch joke. Try again!";
  }
}
