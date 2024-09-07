import { Token } from '../Lox/Token';

export interface Visitor<R> {
  visitBinaryExpr(expr: Binary): R;
  visitGroupingExpr(expr: Grouping): R;
  visitLiteralExpr(expr: Literal): R;
  visitUnaryExpr(expr: Unary): R;
}

export abstract class Expr {
  abstract accept<R>(visitor: Visitor<R>): R;
}

export class Binary extends Expr {
  constructor(left: Expr, operator: Token, right: Expr) {
    super();
    this.left = left;
    this.operator = operator;
    this.right = right;
  }

  left: Expr;
  operator: Token;
  right: Expr;

  accept<R>(visitor: Visitor<R>): R {
    return visitor.visitBinaryExpr(this);
  }
}

export class Grouping extends Expr {
  constructor(expression: Expr) {
    super();
    this.expression = expression;
  }

  expression: Expr;

  accept<R>(visitor: Visitor<R>): R {
    return visitor.visitGroupingExpr(this);
  }
}

export class Literal extends Expr {
  constructor(value: Object) {
    super();
    this.value = value;
  }

  value: Object;

  accept<R>(visitor: Visitor<R>): R {
    return visitor.visitLiteralExpr(this);
  }
}

export class Unary extends Expr {
  constructor(operator: Token, right: Expr) {
    super();
    this.operator = operator;
    this.right = right;
  }

  operator: Token;
  right: Expr;

  accept<R>(visitor: Visitor<R>): R {
    return visitor.visitUnaryExpr(this);
  }
}

