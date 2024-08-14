import { Lox } from "./Lox"
import { Token } from "./Token"
import { TokenType } from "./TokenType"

export class Scanner {
  private source: String = ''
  private tokens: Token[] = []
  private start: number = 0
  private current: number = 0
  private line: number = 1

  constructor(source: String) {
    this.source = source
  }

  scanTokens(): Token[] {
    while (!this.isAtEnd) {
      this.start = this.current // beginning of the next lexeme
      this.scanToken();
    }

    this.tokens.push(new Token(TokenType.EOF, "", null, this.line))
    return this.tokens;
  }

  private scanToken() {
    const c = this.advance();
    switch (c) {
      case '(': this.addToken(TokenType.LEFT_PAREN); break;
      case ')': this.addToken(TokenType.RIGHT_PAREN); break;
      case '{': this.addToken(TokenType.LEFT_BRACE); break;
      case '}': this.addToken(TokenType.RIGHT_BRACE); break;
      case ',': this.addToken(TokenType.COMMA); break;
      case '.': this.addToken(TokenType.DOT); break;
      case '-': this.addToken(TokenType.MINUS); break;
      case '+': this.addToken(TokenType.PLUS); break;
      case ';': this.addToken(TokenType.SEMICOLON); break;
      case '*': this.addToken(TokenType.STAR); break;
      case '!': this.addToken(this.match('=') ? TokenType.BANG_EQUAL : TokenType.BANG)
      case '=': this.addToken(this.match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL)
      case '<': this.addToken(this.match('=') ? TokenType.LESS_EQUAL : TokenType.LESS)
      case '>': this.addToken(this.match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER)
      default: Lox.error(this.line, "Unexpected character: " + c); break;
    }
  }

  private match(expected: string): boolean {
    if (this.isAtEnd())
      return false
    if (this.source.charAt(this.current) != expected)
      return false
    this.current++
    return true

  }

  private isAtEnd(): boolean {
    return this.current >= this.source.length
  }

  private advance(): string {
    // returns the char and THEN advance the pointer 
    return this.source.charAt(this.current++)
  }

  private addToken(type: TokenType) {
    this.addTokenAux(type, null)
  }

  private addTokenAux(type: TokenType, literal: Object | null) {
    const text: string = this.source.substring(this.start, this.current)
    this.tokens.push(new Token(type, text, literal, this.line))
  }
}
