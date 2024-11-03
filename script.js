let personnage = document.getElementById('personnage');
let boule = document.getElementById('boule');
let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');
let btnRejouer = document.getElementById('btn-rejouer');

let isMoving = true;
let isJumping = false;
let gameOver = false;

// Ajouter un gestionnaire d'événements pour le clic sur le bouton 2 (START/STOP)
btn2.addEventListener('click', function() {
    if (isMoving) {
        boule.classList.add('stop');
        btn2.textContent = 'STOP';
    } else {
        boule.classList.remove('stop');
        btn2.textContent = 'START';
    }
    isMoving = !isMoving;
});

// Ajouter un gestionnaire d'événements pour le clic sur le bouton 1 (SAUTER)
btn1.addEventListener('click', function() {
    if (!isJumping && !gameOver) {
        console.log("Saut en cours...");
        isJumping = true;
        personnage.classList.add('sauter');

        setTimeout(() => {
            personnage.classList.remove('sauter');
            isJumping = false;
            console.log("Saut terminé.");
        }, 500);
    } else if (gameOver) {
        console.log("Le jeu est terminé. Cliquez sur REJOUER pour jouer à nouveau.");
    } else {
        console.log("Le personnage est déjà en train de sauter.");
    }
});

// Fonction pour détecter la collision
function detectCollision() {
    const personnageRect = personnage.getBoundingClientRect();
    const bouleRect = boule.getBoundingClientRect();

    if (
        personnageRect.x < bouleRect.x + bouleRect.width &&
        personnageRect.x + personnageRect.width > bouleRect.x &&
        personnageRect.y < bouleRect.y + bouleRect.height &&
        personnageRect.y + personnageRect.height > bouleRect.y
    ) {
        return true; // Collision détectée
    }
    return false; // Pas de collision
}

// Boucle de jeu
function gameLoop() {
    if (detectCollision() && !gameOver) {
        alert("Erreur : La boule a touché le personnage ! Le jeu est terminé.");
        gameOver = true; // Mettre à jour l'état du jeu
        boule.classList.remove('stop'); // Arrêter la boule
        btn1.disabled = true; // Désactiver le bouton SAUTER
        btn2.disabled = true; // Désactiver le bouton START/STOP
        btn2.textContent = 'START';
        btnRejouer.style.display = 'block'; // Afficher le bouton REJOUER
    }

    requestAnimationFrame(gameLoop); // Appeler la boucle de jeu à chaque image
}

// Fonction pour redémarrer le jeu
function restartGame() {
    gameOver = false; // Réinitialiser l'état du jeu
    isJumping = false; // Réinitialiser le saut
    btn1.disabled = false; // Réactiver le bouton SAUTER
    btn2.disabled = false; // Réactiver le bouton START/STOP
    btnRejouer.style.display = 'none'; // Cacher le bouton REJOUER

    // Réinitialiser la position de la boule ici si nécessaire
    boule.classList.remove('stop'); // Assurez-vous que la boule recommence à se déplacer

    // Relancer la boucle de jeu
    gameLoop();
}

// Ajouter un gestionnaire d'événements pour le clic sur le bouton REJOUER
btnRejouer.addEventListener('click', restartGame);

// Démarrer la boucle de jeu
gameLoop();