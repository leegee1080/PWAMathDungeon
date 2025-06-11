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
    let baseTime = 10;
    if (score >= 500) {
        const levels = Math.floor((score - 500) / 100);
        baseTime = Math.max(2, 10 - levels);
    }
    return baseTime;
}

function calculateScore(timeLeft) {
    const percentage = Math.max(0, Math.floor(timeLeft * 10));
    return Math.floor(50 * (percentage / 100));
}