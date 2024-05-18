import { TokenType } from "./TokenType";
import { Token } from "./Token";
import { loxError } from "./Lox";
import { Keywords } from "./Keywords";

export class Scanner {
  constructor(source) {
    this.source = source;
    this.tokens = [];

    this.start = 0;
    this.current = 0;
    this.line = 1;
  }

  scanTokens() {
    while (!this.isAtEnd()) {
      this.start = this.current;
      this.scanToken();
    }
    this.tokens.push(new Token(TokenType.EOF, "", null, this.line));
    return this.tokens;
  }

  scanToken() {
    let c = this.advance();

    switch (c) {
      // matching single character tokens
      case "(":
        this.addToken(TokenType.LEFT_PAREN);
        break;
      case ")":
        this.addToken(TokenType.RIGHT_PAREN);
        break;
      case "{":
        this.addToken(TokenType.LEFT_BRACE);
        break;
      case "}":
        this.addToken(TokenType.RIGHT_BRACE);
        break;
      case ",":
        this.addToken(TokenType.COMMA);
        break;
      case ".":
        this.addToken(TokenType.DOT);
        break;
      case "-":
        this.addToken(TokenType.MINUS);
        break;
      case "+":
        this.addToken(TokenType.PLUS);
        break;
      case ";":
        this.addToken(TokenType.SEMICOLON);
        break;
      case "*":
        this.addToken(TokenType.STAR);
        break;

      // matching one or two character tokens
      case "!":
        this.addToken(this.match("=") ? TokenType.BANG_EQUAL : TokenType.BANG);
        break;
      case "=":
        this.addToken(
          this.match("=") ? TokenType.EQUAL_EQUAL : TokenType.EQUAL
        );
        break;
      case "<":
        this.addToken(this.match("=") ? TokenType.LESS_EQUAL : TokenType.LESS);
        break;
      case ">":
        this.addToken(
          this.match("=") ? TokenType.GREATER_EQUAL : TokenType.GREATER
        );
        break;

      // matching backslash
      case "/":
        if (this.match("/")) {
          while (this.peek() !== "\n" && !this.isAtEnd()) this.advance();
        } else {
          this.addToken(TokenType.SLASH);
        }
        break;

      // dealing with meaningless characters
      case " ":
      case "\r":
      case "\t":
        break;
      case "\n":
        this.line++;
        break;

      // matching string literals
      case '"':
        this.string();
        break;

      // throwing loxError with unknown matches
      default:
        if (this.isDigit(c)) {
          this.number();
        } else if (this.isAlpha(c)) {
          this.identifier();
        } else {
          loxError(this.line, `Unexpected character: ${c}`);
        }
    }
  }

  advance() {
    return this.source.charAt(this.current++);
  }

  isAtEnd() {
    return this.current >= this.source.length;
  }

  addToken(type, literal = null) {
    if (literal == null) {
      this.tokens.push(new Token(type, null, null, this.line));
      return;
    }
    const lexeme = this.source.substring(this.start, this.current);
    this.tokens.push(new Token(type, lexeme, literal, this.line));
  }

  match(char) {
    if (this.isAtEnd()) return false;
    if (this.source.charAt(this.current) !== char) return false;
    this.current++;
    return true;
  }

  peek() {
    if (this.isAtEnd()) return "\0";
    return this.source.charAt(this.current);
  }

  peekNext() {
    if (this.current + 1 >= this.source.length) return "\0";
    return this.source.charAt(this.current + 1);
  }

  string() {
    while (this.peek() != '"' && !this.isAtEnd()) {
      if (this.peek() == "\n") this.line++;
      this.advance();
    }

    if (this.isAtEnd()) {
      loxError(this.line, "Unterminated string.");
      return;
    }

    // the closing "
    this.advance();
    const literal = this.source.substring(this.start + 1, this.current - 1);
    this.addToken(TokenType.STRING, literal);
  }

  isDigit(char) {
    return char >= "0" && char <= "9";
  }

  isAlpha(c) {
    return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c == "-";
  }

  isAlphaNumeric(c) {
    return this.isAlpha(c) || this.isDigit(c);
  }

  number() {
    while (this.isDigit(this.peek())) this.advance();

    if (this.peek() === "." && this.isDigit(this.peekNext())) {
      // consume the "."
      this.advance();

      while (this.isDigit(this.peek())) this.advance();
    }

    this.addToken(
      TokenType.NUMBER,
      parseFloat(this.source.substring(this.start, this.current))
    );
  }

  identifier() {
    while (this.isAlphaNumeric(this.peek())) this.advance();
    const text = this.source.substring(this.start, this.current);
    const type = Keywords[text] || TokenType.IDENTIFIER;
    console.log(type);
    this.addToken(type);
  }
}
