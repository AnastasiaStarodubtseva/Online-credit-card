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