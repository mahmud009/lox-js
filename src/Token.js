/**
 * Token class
 * @class Token
 * @param {string} type - The type of the token
 * @param {string} lexeme - The lexeme of the token
 * @param {string} literal - The literal of the token
 * @param {number} line - The line number of the token
 */
export class Token {
  constructor(type, lexeme, literal, line) {
    this.type = type;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
  }

  toString() {
    return `${type} ${lexeme} ${literal}`;
  }
}
