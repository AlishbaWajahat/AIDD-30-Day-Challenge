// Simple Calculator Implementation

// Task T002: Basic parsing to identify numbers and operators
function parseExpression(expression) {
    // Remove all whitespace
    expression = expression.replace(/\s/g, '');

    // Validate the expression contains only numbers, operators, and parentheses
    if (!/^[0-9+\-*/().]+$/.test(expression)) {
        throw new Error('Invalid characters in expression');
    }

    // Simple tokenizer - split into numbers and operators
    const tokens = [];
    let currentNumber = '';

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if ('0123456789.'.includes(char)) {
            currentNumber += char;
        } else if ('+-*/()'.includes(char)) {
            if (currentNumber !== '') {
                tokens.push(parseFloat(currentNumber));
                currentNumber = '';
            }
            tokens.push(char);
        }
    }

    if (currentNumber !== '') {
        tokens.push(parseFloat(currentNumber));
    }

    // Additional validation: check for invalid patterns like consecutive operators
    for (let i = 0; i < tokens.length - 1; i++) {
        const current = tokens[i];
        const next = tokens[i + 1];

        // Check for consecutive operators
        if (typeof current === 'string' && '+-*/'.includes(current) &&
            typeof next === 'string' && '+-*/'.includes(next)) {
            throw new Error('Invalid operator sequence');
        }

        // Check for operator at the end (except for unary minus which we don't support in this simple version)
        if (i === tokens.length - 1 && typeof current === 'string' && '+-*/'.includes(current)) {
            throw new Error('Invalid expression ending');
        }

        // Check for operator at the beginning (except for unary minus which we don't support in this simple version)
        if (i === 0 && typeof current === 'string' && '*/'.includes(current)) {
            throw new Error('Invalid expression beginning');
        }
    }

    return tokens;
}

// Task T004: Implement order of operations
function evaluateExpression(tokens) {
    // Handle parentheses first (recursive approach)
    while (tokens.includes('(') || tokens.includes(')')) {
        let start = -1;
        let end = -1;

        // Find the innermost parentheses
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i] === '(') {
                start = i;
            } else if (tokens[i] === ')') {
                end = i;
                break;
            }
        }

        if (start !== -1 && end !== -1) {
            // Evaluate the expression inside the parentheses
            const innerExpression = tokens.slice(start + 1, end);
            const result = evaluateExpressionWithoutParentheses(innerExpression);

            // Replace the parentheses and inner expression with the result
            tokens.splice(start, end - start + 1, result);
        } else {
            // No more parentheses, break out of the loop
            break;
        }
    }

    return evaluateExpressionWithoutParentheses(tokens);
}

function evaluateExpressionWithoutParentheses(tokens) {
    // First, handle multiplication and division (left to right)
    for (let i = 1; i < tokens.length; i += 2) {
        if (tokens[i] === '*') {
            const result = tokens[i - 1] * tokens[i + 1];
            tokens.splice(i - 1, 3, result);
            i -= 2; // Adjust index after modification
        } else if (tokens[i] === '/') {
            if (tokens[i + 1] === 0) {
                throw new Error('Division by zero');
            }
            const result = tokens[i - 1] / tokens[i + 1];
            tokens.splice(i - 1, 3, result);
            i -= 2; // Adjust index after modification
        }
    }

    // Then, handle addition and subtraction (left to right)
    for (let i = 1; i < tokens.length; i += 2) {
        if (tokens[i] === '+') {
            const result = tokens[i - 1] + tokens[i + 1];
            tokens.splice(i - 1, 3, result);
            i -= 2; // Adjust index after modification
        } else if (tokens[i] === '-') {
            const result = tokens[i - 1] - tokens[i + 1];
            tokens.splice(i - 1, 3, result);
            i -= 2; // Adjust index after modification
        }
    }

    return tokens[0];
}

// Task T001: Basic function that takes string expression and returns result
function calculate(expression) {
    try {
        // Task T002: Parse the expression
        const tokens = parseExpression(expression);

        // Task T003: Support for basic operations (+, -, *, /)
        // Task T004: Order of operations implemented in evaluateExpression
        // Task T005: Handle decimal numbers (already supported by parseFloat)
        // Task T007: Parentheses support (implemented in evaluateExpression)

        const result = evaluateExpression(tokens);
        return result;
    } catch (error) {
        // Task T006: Basic error handling
        // Task T009: Handle edge cases like division by zero
        throw error;
    }
}

// Export the function for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculate };
}