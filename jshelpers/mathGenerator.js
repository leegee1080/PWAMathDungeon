function generateMathProblem() {
    const operations = ['+', '-', '*', '/', 'algebra'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, result, answer, problem, blankPosition;

    if (operation === 'algebra') {
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

    blankPosition = Math.floor(Math.random() * 3); // 0: num1, 1: num2, 2: result

    if (operation === '+') {
        if (blankPosition === 2) {
            num1 = Math.floor(Math.random() * 10);
            num2 = Math.floor(Math.random() * (10 - num1));
            result = num1 + num2;
            answer = result;
            problem = `${num1} + ${num2} = _`;
        } else if (blankPosition === 0) {
            result = Math.floor(Math.random() * 10);
            num2 = Math.floor(Math.random() * (result + 1));
            num1 = result - num2;
            answer = num1;
            problem = `_ + ${num2} = ${result}`;
        } else {
            result = Math.floor(Math.random() * 10);
            num1 = Math.floor(Math.random() * (result + 1));
            num2 = result - num1;
            answer = num2;
            problem = `${num1} + _ = ${result}`;
        }
    } else if (operation === '-') {
        if (blankPosition === 2) {
            num1 = Math.floor(Math.random() * 10);
            num2 = Math.floor(Math.random() * (num1 + 1));
            result = num1 - num2;
            answer = result;
            problem = `${num1} - ${num2} = _`;
        } else if (blankPosition === 0) {
            result = Math.floor(Math.random() * 10);
            num2 = Math.floor(Math.random() * 10);
            num1 = result + num2;
            if (num1 > 9) {
                num1 = 9;
                num2 = num1 - result;
            }
            answer = num1;
            problem = `_ - ${num2} = ${result}`;
        } else {
            num1 = Math.floor(Math.random() * 10);
            result = Math.floor(Math.random() * (num1 + 1));
            num2 = num1 - result;
            answer = num2;
            problem = `${num1} - _ = ${result}`;
        }
    } else if (operation === '*') {
        if (blankPosition === 2) {
            num1 = Math.floor(Math.random() * 3) + 1; // 1 to 3
            const maxNum2 = Math.floor(9 / num1);
            num2 = Math.floor(Math.random() * maxNum2) + 1; // 1 to maxNum2
            result = num1 * num2;
            answer = result;
            problem = `${num1} * ${num2} = _`;
        } else if (blankPosition === 0) {
            num2 = Math.floor(Math.random() * 9) + 1; // 1 to 9
            const maxNum1 = Math.floor(9 / num2);
            num1 = Math.floor(Math.random() * (maxNum1 + 1)); // 0 to maxNum1
            result = num1 * num2;
            answer = num1;
            problem = `_ * ${num2} = ${result}`;
        } else {
            num1 = Math.floor(Math.random() * 9) + 1; // 1 to 9
            const maxNum2 = Math.floor(9 / num1);
            num2 = Math.floor(Math.random() * (maxNum2 + 1)); // 0 to maxNum2
            result = num1 * num2;
            answer = num2;
            problem = `${num1} * _ = ${result}`;
        }
    } else if (operation === '/') {
        const quotient = Math.floor(Math.random() * 9) + 1; // 1 to 9
        const maxDivisor = Math.floor(9 / quotient);
        const divisor = Math.floor(Math.random() * maxDivisor) + 1; // 1 to maxDivisor
        const dividend = quotient * divisor; // 1 to 9
        if (blankPosition === 0) {
            answer = dividend;
            problem = `_ / ${divisor} = ${quotient}`;
        } else if (blankPosition === 1) {
            answer = divisor;
            problem = `${dividend} / _ = ${quotient}`;
        } else {
            answer = quotient;
            problem = `${dividend} / ${divisor} = _`;
        }
    }

    return { problem, answer, blankPosition };
}