var input,
    equation = '',
    number = '',
    operand = '',
    eq = '';

$(".key").click(function() {
  getInput($(this).text());
});

function getInput(key) {
  input = key;
  if (isNaN(input)) { //NOT A NUMBER
    if (input == 'C') clear();
    if (isOperator(input)) {
      getOperator(input);
    }
    if (input == '±') changeSign();
    if (input == '.') decimalPoint();    
    if (input == '=') showResult();
  } else { //NUMBER
    displayOperand(input);
  }
  eq = input;
}

function showResult() {
  var screen = $(".equation").text() + $(".display").text();
  if (screen == '') return;
  screen = screen.replace(/÷/g, ' / ');
  screen = screen.replace(/×/g, ' * ');
  screen = screen.replace(/−/g, ' - ');
  result = eval(screen);
  if (result.toString().length > 10) result = result.toPrecision(4);
  $(".equation").text('');
  equation = '';
  operand = '';
  eq = '';
  input = '';
  display(result);
  
}

function displayOperand(key) {
  if (operand.length == 10) return;
  if ((key == '0') && (operand == '0')) {
    return;
  } else if (operand == '0') {
    operand = key;
  } else {
  operand = operand + key;
  }
  display(operand);
}

function decimalPoint() {
  if (operand == '') {
    operand = '0.';
  } else if (operand.indexOf('.') < 0) {
    operand = operand + '.';
  }
  display(operand);
}

function changeSign() {
  if (isNaN(operand)) return;
  if (operand == '') {
    return;
  } else if (operand == '0') {
    return;
  } else {
    if (operand.substring(0, 1) == '-') {
      operand = operand.substring(1);
    } else {
      operand = '-' + operand;
    }
  }
  display(operand);
}

function clear() {
  input = '';
  equation = '';
  operand = '';
  eq = '';
  display('');
  displayEquation('');
}

function isOperator(key) {
  if (key == '÷' || key == '×' || key == '−' || key == '+') {
    return true;
  }
}

function getOperator(key) {
  if (isNaN(operand)) return;
  var operator = key;
  if (getDisplay() == '') return;
  operand = '';
  var len = eq.length;
  var lastChar = eq.substring(len - 1, len);
  if (isOperator(lastChar)) {
    eq = eq.substring(0, len-1);
    equation = equation.substring(0, equation.length - 1) + operator;
  } else {
    var equ = eval(getDisplay())
    if (equ !== '' && equ.toString().length > 10) {
      display(equ.toPrecision(4));
    } else {
      display(equ);
    }
    equation = equation + getDisplay() + operator;
  }
  displayEquation(equation);
}

function getDisplay() {
  return $(".display").text();
}

function display(item) {
  $(".display").text(item);
}

function displayEquation(item) {
  $(".equation").text(item);
}