// enum like object
export const TokenType = {
  // single-character
  LEFT_PAREN: 'LEFT_PAREN',
  RIGHT_PAREN: 'RIGHT_PAREN',
  LEFT_BRACE: 'LEFT_BRACE',
  RIGHT_BRACE: 'RIGHT_BRACE',
  COMMA: 'COMMA',
  DOT: 'DOT',
  MINUS: 'MINUS',
  PLUS: 'PLUS',
  SEMICOLON: 'SEMICOLON',
  SLASH: 'SLASH',
  STAR: 'STAR',
  // one or two characters
  BANG: 'BANG',
  BANG_EQUAL: 'BANG_EQUAL',
  EQUAL: 'EQUAL',
  EQUAL_EQUAL: 'EQUAL_EQUAL',
  GREATER: 'GREATER',
  GREATER_EQUAL: 'GREATER_EQUAL',
  LESS: 'LESS',
  LESS_EQUAL: 'LESS_EQUAL',
  // literals
  IDENTIFIER: 'IDENTIFIER',
  STRING: 'STRING',
  NUMBER: 'NUMBER',
  // keywords
  AND: 'AND',
  CLASS: 'CLASS',
  ELSE: 'ELSE',
  FALSE: 'FALSE',
  FUN: 'FUN',
  FOR: 'FOR',
  IF: 'IF',
  NIL: 'NIL',
  OR: 'OR',
  PRINT: 'PRINT',
  RETURN: 'RETURN',
  SUPER: 'SUPER',
  THIS: 'THIS',
  TRUE: 'TRUE',
  VAR: 'VAR',
  WHILE: 'WHILE',
  EOF: 'EOF',
} as const; // makes the object immutable (readonly)

// This creates a union type of all the string literal values
export type TokenType = (typeof TokenType)[keyof typeof TokenType];
// 1. takes the object structure (typeof TokenType)
// 2. creates a union of each string key (keyof typeof TokenType)
// 3. get indexed access - values, not keys - ([...])
// 4. takes the final type structure (typeof TokenType ...)
// --> this basically results in a union of the object values
