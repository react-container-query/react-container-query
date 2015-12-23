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
  middle: {
    minWidth: 400,
    maxWidth: 599
  },
  wide: {
    minWidth: 600,
  }
};

reactMixin(MyComponent.prototype, createContainerQueryMixin(query));

const App = (props) => {
  return (
    <div>
      <MyComponent />
      <MyComponent />
      <MyComponent />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
