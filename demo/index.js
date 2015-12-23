import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import apply from '../src';

class MyComponent extends Component {
  render() {
    const className = this.props.classNames.concat(['container']).join(' ');
    return (
      <div className={className}><div className='box'>the box</div></div>
    );
  }
}

const MyContainer = apply(MyComponent, {
  wide: {
    minWidth: '400px'
  }
});

ReactDOM.render(<MyContainer />, document.getElementById('app'));
