function startTimer(updateTimer, onTimerEnd) {
    let timeLeft = 10;
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

function calculateScore(timeLeft) {
    const percentage = Math.max(0, Math.floor(timeLeft * 10));
    return Math.floor(50 * (percentage / 100));
}