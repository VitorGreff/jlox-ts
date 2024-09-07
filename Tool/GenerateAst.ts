import fs from 'fs';

export abstract class GenerateAst {
  public static main(args: string[]): void {
    if (args.length !== 1) {
      console.error('Usage: generate_ast <output directory>');
      process.exit(64);
    }
    const outputDir = args[0];

    this.defineAst(outputDir, 'Expr', [
      'Binary   : Expr left, Token operator, Expr right',
      'Grouping : Expr expression',
      'Literal  : Object value',
      'Unary    : Token operator, Expr right',
    ]);
  }

  private static defineAst(
    outputDir: string,
    baseName: string,
    types: string[]
  ): void {
    const path = outputDir + '/' + baseName + '.ts';
    let content = '';

    content += `import { Token } from '../Lox/Token';\n\n`;

    content += this.defineVisitor(baseName, types);

    content += `export abstract class ${baseName} {\n`;
    content += `  abstract accept<R>(visitor: Visitor<R>): R;\n`;
    content += `}\n\n`;

    types.forEach((type) => {
      const [className, fields] = type.split(':').map((s) => s.trim());
      content += this.defineType(baseName, className, fields);
    });

    fs.writeFileSync(path, content, 'utf-8');
  }

  private static defineVisitor(baseName: string, types: string[]): string {
    let content = `export interface Visitor<R> {\n`;

    types.forEach((type) => {
      const className = type.split(':')[0].trim();
      content += `  visit${className}${baseName}(${baseName.toLowerCase()}: ${className}): R;\n`;
    });
    content += `}\n\n`;
    return content;
  }

  private static defineType(
    baseName: string,
    className: string,
    fieldList: string
  ): string {
    let content = `export class ${className} extends ${baseName} {\n`;
    const fields = fieldList.split(', ');

    // Constructor
    content += `  constructor(${fields.map((field) => `${field.split(' ')[1]}: ${field.split(' ')[0]}`).join(', ')}) {\n`;
    content += `    super();\n`;

    // Store parameters in fields
    fields.forEach((field) => {
      const [, name] = field.split(' ');
      content += `    this.${name} = ${name};\n`;
    });

    content += `  }\n\n`;

    // Fields
    fields.forEach((field) => {
      const [type, name] = field.split(' ');
      content += `  ${name}: ${type};\n`;
    });

    // Accept method
    content += `\n  accept<R>(visitor: Visitor<R>): R {\n`;
    content += `    return visitor.visit${className}${baseName}(this);\n`;
    content += `  }\n`;

    content += `}\n\n`;
    return content;
  }
}

GenerateAst.main(process.argv.slice(2));
