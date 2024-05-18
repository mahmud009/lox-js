export class Expr {}

Expr.prototype.accept = function (visitor) {
  console.log(visitor);
  console.log(this);
  return visitor.visit(this);
};

class Binary extends Expr {
  constructor(left, operator, right) {
    super();
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}

class Grouping extends Expr {
  constructor(expression) {
    super();
    this.expression = expression;
  }
}

class Literal extends Expr {
  constructor(value) {
    super();
    this.value = value;
  }
}

class Unary extends Expr {
  constructor(operator, right) {
    super();
    this.operator = operator;
    this.right = right;
  }
}

// a + b = b + a
// ab = ba
//
