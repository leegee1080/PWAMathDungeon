document.addEventListener('DOMContentLoaded', () => {
    const problemElement = document.getElementById('problem');
    const timerElement = document.getElementById('timer');
    const scoreElement = document.getElementById('score');
    const hpElement = document.getElementById('hp');
    const skipBtn = document.getElementById('skip-btn');
    const healBtn = document.getElementById('heal-btn');
    const resetBtn = document.getElementById('reset-btn');
    const numberButtons = document.querySelectorAll('.number-btn');

    let score = 100;
    let hp = 100;
    let currentAnswer;
    let currentProblem;
    let timer;
    let isGameOver = false;

    function updateScore(newScore) {
        score = newScore;
        scoreElement.textContent = `Score: ${score}`;
        scoreElement.classList.add('score-flash-green');
        setTimeout(() => {
            scoreElement.classList.remove('score-flash-green');
        }, 500);
        skipBtn.disabled = score < 50 || isGameOver;
        healBtn.disabled = score < 200 || hp >= 100 || isGameOver;
    }

    function updateHP(newHP) {
        hp = Math.min(100, newHP);
        hpElement.textContent = `HP: ${hp}`;
        healBtn.disabled = score < 200 || hp >= 100 || isGameOver;
        if (hp <= 0) {
            isGameOver = true;
            numberButtons.forEach(btn => btn.disabled = true);
            skipBtn.disabled = true;
            healBtn.disabled = true;
            resetBtn.disabled = true;
            hpElement.classList.add('hp-flash-red');
            setTimeout(() => {
                hpElement.classList.remove('hp-flash-red');
                resetGame();
            }, 2500);
        }
    }

    function newProblem() {
        clearInterval(timer);
        const { problem, answer } = generateMathProblem();
        problemElement.textContent = problem;
        currentProblem = problem;
        currentAnswer = answer;
        timerElement.classList.remove('flash-red');
        timer = startTimer(
            time => timerElement.textContent = time,
            () => {
                timerElement.classList.add('flash-red');
                updateHP(hp - 10);
                setTimeout(newProblem, 500);
            }
        );
    }

    function resetGame() {
        score = 100;
        scoreElement.textContent = `Score: ${score}`;
        updateHP(100);
        isGameOver = false;
        numberButtons.forEach(btn => btn.disabled = false);
        skipBtn.disabled = score < 50;
        healBtn.disabled = true; // Initial score (100) < 200
        resetBtn.disabled = false;
        newProblem();
    }

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (isGameOver) return;
            const guess = parseInt(button.textContent);
            if (guess === currentAnswer) {
                clearInterval(timer);
                problemElement.textContent = currentProblem.replace('_', guess);
                problemElement.classList.add('flash-green');
                const timeLeft = parseFloat(timerElement.textContent);
                updateScore(score + calculateScore(timeLeft));
                setTimeout(() => {
                    problemElement.classList.remove('flash-green');
                    newProblem();
                }, 500);
            } else {
                problemElement.classList.add('flash-red');
                updateHP(hp - 10);
                setTimeout(() => {
                    problemElement.classList.remove('flash-red');
                }, 500);
            }
        });
    });

    skipBtn.addEventListener('click', () => {
        if (score >= 50 && !isGameOver) {
            score = score - 50;
            scoreElement.textContent = `Score: ${score}`;
            skipBtn.disabled = score < 50;
            healBtn.disabled = score < 200 || hp >= 100;
            newProblem();
        }
    });

    healBtn.addEventListener('click', () => {
        if (score >= 200 && hp < 100 && !isGameOver) {
            score = score - 200;
            scoreElement.textContent = `Score: ${score}`;
            skipBtn.disabled = score < 50;
            healBtn.disabled = score < 200 || hp >= 100;
            updateHP(hp + 20);
        }
    });

    resetBtn.addEventListener('click', () => {
        if (!isGameOver) {
            resetGame();
        }
    });

    healBtn.disabled = true; // Disable heal button on start
    newProblem();
});