// Simple Calculator Tests

// Import the calculator function
const { calculate } = require('../src/calculator');

// Test basic operations
console.log('Testing basic operations...');

// Test addition
try {
    const result1 = calculate('2 + 3');
    console.log(`2 + 3 = ${result1} (Expected: 5) - ${result1 === 5 ? 'PASS' : 'FAIL'}`);
} catch (error) {
    console.log(`Error in 2 + 3: ${error.message}`);
}

// Test subtraction
try {
    const result2 = calculate('10 - 4');
    console.log(`10 - 4 = ${result2} (Expected: 6) - ${result2 === 6 ? 'PASS' : 'FAIL'}`);
} catch (error) {
    console.log(`Error in 10 - 4: ${error.message}`);
}

// Test multiplication
try {
    const result3 = calculate('3 * 4');
    console.log(`3 * 4 = ${result3} (Expected: 12) - ${result3 === 12 ? 'PASS' : 'FAIL'}`);
} catch (error) {
    console.log(`Error in 3 * 4: ${error.message}`);
}

// Test division
try {
    const result4 = calculate('15 / 3');
    console.log(`15 / 3 = ${result4} (Expected: 5) - ${result4 === 5 ? 'PASS' : 'FAIL'}`);
} catch (error) {
    console.log(`Error in 15 / 3: ${error.message}`);
}

// Test order of operations: 2 + 3 * 4 should equal 14 (not 20)
try {
    const result5 = calculate('2 + 3 * 4');
    console.log(`2 + 3 * 4 = ${result5} (Expected: 14) - ${result5 === 14 ? 'PASS' : 'FAIL'}`);
} catch (error) {
    console.log(`Error in 2 + 3 * 4: ${error.message}`);
}

// Test parentheses: (2 + 3) * 4 should equal 20
try {
    const result6 = calculate('(2 + 3) * 4');
    console.log(`(2 + 3) * 4 = ${result6} (Expected: 20) - ${result6 === 20 ? 'PASS' : 'FAIL'}`);
} catch (error) {
    console.log(`Error in (2 + 3) * 4: ${error.message}`);
}

// Test decimal numbers
try {
    const result7 = calculate('2.5 + 1.5');
    console.log(`2.5 + 1.5 = ${result7} (Expected: 4) - ${result7 === 4 ? 'PASS' : 'FAIL'}`);
} catch (error) {
    console.log(`Error in 2.5 + 1.5: ${error.message}`);
}

// Test complex expression
try {
    const result8 = calculate('(10 + 5) / 3 * 2');
    console.log(`(10 + 5) / 3 * 2 = ${result8} (Expected: 10) - ${result8 === 10 ? 'PASS' : 'FAIL'}`);
} catch (error) {
    console.log(`Error in (10 + 5) / 3 * 2: ${error.message}`);
}

// Test edge case: division by zero (Task T009)
try {
    const result9 = calculate('5 / 0');
    console.log(`5 / 0 = ${result9} - FAIL (should have thrown error)`);
} catch (error) {
    console.log(`5 / 0 correctly threw error: ${error.message} - PASS`);
}

// Test invalid expression (Task T006)
try {
    const result10 = calculate('2 + * 3');
    console.log(`2 + * 3 = ${result10} - FAIL (should have thrown error)`);
} catch (error) {
    console.log(`2 + * 3 correctly threw error: ${error.message} - PASS`);
}

console.log('Testing complete!');