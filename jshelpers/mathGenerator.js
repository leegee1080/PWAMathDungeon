function generateMathProblem() {
    const operations = ['+', '-', '*', '/', 'algebra'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, answer, problem, blankPosition;

    if (operation === 'algebra') {
        // Generate algebra problem: ax + c = bx → x = answer (single-digit 0-9)
        answer = Math.floor(Math.random() * 10); // x value 0-9
        const a = Math.floor(Math.random() * 5) + 1; // Coefficient 1-5
        const b = Math.floor(Math.random() * 5) + 1; // Coefficient 1-5
        const c = (b - a) * answer; // Adjust c to ensure x = answer is valid
        const leftSide = a * answer + c;
        const rightSide = b * answer;
        problem = `${leftSide} = ${b}x + ${c}`;
        blankPosition = 'right'; // Blank is for x
        return { problem: `${problem} → x = _`, answer, blankPosition };
    }

    // Generate arithmetic problem with blank in any position, ensuring answer 0-9
    answer = Math.floor(Math.random() * 10); // 0-9
    blankPosition = Math.floor(Math.random() * 3); // 0: num1, 1: num2, 2: result
    switch (operation) {
        case '+':
            if (blankPosition === 0) {
                // _ + num2 = answer
                num2 = Math.floor(Math.random() * answer) + 1; // Ensure num1 = answer - num2 >= 0
                num1 = answer - num2;
                problem = `_ + ${num2} = ${answer}`;
            } else if (blankPosition === 1) {
                // num1 + _ = answer
                num1 = Math.floor(Math.random() * (9 - answer)) + 1; // Ensure result <= 9
                num2 = answer - num1;
                problem = `${num1} + _ = ${answer}`;
            } else {
                // num1 + num2 = _
                num1 = Math.floor(Math.random() * (9 - answer)) + 1;
                num2 = answer;
                problem = `${num1} + ${num2} = _`;
            }
            break;
        case '-':
            if (blankPosition === 0) {
                // _ - num2 = answer
                num2 = Math.floor(Math.random() * answer) + 1; // Ensure num1 = answer + num2 <= 9
                num1 = answer + num2;
                if (num1 > 9) {
                    num2 = Math.floor(Math.random() * (9 - answer)) + 1;
                    num1 = answer + num2;
                }
                problem = `_ - ${num2} = ${answer}`;
            } else if (blankPosition === 1) {
                // num1 - _ = answer
                num1 = Math.floor(Math.random() * (9 - answer)) + answer + 1; // Ensure result >= 0
                num2 = num1 - answer;
                problem = `${num1} - _ = ${answer}`;
            } else {
                // num1 - num2 = _
                num1 = Math.floor(Math.random() * 9) + answer + 1;
                num2 = num1 - answer;
                problem = `${num1} - ${num2} = _`;
            }
            break;
        case '*':
            if (blankPosition === 0) {
                // _ * num2 = answer
                if (answer === 0) {
                    num2 = 1; // Avoid division by zero
                    num1 = 0;
                } else {
                    num2 = Math.floor(Math.random() * Math.min(9, Math.floor(answer / 2))) + 1; // Limit num2
                    num1 = Math.floor(answer / num2); // Ensure exact division
                    if (num1 * num2 !== answer || num1 > 9) {
                        num2 = 1;
                        num1 = answer;
                    }
                }
                problem = `_ * ${num2} = ${answer}`;
            } else if (blankPosition === 1) {
                // num1 * _ = answer
                if (answer === 0) {
                    num1 = 1; // Avoid division by zero
                    num2 = 0;
                } else {
                    num1 = Math.floor(Math.random() * Math.min(9, Math.floor(answer / 2))) + 1; // Limit num1
                    num2 = Math.floor(answer / num1); // Ensure exact division
                    if (num1 * num2 !== answer || num2 > 9) {
                        num1 = 1;
                        num2 = answer;
                    }
                }
                problem = `${num1} * _ = ${answer}`;
            } else {
                // num1 * num2 = _
                num1 = Math.floor(Math.random() * 3) + 1; // Limit to small factors
                num2 = Math.floor(answer / num1); // Ensure exact division
                if (num1 * num2 !== answer || num2 > 9) {
                    num1 = 1;
                    num2 = answer;
                }
                problem = `${num1} * ${num2} = _`;
            }
            break;
        case '/':
            if (blankPosition === 0) {
                // _ / num2 = answer
                num2 = Math.floor(Math.random() * 9) + 1; // Divisor 1-9
                num1 = answer * num2; // Ensure exact division
                if (num1 > 9) {
                    num2 = 1;
                    num1 = answer;
                }
                problem = `_ / ${num2} = ${answer}`;
            } else if (blankPosition === 1) {
                // num1 / _ = answer
                num1 = Math.floor(Math.random() * 9) + 1; // Numerator 1-9
                num2 = num1 / answer; // Ensure exact division
                if (num1 % answer !== 0 || num2 > 9) {
                    num2 = 1;
                    num1 = answer;
                }
                problem = `${num1} / _ = ${answer}`;
            } else {
                // num1 / num2 = _
                num2 = Math.floor(Math.random() * 9) + 1;
                num1 = answer * num2; // Ensure exact division
                if (num1 > 9) {
                    num2 = 1;
                    num1 = answer;
                }
                problem = `${num1} / ${num2} = _`;
            }
            break;
    }
    return { problem, answer, blankPosition };
}