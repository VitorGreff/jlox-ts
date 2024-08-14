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
      default: Lox.error(this.line, "Unexpected character: " + c); break;
    }
  }

  private isAtEnd(): boolean {
    return this.current >= this.source.length
  }

  private advance(): string {
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
