const displayPrevius = document.querySelector('.previus')
const displayCurrent = document.querySelector('.current')
const buttons = document.querySelectorAll('.buttons button') //NodeList

class Calculadora {
  constructor(displayCurrent, displayPrevius) {
    this.displayCurrent = displayCurrent
    this.displayPrevius = displayPrevius
    this.current = ''
  }

  addDigit(digit) {
    if (digit === '.' && this.current.includes('.')) {
      return
    }
    this.current += digit
    displayCurrent.innerText = this.current
  }

  //OPERATIONS

  operations(operation) {

    let previus
    let current

    switch (operation) {
      case 'CE':
        this.clearCurrent()
        break;
      case 'C':
        this.clearAllCurrents()
        break;
      case 'DEL':
        this.deleteLastDigit()
        break;
      case '+':
        displayPrevius.innerText = this.current + ' + '
        displayCurrent.innerText = ''
        this.current = ''

        break;
      case '-':
        displayPrevius.innerText = this.current + ' - '
        displayCurrent.innerText = ''
        this.current = ''
        break;
      case 'x':
        displayPrevius.innerText = this.current + ' x '
        displayCurrent.innerText = ''
        this.current = ''
        break;
      case '/':
        displayPrevius.innerText = this.current + ' / '
        displayCurrent.innerText = ''
        this.current = ''
        break;
      case '=':
        const previusExpression = displayPrevius.innerText.split(' ')
        const operator = previusExpression[1]
        previus = +previusExpression[0]
        current = +displayCurrent.innerText
        let result;

        switch (operator) {
          case '+':
            result = previus + current;
            break;
          case '-':
            result = previus - current;
            break;
          case 'x':
            result = previus * current;
            break;
          case '/':
            result = previus / current;
            break;
          default:
            break;
        }

        displayCurrent.innerText = result.toString()
        displayPrevius.innerText = ''
        this.current = result.toString()
        break;
      default:
        break;
    }
  }

  // CLEANERS
  clearCurrent() {
    this.current = ''
    displayCurrent.innerText = ''
  }

  clearAllCurrents() {
    this.current = ''
    displayCurrent.innerText = ''
    displayPrevius.innerText = ''
  }

  deleteLastDigit() {
    this.current = this.current.slice(0, -1);
    displayCurrent.innerText = this.current;
  }



}


const calc = new Calculadora(displayCurrent, displayPrevius)

buttons.forEach(function (button) {
  button.addEventListener('click', (value) => {
    const buttonValue = value.target.innerText

    if (buttonValue >= 0 || buttonValue === '.') {
      calc.addDigit(buttonValue)
    } else {
      calc.operations(buttonValue)
    }

  })
})