var screen = document.getElementById('calc__screen__inner').children[0];
var buttonList = document.querySelectorAll('.btn');

var operand__ff = '';
var operand__ss = '';
var operator = null;

var prev__clicked__equal = false;

buttonList.forEach((btn) => {
  btn.addEventListener('click', () => {
    var classList = btn.classList;
    if (classList.contains('num__btn')) {
      handlingOperands(btn);
    } else if (classList.contains('operator__btn')) {
      handlineOperators(btn);
    } else if (classList.contains('clear__btn')) {
      operand__ff = '';
      operand__ss = '';
      operator = null;
    } else {
      if (checkCondition()) {
        evaluateExpression();
        prev__clicked__equal = true;
      }
    }

    updateScreen();
  });
});

function handlingOperands(btn) {

  var num = btn.dataset.button;

  if (prev__clicked__equal) {
    prev__clicked__equal = false;
    operand__ff = num + '';
    operand__ss = '';
    operator = null;
    return;
  }

  prev__clicked__equal = false;
  if (operator == null) {
    if (operand__ff.includes('.') && num == '.') {
      return;
    }
    operand__ff += num;
  } else {
    if (operand__ss.includes('.') && num == '.') {
      return;
    }
    operand__ss += num;
  }
}

function handlineOperators(btn) {
  prev__clicked__equal = false;

  if (operand__ff.length == 0) {
    return;
  }
  if (operator != null) {
    if (operand__ff.length > 0 && operand__ss.length > 0) {
      evaluateExpression();
    } else {
      return;
    }
  }
  operator = btn.dataset.button;
}

function evaluateExpression() {
  var expression = operand__ff + operator + operand__ss;
  var ans = eval(expression);

  operand__ff = ans + '';
  operator = null;
  operand__ss = '';
}

function checkCondition() {
  if (operand__ff == '' || operand__ss == '' || operator == null) {
    return false;
  }
  return true;
}

function updateScreen() {
  var str = operand__ff;
  if (operator != null) {
    str += ' ';
    str += operator;
    str += ' ';
  }
  str += operand__ss;

  screen.innerText = str;
}
