const questions = [
    {
        question: "1. Which language is used to style web pages?",
        options: ["HTML", "CSS", "Python", "Java"],
        answer: "CSS"
    },
    {
        question: "2. Which language makes a webpage interactive?",
        options: ["CSS", "HTML", "JavaScript", "SQL"],
        answer: "JavaScript"
    },
    {
        question: "3. Which HTML tag is used to add an image?",
        options: ["<image>", "<picture>", "<img>", "<src>"],
        answer: "<img>"
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");
const restartButton = document.getElementById("restart-btn");
const quizBox = document.getElementById("quiz-box");

function showQuestion() {
    answered = false;

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;
    optionsElement.innerHTML = "";
    resultElement.innerHTML = "";

    nextButton.disabled = true;
    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "See My Result 🏆"
            : "Next Question →";

    current.options.forEach(function(option) {
        const button = document.createElement("button");

        button.textContent = option;
        button.className = "option-btn";

        button.addEventListener("click", function() {
            checkAnswer(button, option);
        });

        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedButton, selectedOption) {
    if (answered) {
        return;
    }

    answered = true;

    const correctAnswer = questions[currentQuestion].answer;
    const allOptions = document.querySelectorAll(".option-btn");

    allOptions.forEach(function(button) {
        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }
    });

    if (selectedOption === correctAnswer) {
        score++;
        resultElement.textContent = "Correct Answer! 🎉";
        resultElement.style.color = "#37d98b";
    } else {
        selectedButton.classList.add("wrong");
        resultElement.textContent =
            "Oops! Correct answer: " + correctAnswer;
        resultElement.style.color = "#ff6978";
    }

    nextButton.disabled = false;
}

nextButton.addEventListener("click", function() {
    if (!answered) {
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizBox.classList.add("hidden");
    resultElement.style.color = "white";

    if (score === questions.length) {
        resultElement.innerHTML = `
            <div class="perfect-result">
                <div class="trophy">🏆</div>
                <h2>WOW! PERFECT SCORE! 🎉</h2>
                <p>All 3 answers are correct!</p>
                <p>You're a Quiz Champion! 🚀</p>
                <div class="stars">⭐ ✨ ⭐ ✨ ⭐</div>
                <h3>Score: 3/3 💯</h3>
            </div>
        `;
    } else {
        resultElement.innerHTML = `
            <div class="good-result">
                <h2>👏 Great Try!</h2>
                <h3>Your Score: ${score}/${questions.length}</h3>
                <p>Keep learning and try again! 💪</p>
            </div>
        `;
    }

    restartButton.classList.remove("hidden");
}

restartButton.addEventListener("click", function() {
    currentQuestion = 0;
    score = 0;

    quizBox.classList.remove("hidden");
    restartButton.classList.add("hidden");

    showQuestion();
});

showQuestion();

const images = [
    {
        src: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900",
        title: "Coding & Programming 💻",
        description: "Explore the world of programming and turn your ideas into reality with code."
    },
    {
        src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900",
        title: "Web Development 🌐",
        description: "Learn HTML, CSS and JavaScript to build beautiful and interactive websites."
    },
    {
        src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900",
        title: "Code & Create 🚀",
        description: "Every line of code is a step towards creating something amazing. Keep learning and keep building!"
    }
];

let imageIndex = 0;

const galleryImage = document.getElementById("galleryImage");
const imageTitle = document.getElementById("imageTitle");
const imageDescription = document.getElementById("imageDescription");

function showImage() {
    galleryImage.src = images[imageIndex].src;
    galleryImage.alt = images[imageIndex].title;
    imageTitle.textContent = images[imageIndex].title;
    imageDescription.textContent = images[imageIndex].description;
}

document.getElementById("prev-btn").addEventListener("click", function() {
    imageIndex--;

    if (imageIndex < 0) {
        imageIndex = images.length - 1;
    }

    showImage();
});

document.getElementById("next-image-btn").addEventListener("click", function() {
    imageIndex++;

    if (imageIndex >= images.length) {
        imageIndex = 0;
    }

    showImage();
});

const jokeElement = document.getElementById("joke");
const jokeButton = document.getElementById("joke-btn");

jokeButton.addEventListener("click", async function() {
    jokeElement.textContent = "Loading a funny joke... ⏳";
    jokeButton.disabled = true;

    try {
        const response = await fetch(
            "https://v2.jokeapi.dev/joke/Programming?type=single"
        );

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();

        jokeElement.textContent = data.joke;
    } catch (error) {
        jokeElement.textContent =
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛";
    }

    jokeButton.disabled = false;
});
