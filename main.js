function reducer(model, action){
  switch(action.type) {
    case 'SET-CARD-NUMBER':
      model.cardNumber = action.payload.split("");
      return model;
    default:
      return model;
  }
}

var store = Redux.createStore(reducer, {
  cardNumber: []
});

const e = React.createElement;

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
    React.createElement(ReactRedux.Provider, { store: store }, [
      React.createElement('div', {className: 'credit-card'}, [
        React.createElement('div', {className: 'credit-card-inner'}, [
          React.createElement('div', {className: 'credit-card-front'}, [
            React.createElement('div', {className: 'chip'}, [
              React.createElement('div', {className: 'side-top-left'}, ''),
              React.createElement('div', {className: 'top'}, ''),
              React.createElement('div', {className: 'center'}, ''),
              React.createElement('div', {className: 'bottom'}, ''),
              React.createElement('div', {className: 'side-right'}, ''),
              React.createElement('div', {className: 'vertical-top'}, ''),
              React.createElement('div', {className: 'vertical-center'}, ''),
              React.createElement('div', {className: 'vertical-bottom'}, ''),
            ]),
            React.createElement('div', {className: 'credit-card-number'}, [
              React.createElement('input', {type: 'text', maxLength: '16', onInput: function(event) {
                store.dispatch({type: 'SET-CARD-NUMBER', payload: event.target.value})
                }}, null),
              React.createElement('span', {className: 'metal first-col'}, store.getState().cardNumber.slice(0, 4)),
              React.createElement('span', {className: 'metal second-col'}, store.getState().cardNumber.slice(4, 8)),
              React.createElement('span', {className: 'metal third-col'}, store.getState().cardNumber.slice(8, 12)),
              React.createElement('span', {className: 'metal fourth-col'}, store.getState().cardNumber.slice(12, 16)),
              React.createElement('span', {className: 'metal second-row first-col'}, store.getState().cardNumber.slice(0, 4)),
              React.createElement('span', {className: 'metal second-row second-col'}, store.getState().cardNumber.slice(4, 8)),
              React.createElement('span', {className: 'metal second-row third-col'}, store.getState().cardNumber.slice(8, 12)),
              React.createElement('span', {className: 'metal second-row fourth-col'}, store.getState().cardNumber.slice(12, 16))
            ]),
            React.createElement('div', {className: 'expiry-dates'}, [
              React.createElement('input', {type: 'text'}, null),
              React.createElement('span', {className: 'dates'}, 'MM/YY'),
              React.createElement('span', {className: 'dates second-row'}, 'MM/YY')
            ]),
            React.createElement('div', {className: 'card-holder'}, [
              React.createElement('input', {type: 'text'}, null),
              React.createElement('span', {className: 'metal'}, 'Alexander Petrov'),
              React.createElement('span', {className: 'metal second-row'}, 'Alexander Petrov')
            ])
          ]),
        ])
      ]),
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

store.subscribe(function() { render(); });
render();
