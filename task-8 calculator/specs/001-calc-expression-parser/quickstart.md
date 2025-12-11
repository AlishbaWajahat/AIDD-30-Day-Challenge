# Quickstart Guide: Calculator Expression Parser

## Overview
This guide will help you get started with the Calculator Expression Parser, which takes a mathematical expression as a string and returns the calculated result as a number.

## Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

## Installation

1. Clone or download the calculator project
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

## Basic Usage

### Import and Initialize
```javascript
import { Calculator } from './calculator';

// Create a new calculator instance
const calculator = new Calculator();
```

### Evaluate Expressions
```javascript
// Basic arithmetic
const result1 = calculator.evaluate("2 + 3"); // Returns 5
const result2 = calculator.evaluate("10 - 4"); // Returns 6
const result3 = calculator.evaluate("3 * 4"); // Returns 12
const result4 = calculator.evaluate("15 / 3"); // Returns 5

// Complex expressions with order of operations
const result5 = calculator.evaluate("2 + 3 * 4"); // Returns 14 (not 20)
const result6 = calculator.evaluate("(2 + 3) * 4"); // Returns 20

// Decimal numbers
const result7 = calculator.evaluate("2.5 + 1.75"); // Returns 4.25
const result8 = calculator.evaluate("7.5 / 2.5"); // Returns 3
```

### Handling Results
The calculator returns an `OperationResult` object:

```javascript
const result = calculator.evaluate("10 / 2");

if (result.success) {
  console.log(`Result: ${result.value}`); // "Result: 5"
} else {
  console.error(`Error: ${result.error.message}`); // Error details if applicable
}
```

## Error Handling

The calculator handles various error conditions gracefully:

```javascript
// Division by zero
const divZeroResult = calculator.evaluate("5 / 0");
// Returns: { success: false, value: null, error: { type: 'MATHEMATICAL_ERROR', message: 'Division by zero is not allowed' } }

// Invalid syntax
const invalidResult = calculator.evaluate("2 + * 3");
// Returns: { success: false, value: null, error: { type: 'SYNTAX_ERROR', message: 'Invalid operator sequence near position 4' } }

// Unbalanced parentheses
const parenResult = calculator.evaluate("2 + (3 * 4");
// Returns: { success: false, value: null, error: { type: 'VALIDATION_ERROR', message: 'Unbalanced parentheses in expression' } }
```

## Advanced Usage

### Using the Parser Directly
```javascript
import { ExpressionParser } from './parser';

const parser = new ExpressionParser();
const tokens = parser.parse("2 + 3 * 4");
console.log(tokens); // Array of Token objects
```

### Using the Validator Directly
```javascript
import { ExpressionValidator } from './validator';

const validator = new ExpressionValidator();
const isValid = validator.validate("2 + 3 * 4");
console.log(isValid); // true

const details = validator.getValidationDetails("2 + * 3");
console.log(details); // Detailed validation information
```

## Testing

Run the test suite to verify everything works correctly:

```bash
npm test
```

Or run tests with coverage:

```bash
npm run test:coverage
```

## Building

To build the calculator for production:

```bash
npm run build
```

This will create a compiled version in the `dist/` directory.

## Examples

### Simple Calculator Application
```javascript
import { Calculator } from './calculator';

const calc = new Calculator();

function calculate(expression) {
  const result = calc.evaluate(expression);

  if (result.success) {
    return result.value;
  } else {
    throw new Error(result.error.message);
  }
}

// Example usage
try {
  console.log(calculate("2 + 3 * 4")); // 14
  console.log(calculate("(10 + 5) / 3")); // 5
} catch (error) {
  console.error("Calculation error:", error.message);
}
```

## Troubleshooting

### Common Issues

1. **Floating Point Precision**: JavaScript's floating-point arithmetic may cause precision issues. The calculator implements rounding to handle common cases like `0.1 + 0.2`.

2. **Large Numbers**: Very large numbers may exceed JavaScript's Number.MAX_SAFE_INTEGER. The calculator will handle these within JavaScript's numeric limits.

3. **Performance**: Complex expressions with many nested operations may take longer to evaluate. The calculator is optimized for typical use cases.