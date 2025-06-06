function generateMathProblem() {
    const operations = ['+', '-', '*', '/', 'algebra'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, result, answer, problem, blankPosition;

    if (operation === 'algebra') {
        // Algebra: ax + c = bx → x = answer (0-9)
        answer = Math.floor(Math.random() * 10); // x value 0-9
        const a = Math.floor(Math.random() * 5) + 1; // Coefficient 1-5
        const b = Math.floor(Math.random() * 5) + 1; // Coefficient 1-5
        const c = (b - a) * answer; // Ensure x = answer is valid
        const leftSide = a * answer + c;
        const rightSide = b * answer;
        problem = `${leftSide} = ${b}x + ${c} → x = _`;
        blankPosition = 'right'; // Blank is for x
        return { problem, answer, blankPosition };
    }

    // Arithmetic operations
    if (operation === '+') {
        num1 = Math.floor(Math.random() * 10); // 0-9
        num2 = Math.floor(Math.random() * (10 - num1)); // num1 + num2 <= 9
        result = num1 + num2;
    } else if (operation === '-') {
        num2 = Math.floor(Math.random() * 10); // 0-9
        num1 = num2 + Math.floor(Math.random() * (10 - num2)); // num1 >= num2, num1 <= 9
        result = num1 - num2;
    } else if (operation === '*') {
        num1 = Math.floor(Math.random() * 4); // 0-3 to keep result <= 9
        if (num1 === 0) {
            num2 = Math.floor(Math.random() * 10); // 0-9
        } else {
            num2 = Math.floor(Math.random() * (Math.floor(9 / num1) + 1)); // num1 * num2 <= 9
        }
        result = num1 * num2;
    } else if (operation === '/') {
        result = Math.floor(Math.random() * 10); // 0-9
        if (result === 0) {
            num2 = Math.floor(Math.random() * 9) + 1; // 1-9
            num1 = 0; // 0 / num2 = 0
        } else {
            const maxNum2 = Math.floor(9 / result);
            num2 = Math.floor(Math.random() * maxNum2) + 1; // 1 to maxNum2
            num1 = result * num2; // Exact division, num1 <= 9
        }
    }

    // Choose blank position: 0 (num1), 1 (num2), 2 (result)
    blankPosition = Math.floor(Math.random() * 3);

    // Set answer and problem based on blank position
    if (blankPosition === 0) {
        answer = num1;
        problem = operation === '/' ? `_ / ${num2} = ${result}` : `_ ${operation} ${num2} = ${result}`;
    } else if (blankPosition === 1) {
        answer = num2;
        problem = operation === '/' ? `${num1} / _ = ${result}` : `${num1} ${operation} _ = ${result}`;
    } else {
        answer = result;
        problem = operation === '/' ? `${num1} / ${num2} = _` : `${num1} ${operation} ${num2} = _`;
    }

    return { problem, answer, blankPosition };
}