function generateMathProblem() {
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, answer, problem;

    switch (operation) {
        case '+':
            answer = Math.floor(Math.random() * 10);
            num1 = Math.floor(Math.random() * (100 - answer));
            num2 = answer;
            problem = `${num1} + _ = ${num1 + answer}`;
            break;
        case '-':
            answer = Math.floor(Math.random() * 10);
            num1 = answer + Math.floor(Math.random() * (100 - answer));
            num2 = answer;
            problem = `${num1} - _ = ${num1 - answer}`;
            break;
        case '*':
            answer = Math.floor(Math.random() * 10);
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = answer;
            problem = `${num1} * _ = ${num1 * answer}`;
            break;
        case '/':
            answer = Math.floor(Math.random() * 9) + 1;
            num1 = answer * (Math.floor(Math.random() * 10) + 1);
            num2 = answer;
            problem = `${num1} / _ = ${num1 / answer}`;
            break;
    }
    return { problem, answer };
}