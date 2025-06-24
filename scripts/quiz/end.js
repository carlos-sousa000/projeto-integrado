const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");

// Corrigido: obter do localStorage, não do DOM
const mostRecentScore = localStorage.getItem("mostRecentScore");

finalScore.innerText = `${mostRecentScore}/100`;

username.addEventListener("keyup", () => {
  // Habilita o botão se tiver nome
  saveScoreBtn.disabled = !username.value;
});

function saveHighScore(e) {
  e.preventDefault();

  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  const newScore = {
    score: mostRecentScore,
    name: username.value,
  };

  highScores.push(newScore);

  // Mantém só os 5 melhores
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));

  // Volta pra home ou onde quiser
  window.location.assign("home.html");
}
