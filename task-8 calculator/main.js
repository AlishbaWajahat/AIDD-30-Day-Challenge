// Interactive Calculator
const { calculate } = require('./src/calculator');
const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Simple Calculator');
console.log('=================');
console.log('Enter mathematical expressions to calculate');
console.log('Supported operations: +, -, *, /, parentheses');
console.log('Type "quit" or "exit" to exit the calculator');
console.log('');

function askForExpression() {
    rl.question('Enter expression: ', (input) => {
        const expression = input.trim();

        if (expression.toLowerCase() === 'quit' || expression.toLowerCase() === 'exit') {
            console.log('Goodbye!');
            rl.close();
            return;
        }

        if (expression) {
            try {
                const result = calculate(expression);
                console.log('Result:', result);
            } catch (error) {
                console.error('Error:', error.message);
            }
        }

        console.log(''); // Empty line for readability
        askForExpression(); // Ask for another expression
    });
}

// Start the calculator
askForExpression();