import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import apply from '../src';

class MyComponent extends Component {
  render() {
    console.log(this.props);
    return (
      <div className='container'><div className='box'>the box</div></div>
    );
  }
}

const MyContainer = apply(MyComponent, {
  wide: {
    minWidth: '400px',
  },
  narrow: 'default'
});

ReactDOM.render(<MyContainer />, document.getElementById('app'));
