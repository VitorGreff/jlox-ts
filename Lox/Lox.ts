import fs from 'fs';
import readLine from 'readline';
import { Scanner } from './Scanner';
import { Token } from './Token';

export class Lox {
  static hadError: boolean = false;

  static main(args: string[]): void {
    if (args.length > 1) {
      // more than one file
      console.log('Usage: jlox [script]');
      process.exit(64);
    } else if (args.length == 1) {
      this.runFile(args[0]);
    } else {
      this.runPrompt(); // REPL mode
    }
  }

  static runFile(path: string): void {
    fs.readFile(path, 'utf8', (err: any, data: string) => {
      if (err) {
        console.error('Error reading file: ', err);
        process.exit(65);
      } else {
        this.run(data);
        if (this.hadError) process.exit(65);
      }
    });
  }

  static runPrompt(): void {
    const rl = readLine.createInterface({
      // stdin scanner
      input: process.stdin,
      output: process.stdout,
    });

    const promptUser = () => {
      rl.question('> ', (line: string) => {
        if (line === null || line === '') {
          rl.close(); // exit REPL mode
        } else {
          this.run(line); // run line by line
          this.hadError = false;
          promptUser(); // continue to accept inputs
        }
      });
    };
    promptUser(); // initialize REPL (closure reasons)
  }

  static run(source: string): void {
    const scanner = new Scanner(source);
    const tokens: Token[] = scanner.scanTokens();
    tokens.forEach((t) => console.log(t));
  }

  static error(line: number, message: string): void {
    this.report(line, '', message);
  }

  private static report(line: number, where: string, message: string): void {
    console.log('[line ' + line + '] Error' + where + ': ' + message);
    this.hadError = true;
  }
}

Lox.main(process.argv.slice(2));
