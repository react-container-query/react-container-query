import React, {Component} from 'react';
import {render} from 'react-dom';
import classnames from 'classnames';
import {ContainerQuery} from '../../lib';

const query = {
  'width-between-400-and-599': {
    minWidth: 400,
    maxWidth: 599
  },
  'width-larger-than-600': {
    minWidth: 600,
  }
};

const MyComponent = () => (
  <ContainerQuery query={query}>
    {(params, ref) => (
      <div ref={ref} className={classnames('box', params)}>the box</div>
    )}
  </ContainerQuery>
);

render(<MyComponent/>, document.getElementById('app'));
