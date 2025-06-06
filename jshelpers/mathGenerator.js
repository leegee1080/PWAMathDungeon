function generateMathProblem() {
    const operations = ['+', '-', '*', '/', 'algebra'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, answer, problem, blankPosition;

    if (operation === 'algebra') {
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

    blankPosition = Math.floor(Math.random() * 3); // 0: num1, 1: num2, 2: result
    answer = Math.floor(Math.random() * 10); // 0-9
    switch (operation) {
        case '+':
            if (blankPosition === 0) {
                num2 = Math.floor(Math.random() * answer) + 1;
                num1 = answer - num2;
                problem = `_ + ${num2} = ${answer}`;
            } else if (blankPosition === 1) {
                num1 = Math.floor(Math.random() * answer);
                num2 = answer - num1;
                problem = `${num1} + _ = ${answer}`;
            } else {
                num1 = Math.floor(Math.random() * (9 - answer)) + 1;
                num2 = answer;
                problem = `${num1} + ${num2} = _`;
            }
            break;
        case '-':
            if (blankPosition === 0) {
                num2 = Math.floor(Math.random() * answer) + 1;
                num1 = answer + num2;
                if (num1 > 9) {
                    num2 = Math.floor(Math.random() * (9 - answer)) + 1;
                    num1 = answer + num2;
                }
                problem = `_ - ${num2} = ${answer}`;
            } else if (blankPosition === 1) {
                num1 = Math.floor(Math.random() * (9 - answer)) + answer + 1;
                num2 = num1 - answer;
                problem = `${num1} - _ = ${answer}`;
            } else {
                num1 = Math.floor(Math.random() * 9) + answer + 1;
                num2 = num1 - answer;
                problem = `${num1} - ${num2} = _`;
            }
            break;
        case '*':
            if (blankPosition === 0) {
                // _ * num2 = answer
                if (answer === 0) {
                    num2 = Math.floor(Math.random() * 9) + 1;
                    num1 = 0;
                } else {
                    let possibleFactors = [];
                    for (let i = 1; i <= 9; i++) {
                        if (answer % i === 0 && answer / i <= 9) {
                            possibleFactors.push(i);
                        }
                    }
                    num2 = possibleFactors.length > 0 ? possibleFactors[Math.floor(Math.random() * possibleFactors.length)] : 1;
                    num1 = answer / num2;
                }
                problem = `_ * ${num2} = ${answer}`;
            } else if (blankPosition === 1) {
                // num1 * _ = answer
                if (answer === 0) {
                    num1 = Math.floor(Math.random() * 9) + 1;
                    num2 = 0;
                } else {
                    let possibleFactors = [];
                    for (let i = 1; i <= 9; i++) {
                        if (answer % i === 0 && answer / i <= 9) {
                            possibleFactors.push(i);
                        }
                    }
                    num1 = possibleFactors.length > 0 ? possibleFactors[Math.floor(Math.random() * possibleFactors.length)] : 1;
                    num2 = answer / num1;
                }
                problem = `${num1} * _ = ${answer}`;
            } else {
                // num1 * num2 = _
                if (answer === 0) {
                    num1 = Math.floor(Math.random() * 9) + 1;
                    num2 = 0;
                } else {
                    let possibleFactors = [];
                    for (let i = 1; i <= 9; i++) {
                        if (answer % i === 0 && answer / i <= 9) {
                            possibleFactors.push(i);
                        }
                    }
                    num1 = possibleFactors.length > 0 ? possibleFactors[Math.floor(Math.random() * possibleFactors.length)] : 1;
                    num2 = answer / num1;
                }
                problem = `${num1} * ${num2} = _`;
            }
            break;
        case '/':
            if (blankPosition === 0) {
                num2 = Math.floor(Math.random() * 9) + 1;
                num1 = answer * num2;
                if (num1 > 9) {
                    num2 = 1;
                    num1 = answer;
                }
                problem = `_ / ${num2} = ${answer}`;
            } else if (blankPosition === 1) {
                num1 = Math.floor(Math.random() * 9) + 1;
                num2 = num1 / answer;
                if (num1 % answer !== 0 || num2 > 9) {
                    num2 = 1;
                    num1 = answer;
                }
                problem = `${num1} / _ = ${answer}`;
            } else {
                num2 = Math.floor(Math.random() * 9) + 1;
                num1 = answer * num2;
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