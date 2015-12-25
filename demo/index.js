import React, { Component } from 'react';
import reactMixin from 'react-mixin';
import ReactDOM from 'react-dom';
import createContainerQueryMixin from '../src';

class MyComponent extends Component {
  render() {
    return (
      <div ref={this.defineContainer.bind(this)} className='container'>
        <div className='box'>the box</div>
      </div>
    );
  }
}

const query = {
  width_between_400_and_599: {
    minWidth: 400,
    maxWidth: 599
  },
  width_larger_than_600: {
    minWidth: 600,
  }
};

reactMixin(MyComponent.prototype, createContainerQueryMixin(query));

ReactDOM.render(<MyComponent />, document.getElementById('app'));
