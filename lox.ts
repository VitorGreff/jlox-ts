import fs from 'fs';
import readLine from 'readline';

class Lox {
  static fs = fs; // file scanner

  static main(args: string[]) {
    if (args.length > 1) { // more than one file
      console.log('Usage: jlox [script]');
      process.exit(64);
    } else if (args.length == 1) {
      this.runFile(args[0]);
    } else {
      this.runPrompt(); // REPL mode
    }
  }

  static runFile(path: string) {
    this.fs.readFile(path, 'utf8', (err: any, data: any) => {
      if (err) {
        console.error('Error reading file: ', err);
        process.exit(64);
      } else {
        this.run(data);
      }
    });
  }

  static runPrompt() {
    const rl = readLine.createInterface({ // stdin scanner
      input: process.stdin,
      output: process.stdout
    })

    const promptUser = () => {
      rl.question('> ', (line: string) => {
        if (line === null || line === '') {
          rl.close() // exit REPL mode
        } else {
          this.run(line) // run line by line
          promptUser() // continue to accept inputs
        }
      })
    }
    promptUser() // initialize REPL (closure reasons)
  }

  static run(source: String) {
    const tokens: string[] = source.split(' ');
    tokens.forEach((t) => console.log(t));
  }
}

Lox.main([]);
