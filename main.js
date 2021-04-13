function reducer(model, action){
  switch(action.type) {
    case 'SET-CARD-NUMBER':
      model.cardNumber = action.payload.split('');
      return model;
    case 'SET-EXPIRY-DATE':
      model.expiryDate = action.payload.split('');
      return model;
    case 'SET-CARD-HOLDER':
      model.cardHolder = action.payload.split('');
      return model;
    default:
      return model;
  }
}

var store = Redux.createStore(reducer, {
  cardNumber: [],
  expiryDate: [],
  cardHolder: []
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
  var state = store.getState();
  var expiryDate = state.expiryDate.slice(0, 2).join('') + '/'
  + store.getState().expiryDate.slice(2, 4).join('');

  var firstCol = state.cardNumber.length ? state.cardNumber.slice(0, 4) : '0000';
  var secondCol = state.cardNumber.length ? state.cardNumber.slice(4, 8) : '0000';
  var thirdCol = state.cardNumber.length ? state.cardNumber.slice(8, 12) : '0000';
  var fourthCol = state.cardNumber.length ? state.cardNumber.slice(12, 16) : '0000';

  ReactDOM.render (
    e(ReactRedux.Provider, { store: store }, [
      e('div', {className: 'credit-card'}, [
        e('div', {className: 'chip'}, [
          e('div', {className: 'side-top-left'}, ''),
          e('div', {className: 'top'}, ''),
          e('div', {className: 'center'}, ''),
          e('div', {className: 'bottom'}, ''),
          e('div', {className: 'side-right'}, ''),
          e('div', {className: 'vertical-top'}, ''),
          e('div', {className: 'vertical-center'}, ''),
          e('div', {className: 'vertical-bottom'}, ''),
        ]),
        e('div', {className: 'credit-card-number'}, [
          e('input', {type: 'text', maxLength: '16', onInput: function(event) {
            store.dispatch({type: 'SET-CARD-NUMBER', payload: event.target.value})
            }}, null),
          e('span', {className: 'metal first-col'}, firstCol),
          e('span', {className: 'metal second-col'}, secondCol),
          e('span', {className: 'metal third-col'}, thirdCol),
          e('span', {className: 'metal fourth-col'}, fourthCol),
          e('span', {className: 'metal second-row first-col'}, firstCol),
          e('span', {className: 'metal second-row second-col'}, secondCol),
          e('span', {className: 'metal second-row third-col'}, thirdCol),
          e('span', {className: 'metal second-row fourth-col'}, fourthCol)
        ]),
        e('div', {className: 'expiry-dates'}, [
          e('input', {type: 'text', maxLength: '4', onInput: function(event) {
            store.dispatch({type: 'SET-EXPIRY-DATE', payload: event.target.value})
          }}, null),
          e('span', {className: 'dates'}, expiryDate),
          e('span', {className: 'dates second-row'}, expiryDate)
        ]),
        e('div', {className: 'card-holder'}, [
          e('input', {type: 'text', onInput: function(event) {
            store.dispatch({type: 'SET-CARD-HOLDER', payload: event.target.value})
          }}, null),
          e('span', {className: 'metal'}, state.cardHolder),
          e('span', {className: 'metal second-row'}, state.cardHolder)
        ]),
        e('img', {className: 'logo', src: './img/master_card.jpg'}, null)
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
  if (document.querySelector('canvas') === null) {
    document.querySelector('.credit-card').appendChild(pattern.toCanvas());
  }
}

store.subscribe(function() { render(); });
render();
