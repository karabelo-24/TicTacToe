document
.getElementById("startBtn")
.addEventListener("click", () => {

    const players = prompt(
        "Enter number of players (1 or 2)"
    );

    if (players !== "1" && players !== "2") {
        alert("Error: Please enter either 1 or 2.");
        return;
    }
    if (players === "1") {

        const difficulty =prompt(
            "Choose difficulty:\nEasy\nMedium\nImpossible"
        )?.toLowerCase();

        if(
            difficulty !== "easy" &&
            difficulty !== "medium" &&
            difficulty !== "impossible"
        ){
            alert("Invalid difficulty. Choose Easy, Medium, or Impossible.");
            return;
}

localStorage.setItem(
    "difficulty",
    difficulty
);
}
    

    localStorage.setItem("players", players);


    window.location.href = "pages/game.html";
});