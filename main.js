function reducer(model, action){
  switch(action.type) {
    case 'SET-CARD-NUMBER':
      model.cardNumber = action.payload.replace(/\D+/g, '').split('');
      return model;
    case 'SET-EXPIRY-DATE':
      model.expiryDate = action.payload.replace(/\D+/g, '').split('');
      return model;
    case 'SET-CARD-HOLDER':
      model.cardHolder = action.payload.replace(/[^a-zA-Z|\-|\s]/g, '').toUpperCase();
      return model;
    case 'FLIP-CARD':
      model.cardIsFlipped = !model.cardIsFlipped;
      return model;
    case 'SET-VERIFICATION-CODE':
      model.verificationCode = action.payload.replace(/\D+/g, '').split('');
    default:
      return model;
  }
}

var store = Redux.createStore(reducer, {
  cardNumber: [],
  expiryDate: [],
  cardHolder: '',
  cardIsFlipped: false,
  verificationCode: []
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

function cardProvider(cardNumber) {
  switch (cardNumber[0]) {
    case '3':
      return e('img', {className: 'americanExpress-logo', src: './img/american-express.png'}, null);
    case '4':
      return e('img', {className: 'visa-logo', src: './img/visa.png'}, null);
    case '5':
      return e('img', {className: 'mastercard-logo', src: './img/master-card.png'}, null);
    default:
      return null;
  }
}


function render() {
  var state = store.getState();
  var expirySeparator = state.expiryDate.length >= 2 ? '/' : '';
  var expiryDate = state.expiryDate.length ? state.expiryDate.slice(0, 2).join('') + expirySeparator
  + store.getState().expiryDate.slice(2, 4).join('') : 'MM/YY';
  var verificationCode = state.verificationCode.length ? state.verificationCode.slice(0, 3).join('') : 'CVV/CVC';


  var firstCol = state.cardNumber.length ? state.cardNumber.slice(0, 4) : '0000';
  var secondCol = state.cardNumber.length ? state.cardNumber.slice(4, 8) : '0000';
  var thirdCol = state.cardNumber.length ? state.cardNumber.slice(8, 12) : '0000';
  var fourthCol = state.cardNumber.length ? state.cardNumber.slice(12, 16) : '0000';

  var cardHolder = state.cardHolder.length ? state.cardHolder : 'ALEXANDER PETROV';

  ReactDOM.render (
    e(ReactRedux.Provider, { store: store }, [
      e('div', {className: 'credit-card ' + (state.cardIsFlipped ? 'flipped' : '')}, [
        e('div', {className: 'credit-card-front'}, [
          e('div', {className: 'bank-name'}, 'Spacious bank'),
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
            e('div', {className: 'top-side'}, 'Month/Year'),
            e('div', {className: 'left-side'}, 'Valid thru'),
            e('div', {className: 'arrow-right'}, null),
            e('input', {type: 'text', maxLength: '4', onInput: function(event) {
              store.dispatch({type: 'SET-EXPIRY-DATE', payload: event.target.value})
            }}, null),
            e('span', {className: 'dates'}, expiryDate),
            e('span', {className: 'dates second-row'}, expiryDate)
          ]),
          e('div', {className: 'card-holder'}, [
            e('input', {type: 'text', value: state.cardHolder, maxLength: '23', onInput: function(event) {
              store.dispatch({type: 'SET-CARD-HOLDER', payload: event.target.value})
            }}, null),
            e('span', {className: 'metal'}, cardHolder),
            e('span', {className: 'metal second-row'}, cardHolder)
          ]),
          cardProvider(state.cardNumber)
        ]),
        e('div', {className: 'credit-card-back'}, [
          e('div', {className: 'magnetic-stripe'}, []),
          e('div', {className: 'verification-code'}, [
            e('input', {type: 'text', maxLength: '4', onInput: function(event) {
              console.log(event);
              store.dispatch({type: 'SET-VERIFICATION-CODE', payload: event.target.value})
            }}, null),
            e('span', {className: 'code'}, verificationCode)
          ]),
          e('div', {className: 'lorem-text'}, [
            (e('p', {className: 'first-row'}, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa tincidunt nunc pulvinar sapien et ligula.')),
            (e('p', {className: 'second-row'}, 'Feugiat in fermentum posuere urna nec. Tristique senectus et netus et.' )),
          ]),
        ]),
        e('button', {className: 'flip-card', onClick: function(event) {
          store.dispatch({type: 'FLIP-CARD'})
        }}, [e('i', {className: 'fas fa-reply'}, null)]),

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
  if (document.querySelector('svg') === null) {
    document.querySelector('.credit-card-front').appendChild(pattern.toSVG());
  }
}

store.subscribe(function() { render(); });
render();
