
function join(list1: Item[], list2: Item[]) {
  return Array.from(new Set(list1.concat(list2)));
}


function cross(list1: Item[], list2: Item[]) {
  return list1.filter(element => list2.includes(element));
}

function expressionParser(exp: string) {
  const tmp = exp.split('');
  if (exp.includes('>')) {
    return [exp.slice(1, exp.indexOf('>')), exp.charAt(exp.indexOf('>')), exp.slice(exp.indexOf('>') + 1, exp.length - 1)];
  } else if (exp.includes('<')) {
    return [exp.slice(1, exp.indexOf('<')), exp.charAt(exp.indexOf('<')), exp.slice(exp.indexOf('<') + 1, exp.length - 1)];
  } else {
    return [exp.slice(1, exp.indexOf('=')), exp.slice(exp.indexOf('='), exp.indexOf('=') + 2), exp.slice(exp.indexOf('=') + 2, exp.length - 1)];
  }
}

function expressionToFunction(exp: string) {
  const functionDict = {
    '>': (key, value) => {
      function _(list) {
        return list.filter(item => {
          return item[key] > value;
        });
      }

      return _;
    },
    '<': (key, value) => {
      function _(list) {
        return list.filter(item => {
          return item[key] < value;
        });
      }

      return _;
    },
    '=': (key, value) => {
      function _(list) {
        return list.filter(item => {
          return item[key] == value;
        });
      }

      return _;
    },
  };

  const parsedExp = expressionParser(exp);
  const v = isNaN(+parsedExp[2]) ? parsedExp[2] : +parsedExp[2];

  return functionDict[parsedExp[1]](parsedExp[0], v);
}

export interface Item {
  Id: number;
  name: string;
  category: string;
  price: number;
  date: any;
  count: number;
}


export class Node {
  Left: Node;
  Right: Node;
  expression: string;
  method: any;

  constructor(exp: string = '') {
    this.expression = exp;
    this.Left = null;
    this.Right = null;

    if (this.expression === 'cross') {
      this.method = cross;
    } else if (this.expression === 'join') {
      this.method = join;
    } else {
      this.method = expressionToFunction(exp);
    }
  }
}

export class ExpressionTree {
  tree: Node;

  constructor(exp: string) {
    this.tree = this.reSetTreeExpression(exp);
  }

  reSetTreeExpression(exp: string) {


    if (exp[0] === '[') {
      return new Node(exp);
    }

    let firstIndex, lastIndex, flag = true, count = 0;

    for (let i = 0; i < exp.length; ++i) {
      if (exp[i] !== '(' && exp[i] !== ')') {
        continue;
      }
      if (exp[i] === '(' && flag) {
        firstIndex = i + 1;
        flag = false;
      }

      if (exp[i] === '(') {
        count++;
      }
      if (exp[i] === ')') {
        lastIndex = i;
        count--;
      }

      if (count === 0) {
        const node = new Node((exp[lastIndex + 1] === '&') ? 'cross' : 'join');

        node.Left = this.reSetTreeExpression(exp.slice(firstIndex, lastIndex));
        node.Right = this.reSetTreeExpression(exp.slice(lastIndex + 3, exp.length - 1));
        return node;
      }

    }

  }


}

