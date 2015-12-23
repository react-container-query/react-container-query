import React, { Component } from 'react';
import reactMixin from 'react-mixin';
import ReactDOM from 'react-dom';
import createContainerQueryMixin from '../src';

class MyComponent extends Component {
  render() {
    return (
      <div ref={this.defineContainer.bind(this)} className='container-perf'>
        <div className='box'>the perf box</div>
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
  const elements = [];

  for (let i = 0; i < 100; i++) {
    elements.push(<MyComponent key={i} />);
  }

  return (
    <div>{elements}</div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
