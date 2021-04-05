function doubleEverySecondDigitFromRight(digits) {
  return digits.reverse().map(function (digit, index) {
    return index % 2 === 0 ? digit : digit * 2;
  }).reverse();
}

function sumDigits(digits) {
  return digits
          .join('')
          .split('')
          .map(function(number) { return parseInt(number)})
          .reduce(function(accumulator, currentValue) {
            return accumulator + currentValue
          } ,0);
}

function mod10(number) {
  return number % 10;
}

function luhn(cardNumber) {
  return 0 === mod10(sumDigits(doubleEverySecondDigitFromRight(cardNumber)));
}

function render() {
  ReactDOM.render (
    React.createElement('div', {className: 'credit-card'}, [
      React.createElement('div', {className: 'credit-card-number'}, [
        React.createElement('span', {className: 'first-col'}, '0000'),
        React.createElement('span', {className: 'second-col'}, '0000'),
        React.createElement('span', {className: 'third-col'}, '0000'),
        React.createElement('span', {className: 'fourth-col'}, '0000')
      ]),
      React.createElement('div', {className: 'credit-card-number second-row'}, [
        React.createElement('span', {className: 'first-col'}, '0000'),
        React.createElement('span', {className: 'second-col'}, '0000'),
        React.createElement('span', {className: 'third-col'}, '0000'),
        React.createElement('span', {className: 'fourth-col'}, '0000')
      ]),
      React.createElement('span', {className: 'card-holder'}, 'Alexander Petrov'),
      React.createElement('span', {className: 'card-holder second-row'}, 'Alexander Petrov')
    ]),
    document.getElementById('root')
  )
  const pattern = trianglify({
    width: document.querySelector('.credit-card').offsetWidth,
    height: document.querySelector('.credit-card').clientHeight,
    xColors: 'Purples',
    cellSize: 30
  })
  document.querySelector('.credit-card').appendChild(pattern.toCanvas());
}

render();