const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const downloadButton = document.getElementById('download-btn');
const quizContainer = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('time');
const resultContainer = document.getElementById('result');
const scoreText = document.getElementById('score-text');

let shuffledQuestions, currentQuestionIndex, score, timerInterval, timeLeft;
let userAnswers = []; // Stocker les réponses de l'utilisateur

const questions = [
      // A1 1
      { question: 'Complétez la phrase : "Je m appelle Marie et je ____ (être) française"', answers: [
        { text: 'a) es', correct: false },
        { text: 'b) suis', correct: true },
        { text: 'c) sont', correct: false },
        { text: 'd) sommes', correct: false }
    ]},
        // A1 2
        { question: 'Quel est le bon choix ? :" Il ____ un café."', answers: [
            { text: 'a) mange', correct: false },
            { text: 'b) lit', correct: false },
            { text: 'c) boit', correct: true },
            { text: 'd) écoute', correct: false }
        ]},
          // A2 1
    { question: 'Conjuguez correctement le verbe : "Nous ____ (aller) au cinéma ce soir."', answers: [
        { text: 'a) allons', correct: true },
        { text: 'b) allez', correct: false  },
        { text: 'c) va', correct: false },
        { text: 'd) vont', correct: false }
    ]},
      // A2 2
      { question: 'Choisissez la bonne préposition : "Ils habitent ____ Paris."', answers: [
        { text: 'a) dans', correct: false },
        { text: 'b) à', correct: true },
        { text: 'c) en', correct: false },
        { text: 'd) sur', correct: false }
    ]},
     //B1 1
     { question: 'Complétez avec la forme correcte : "Si j avais le temps, je ____ (partir) en vacances."', answers: [
        { text: 'a) partais', correct: false },
        { text: 'b) partirai', correct: false },
        { text: 'c) partirais', correct: true },
        { text: 'd) pars', correct: false }
    ]},
     //B1 2
     { question: 'Quel mot signifie "se dépêcher" ?', answers: [
        { text: 'a) se promener', correct: false },
        { text: 'b) se presser', correct: true },
        { text: 'c) se détendre', correct: false },
        { text: 'd) s arrêter', correct: false }
    ]},
        //B2 1
    { question: 'Complétez avec le mot adéquat : "Il travaille beaucoup, ____ il est souvent fatigué."', answers: [
        { text: 'a) car', correct: false },
        { text: 'b) pourtant', correct: false },
        { text: 'c) donc', correct: true },
        { text: 'd) ainsi', correct: false }
    ]},
        //B2 2
    { question: 'Choisissez l option correcte : "Les mesures ____, il faut se préparer pour le changement."', answers: [
        { text: 'a) auront été prises', correct: true },
        { text: 'b) prennent', correct: false },
        { text: 'c) sont prises', correct: false },
        { text: 'd) seront prises', correct: false }
    ]},
        //C1
    { question: 'Complétez la phrase avec l expression correcte : "Il faut qu on ____ avant la fin du mois."', answers: [
        { text: 'a) ait fini', correct: true },
        { text: 'b) ait finissons', correct: false },
        { text: 'c) ait finie', correct: false },
        { text: 'd) finit', correct: false }
    ]},
        //C2
    { question: 'Identifiez la phrase la plus littéraire :"La forêt, théâtre de ses rêveries, ____ ses plus secrètes pensées."', answers: [
        { text: 'a) évoque', correct: false },
        { text: 'b) éveille', correct: true },
        { text: 'c) éclaire', correct: false },
        { text: 'd) cultive', correct: false }
    ]},
];

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', startQuiz);

function startQuiz() {
    startButton.classList.add('hide');
    resultContainer.classList.add('hide');
    quizContainer.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = []; // Réinitialiser les réponses de l'utilisateur
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    startTimer();
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';

    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    });

    if (correct) {
        score++;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('incorrect');
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
    });

    // Stocker la réponse de l'utilisateur
    userAnswers.push(selectedButton.innerText);

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        setTimeout(showResult, 1000);
    }
    
    stopTimer();
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

function showResult() {
    quizContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreText.innerText = `Votre score est de ${score} sur ${questions.length}`;
    
    let level = 'A1';
    if (score <= 2) level = 'A1';
    else if (score <= 4) level = 'A2';
    else if (score <= 6) level = 'B1';
    else if (score <= 8) level = 'B2';
    else if (score === 9) level = 'C1';
    else if (score === 10) level = 'C2';

    scoreText.innerText += ` (Niveau ${level})`;
    
    // Afficher le bouton de téléchargement du PDF
    downloadButton.classList.remove('hide');
}

function startTimer() {
    timeLeft = 20;
    timerElement.innerText = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextButton.click();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

// Fonction pour générer le rapport PDF-------------------
downloadButton.addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Titre et score dans le PDF
    doc.text("Rapport de Quiz", 10, 10);
    doc.text("Score total: " + score + " / " + questions.length, 10, 20);
    
    // Déterminer le niveau
    let level = 'A1';
    if (score <= 2) level = 'A1';
    else if (score <= 4) level = 'A2';
    else if (score <= 6) level = 'B1';
    else if (score <= 8) level = 'B2';
    else if (score === 9) level = 'C1';
    else if (score === 10) level = 'C2';

    doc.text("Niveau atteint: " + level, 10, 30);

    // Ajouter chaque question, réponse de l'utilisateur et réponse correcte
    shuffledQuestions.forEach((question, index) => {
        const correctAnswer = question.answers.find(ans => ans.correct).text;
        const userAnswer = userAnswers[index] || "Non répondu";

        doc.text(`Question ${index + 1}: ${question.question}`, 5, 45 + (index * 20));
        doc.text(`Votre réponse: ${userAnswer}`, 5, 50 + (index * 20));
        doc.text(`Réponse correcte: ${correctAnswer}`, 5, 55 + (index * 20));
    });

    // Sauvegarder le PDF
    doc.save("rapport_quiz.pdf");
});
