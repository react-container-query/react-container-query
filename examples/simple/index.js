import React, {Component} from 'react';
import {render} from 'react-dom';
import classnames from 'classnames';
import {applyContainerQuery} from '../../lib';

class MyComponent extends Component {
  render() {
    // `this.props.containerQuery` is a property provided by the higher order
    // component. It will look like:
    //
    //   {
    //     width-between-400-and-599: true,
    //     width-larger-than-600: false
    //   }
    return (
      <div className={classnames('container', this.props.containerQuery)}>
        <div className='box'>the box</div>
      </div>
    );
  }
}

const query = {
  'width-between-400-and-599': {
    minWidth: 400,
    maxWidth: 599
  },
  'width-larger-than-600': {
    minWidth: 600,
  }
};

const HigherOrderComponent = applyContainerQuery(MyComponent, query);

render(<HigherOrderComponent/>, document.getElementById('app'));
