import { Lox } from './Lox';
import { Token } from './Token';
import { TokenType } from './TokenType';

export class Scanner {
  private source: string = '';
  private tokens: Token[] = [];
  private start: number = 0;
  private current: number = 0;
  private line: number = 1;

  constructor(source: string) {
    this.source = source;
  }

  scanTokens(): Token[] {
    while (!this.isAtEnd) {
      this.start = this.current; // beginning of the next lexeme
      this.scanToken();
    }

    this.tokens.push(new Token(TokenType.EOF, '', null, this.line));
    return this.tokens;
  }

  private scanToken() {
    const c = this.advance();
    switch (c) {
      case '(':
        this.addToken(TokenType.LEFT_PAREN);
        break;
      case ')':
        this.addToken(TokenType.RIGHT_PAREN);
        break;
      case '{':
        this.addToken(TokenType.LEFT_BRACE);
        break;
      case '}':
        this.addToken(TokenType.RIGHT_BRACE);
        break;
      case ',':
        this.addToken(TokenType.COMMA);
        break;
      case '.':
        this.addToken(TokenType.DOT);
        break;
      case '-':
        this.addToken(TokenType.MINUS);
        break;
      case '+':
        this.addToken(TokenType.PLUS);
        break;
      case ';':
        this.addToken(TokenType.SEMICOLON);
        break;
      case '*':
        this.addToken(TokenType.STAR);
        break;
      case '!':
        this.addToken(this.match('=') ? TokenType.BANG_EQUAL : TokenType.BANG);
        break;
      case '=':
        this.addToken(
          this.match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL
        );
        break;
      case '<':
        this.addToken(this.match('=') ? TokenType.LESS_EQUAL : TokenType.LESS);
        break;
      case '>':
        this.addToken(
          this.match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER
        );
        break;
      case '/':
        if (this.match('/')) {
          while (this.peek() !== '\n' && !this.isAtEnd()) this.advance();
        } else {
          this.addToken(TokenType.SLASH);
        }
        break;
      case ' ':
      case '\r':
      case '\t':
        break; // just ignore those characters
      case '\n':
        this.line++;
        break;
      case '"': this.string(); break;
      default:
        if (this.isDigit(c)) {
          this.number()
        } else {
          Lox.error(this.line, 'Unexpected character: ' + c);
          break;
        }
    }
  }

  private number() {
    while (this.isDigit(this.peek()))
      this.advance()
    if (this.peek() === '.' && this.isDigit(this.peekNext())) {
      this.advance
      while (this.isDigit(this.peek()))
        this.advance
    }
    // we only have floating numbers
    this.addTokenWithLiteral(TokenType.NUMBER, Number.parseFloat(this.source.substring(this.start, this.current)))
  }

  private string() {
    while (this.peek() !== '"' && !this.isAtEnd()) {
      if (this.peek() === '\n')
        this.line++
      this.advance()
    }
    if (this.isAtEnd()) {
      Lox.error(this.line, "Unterminated string.")
    }

    this.advance() // closing string

    // ignoring both double quotes and processing its value
    const value = this.source.substring(this.start + 1, this.current - 1)
    this.addTokenWithLiteral(TokenType.STRING, value)
  }

  private match(expected: string): boolean {
    if (this.isAtEnd()) return false;
    if (this.source.charAt(this.current) !== expected) return false;
    this.current++;
    return true;
  }

  private peek(): string {
    if (this.isAtEnd()) return '\0';
    return this.source.charAt(this.current);
  }

  private peekNext(): string {
    if (this.current + 1 >= this.source.length)
      return '\0'
    return this.source.charAt(this.current + 1)
  }

  private isDigit(c: string) {
    return c >= '0' && c <= '9'
  }

  private isAtEnd(): boolean {
    return this.current >= this.source.length;
  }

  private advance(): string {
    // returns the char and THEN advance the pointer
    return this.source.charAt(this.current++);
  }

  private addToken(type: TokenType) {
    this.addTokenWithLiteral(type, null);
  }

  private addTokenWithLiteral(type: TokenType, literal: Object | null) {
    const text: string = this.source.substring(this.start, this.current);
    this.tokens.push(new Token(type, text, literal, this.line));
  }
}
