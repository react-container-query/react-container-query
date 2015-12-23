import React, { Component } from 'react';
import reactMixin from 'react-mixin';
import ReactDOM from 'react-dom';
import createContainerQueryMixin from '../src';

class MyComponent extends Component {
  render() {
    return (
      <div ref={this.defineContainer} className='container'>
        <div className='box'>the box</div>
      </div>
    );
  }
}

const query = {
  middle: {
    minWidth: '400px',
    maxWidth: '599px'
  },
  wide: {
    minWidth: '600px',
  }
};

reactMixin(MyComponent.prototype, createContainerQueryMixin(query));

ReactDOM.render(<MyComponent />, document.getElementById('app'));
