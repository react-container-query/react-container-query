import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { requestAnimationFrame, cancelAnimationFrame } from './raf';

export default function apply(ComposedComponent, queries) {
  return class extends Component {
    constructor() {
      super();

      this.__cq = {
        height: null,
        width: null,
        $id: null,
      };
    }

    componentDidMount() {
      const element = findDOMNode(this.refs.container);
      const computedStyles = getComputedStyle(element);

      const callback = () => {
        this.__cq.width = computedStyles.getPropertyValue('width');
        this.__cq.height = computedStyles.getPropertyValue('height');
        this.__cq.$id = requestAnimationFrame(callback);
      };

      callback();
    }

    componentWillUnmount() {
      cancelAnimationFrame(this.__cq.$id);
      this.__cq.$id = null;
    }

    render() {
      return <ComposedComponent ref='container' />;
    }
  }
}
