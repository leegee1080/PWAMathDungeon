document.addEventListener('DOMContentLoaded', () => {
    const problemElement = document.getElementById('problem');
    const timerElement = document.getElementById('timer');
    const scoreElement = document.getElementById('score');
    const hpElement = document.getElementById('hp');
    const skipBtn = document.getElementById('skip-btn');
    const resetBtn = document.getElementById('reset-btn');
    const numberButtons = document.querySelectorAll('.number-btn');

    let score = 100;
    let hp = 100;
    let currentAnswer;
    let timer;

    function updateScore(newScore) {
        score = newScore;
        scoreElement.textContent = `Score: ${score}`;
        skipBtn.disabled = score < 50;
    }

    function updateHP(newHP) {
        hp = newHP;
        hpElement.textContent = `HP: ${hp}`;
        if (hp <= 0) {
            alert('Game Over! Resetting game...');
            resetGame();
        }
    }

    function newProblem() {
        clearInterval(timer);
        const { problem, answer } = generateMathProblem();
        problemElement.textContent = problem;
        currentAnswer = answer;
        timerElement.classList.remove('flash-red');
        timer = startTimer(
            time => timerElement.textContent = time,
            () => {
                timerElement.classList.add('flash-red');
                updateHP(hp - 10);
                setTimeout(newProblem, 1500);
            }
        );
    }

    function resetGame() {
        updateScore(100);
        updateHP(100);
        newProblem();
    }

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            const guess = parseInt(button.textContent);
            clearInterval(timer);
            if (guess === currentAnswer) {
                problemElement.classList.add('flash-green');
                const timeLeft = parseFloat(timerElement.textContent);
                updateScore(score + calculateScore(timeLeft));
                setTimeout(() => {
                    problemElement.classList.remove('flash-green');
                    newProblem();
                }, 2500);
            } else {
                problemElement.classList.add('flash-red');
                updateHP(hp - 10);
                setTimeout(() => {
                    problemElement.classList.remove('flash-red');
                    newProblem();
                }, 1500);
            }
        });
    });

    skipBtn.addEventListener('click', () => {
        if (score >= 50) {
            updateScore(score - 50);
            newProblem();
        }
    });

    resetBtn.addEventListener('click', resetGame);

    newProblem();
});