import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import apply from '../src';

class MyComponent extends Component {
  render() {
    return (<div>hello</div>);
  }
}

const MyContainer = apply(MyComponent);

ReactDOM.render(<MyContainer />, document.getElementById('app'));
