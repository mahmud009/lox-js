export const TokenType = {
  // Single-character tokens.
  LEFT_PAREN: "LEFT_PAREN", // (
  RIGHT_PAREN: "RIGHT_PAREN", // )
  LEFT_BRACE: "LEFT_BRACE", // {
  RIGHT_BRACE: "RIGHT_BRACE", // }
  COMMA: "COMMA", // ,
  DOT: "DOT", // .
  MINUS: "MINUS", // -
  PLUS: "PLUS", // +
  SEMICOLON: "SEMICOLON", // ;
  SLASH: "SLASH", // /
  STAR: "STAR", // *

  // One or two character tokens.
  BANG: "BANG", // !
  BANG_EQUAL: "BANG_EQUAL", // !=
  EQUAL: "EQUAL", // =
  EQUAL_EQUAL: "EQUAL_EQUAL", // ==
  GREATER: "GREATER", // >
  GREATER_EQUAL: "GREATER_EQUAL", // >=
  LESS: "LESS", // <
  LESS_EQUAL: "LESS_EQUAL", // <=

  // Literals.
  IDENTIFIER: "IDENTIFIER", // variable name
  STRING: "STRING", // "string"
  NUMBER: "NUMBER", // 123

  // Keywords.
  AND: "AND", // and
  CLASS: "CLASS", // class
  ELSE: "ELSE", // else
  FALSE: "FALSE", // false
  FUN: "FUN", // fun
  FOR: "FOR", // for
  IF: "IF", // if
  NIL: "NIL", // nil
  OR: "OR", // or
  PRINT: "PRINT", // print
  RETURN: "RETURN", // return
  SUPER: "SUPER", // super
  THIS: "THIS", // this
  TRUE: "TRUE", // true
  VAR: "VAR", // var
  WHILE: "WHILE", // while

  EOF: "EOF", // end of file
};
