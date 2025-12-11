# Data Models: Calculator Expression Parser

## Core Entities

### Expression
Represents a mathematical expression to be evaluated.

```typescript
interface Expression {
  rawString: string;        // The original input expression
  isValid: boolean;         // Validation status
  errorMessage: string | null; // Error details if invalid
  tokens: Token[];          // Parsed tokens from the expression
  result: number | null;    // Calculated result if valid
}
```

### Token
Represents a single element in the tokenized expression.

```typescript
type TokenType = 'NUMBER' | 'OPERATOR' | 'PARENTHESIS' | 'WHITESPACE';

interface Token {
  type: TokenType;
  value: string | number;   // The actual value of the token
  position: number;         // Position in the original string
}
```

### OperationResult
Container for the result of an evaluation operation.

```typescript
interface OperationResult {
  success: boolean;
  value: number | null;     // Result if successful
  error: CalculationError | null; // Error if unsuccessful
}
```

### CalculationError
Detailed information about an error that occurred during evaluation.

```typescript
type ErrorType = 'SYNTAX_ERROR' | 'VALIDATION_ERROR' | 'MATHEMATICAL_ERROR' | 'LEXICAL_ERROR';

interface CalculationError {
  type: ErrorType;
  message: string;          // Human-readable error message
  position: number | null;  // Position where error occurred (if applicable)
  originalExpression: string; // The expression that caused the error
}
```

### Operator
Information about mathematical operators.

```typescript
interface Operator {
  symbol: string;           // The operator character (+, -, *, /)
  precedence: number;       // Precedence level (higher number = higher precedence)
  associativity: 'left' | 'right'; // Associativity rule
}
```

## Validation Information

### ValidationInfo
Detailed validation results.

```typescript
interface ValidationInfo {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

interface ValidationError {
  type: ErrorType;
  message: string;
  position: number;
}

interface ValidationWarning {
  type: 'PRECISION_WARNING' | 'LARGE_NUMBER_WARNING';
  message: string;
  position?: number;
}
```

## Internal Processing Models

### PostfixExpression
Postfix (Reverse Polish Notation) representation of an expression for evaluation.

```typescript
interface PostfixExpression {
  tokens: Token[];
  originalInfix: string;
}
```

### EvaluationContext
State maintained during expression evaluation.

```typescript
interface EvaluationContext {
  operandStack: number[];   // Stack for operands during evaluation
  currentResult: number | null; // Current intermediate result
  lastOperation: string | null; // Last operation performed
}
```