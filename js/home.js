const startBtn = document.getElementById("startBtn");
const gameModal = document.getElementById("gameModal");
const playerSection = document.getElementById("playerSection");
const difficultySection = document.getElementById("difficultySection");

startBtn.addEventListener("click", () => {
    gameModal.classList.remove("hidden");
});

document.querySelectorAll(".playerBtn").forEach(button => {

    button.addEventListener("click", () => {

        const players = button.dataset.players;

        localStorage.setItem("players", players);

        if (players === "1") {

            playerSection.classList.add("hidden");
            difficultySection.classList.remove("hidden");

        } else {

            window.location.href = "pages/game.html";

        }
    });
});

document.querySelectorAll(".difficultyBtn").forEach(button => {

    button.addEventListener("click", () => {

        const difficulty = button.dataset.difficulty;

        localStorage.setItem("difficulty", difficulty);

        window.location.href = "pages/game.html";
    });
});