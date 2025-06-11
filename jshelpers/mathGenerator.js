function generateMathProblem() {
    const operations = ['+', '-', '*', '/', 'algebra'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, answer, problem, blankPosition;

    if (operation === 'algebra') {
        // Generate algebra problem: ax + c = bx → x = answer
        answer = Math.floor(Math.random() * 10); // x value 0-9
        const a = Math.floor(Math.random() * 5) + 1; // Coefficient 1-5
        const b = Math.floor(Math.random() * 5) + 1; // Coefficient 1-5, ensure b != a
        const c = Math.floor(Math.random() * 10) - 5; // Constant -5 to 4
        // Form: ax + c = bx
        const leftSide = a * answer + c;
        const rightSide = b * answer;
        problem = `${leftSide} = ${b}x + ${c}`;
        blankPosition = 'right'; // Blank is for x
        return { problem: `${problem} → x = _`, answer, blankPosition };
    }

    // Generate arithmetic problem with blank in any position
    blankPosition = Math.floor(Math.random() * 3); // 0: num1, 1: num2, 2: result
    switch (operation) {
        case '+':
            answer = Math.floor(Math.random() * 10); // 0-9
            if (blankPosition === 0) {
                // _ + num2 = result
                num2 = Math.floor(Math.random() * (100 - answer));
                num1 = answer;
                problem = `_ + ${num2} = ${num2 + answer}`;
            } else if (blankPosition === 1) {
                // num1 + _ = result
                num1 = Math.floor(Math.random() * (100 - answer));
                num2 = answer;
                problem = `${num1} + _ = ${num1 + answer}`;
            } else {
                // num1 + num2 = _
                num1 = Math.floor(Math.random() * 50);
                num2 = Math.floor(Math.random() * (50 - num1));
                answer = num1 + num2;
                problem = `${num1} + ${num2} = _`;
            }
            break;
        case '-':
            answer = Math.floor(Math.random() * 10); // 0-9
            if (blankPosition === 0) {
                // _ - num2 = result
                num2 = Math.floor(Math.random() * (100 - answer));
                num1 = answer + num2;
                problem = `_ - ${num2} = ${num1 - num2}`;
            } else if (blankPosition === 1) {
                // num1 - _ = result
                num1 = answer + Math.floor(Math.random() * (100 - answer));
                num2 = answer;
                problem = `${num1} - _ = ${num1 - answer}`;
            } else {
                // num1 - num2 = _
                num1 = Math.floor(Math.random() * 50) + 10;
                num2 = Math.floor(Math.random() * (num1 - 10));
                answer = num1 - num2;
                problem = `${num1} - ${num2} = _`;
            }
            break;
        case '*':
            answer = Math.floor(Math.random() * 10); // 0-9
            if (blankPosition === 0) {
                // _ * num2 = result
                num2 = Math.floor(Math.random() * 10) + 1;
                num1 = answer;
                problem = `_ * ${num2} = ${num2 * answer}`;
            } else if (blankPosition === 1) {
                // num1 * _ = result
                num1 = Math.floor(Math.random() * 10) + 1;
                num2 = answer;
                problem = `${num1} * _ = ${num1 * answer}`;
            } else {
                // num1 * num2 = _
                num1 = Math.floor(Math.random() * 10) + 1;
                num2 = Math.floor(Math.random() * 10) + 1;
                answer = num1 * num2;
                problem = `${num1} * ${num2} = _`;
            }
            break;
        case '/':
            answer = Math.floor(Math.random() * 9) + 1; // 1-9 to avoid division by 0
            if (blankPosition === 0) {
                // _ / num2 = result
                num2 = Math.floor(Math.random() * 9) + 1;
                num1 = answer * num2;
                problem = `_ / ${num2} = ${answer}`;
            } else if (blankPosition === 1) {
                // num1 / _ = result
                num1 = answer * (Math.floor(Math.random() * 10) + 1);
                num2 = answer;
                problem = `${num1} / _ = ${num1 / answer}`;
            } else {
                // num1 / num2 = _
                num2 = Math.floor(Math.random() * 9) + 1;
                num1 = answer * num2;
                problem = `${num1} / ${num2} = _`;
            }
            break;
    }
    return { problem, answer, blankPosition };
}