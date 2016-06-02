import React, {Component} from 'react';
import {render} from 'react-dom';
import classnames from 'classnames';
import {applyContainerQuery} from '../../src';

class MyComponent extends Component {
  render() {
    // `this.props.containerQuery` is a property provided by the higher order
    // component. It will look like:
    //
    //   {
    //     width_between_400_and_599: true,
    //     width_larger_than_600: false
    //   }
    return (
      <div className={classnames('container', this.props.containerQuery)}>
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

const HigherOrderComponent = applyContainerQuery(MyComponent, query);

render(<HigherOrderComponent/>, document.getElementById('app'));
