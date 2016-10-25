import React, {Component} from 'react';
import {render} from 'react-dom';
import ContainerQuery from '../../lib';

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
  <ContainerQuery query={query} className='container'>
    {() => (
      <div className='box'>the box</div>
    )}
  </ContainerQuery>
);

render(<MyComponent/>, document.getElementById('app'));
