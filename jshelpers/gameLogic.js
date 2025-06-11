function startTimer(updateTimer, onTimerEnd) {
    let timeLeft = calculateInitialTime();
    const timer = setInterval(() => {
        timeLeft -= 0.1;
        updateTimer(timeLeft.toFixed(1));
        if (timeLeft <= 0) {
            clearInterval(timer);
            onTimerEnd();
        }
    }, 100);
    return timer;
}

function calculateInitialTime() {
    const scoreThreshold = parseInt(localStorage.getItem('minTimeScore') || '0');
    let baseTime = 10;
    if (scoreThreshold >= 500) {
        const levels = Math.floor((scoreThreshold - 500) / 100);
        baseTime = Math.max(2, 10 - levels);
    }
    return baseTime;
}

function calculateScore(timeLeft) {
    const percentage = Math.max(0, Math.floor(timeLeft * 10));
    return Math.floor(50 * (percentage / 100));
}

function updateMinTimeScore(score) {
    const currentMin = parseInt(localStorage.getItem('minTimeScore') || '0');
    if (score >= 500 && score > currentMin) {
        localStorage.setItem('minTimeScore', score);
    }
}