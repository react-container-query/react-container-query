import { createClass, createElement } from 'react';
import { findDOMNode } from 'react-dom';
import createContainerQueryMixin from './createContainerQueryMixin';
import { shallowCopyObj } from './DataStructure';

/**
 * Apply container query using higher order component style
 *
 * Refer to:
 * https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775
 *
 * @param {Component} Container - A react component
 * @param {Object} query - Container query definitions
 * @param {Object} [opts] - Additional options passed to `createContainerQueryMixin`
 * @param {string} [opts.propName='containerQuery'] - the property name to pass to applied container component
 *
 * @return {Component} A container query element
 */
export default function applyContainerQuery(
  Container,
  query,
  {propName = 'containerQuery', setAttribute} = {}) {

  return createClass({
    propTypes: Container.propTypes,
    displayName: 'ContainerQuery',
    mixins: [createContainerQueryMixin(query, {setAttribute})],

    getInitialState() {
      return {stateMap: null};
    },

    defineContainerComponent(ref) {
      this.defineContainer(findDOMNode(ref));
    },

    containerQueryDidUpdate(stateMap) {
      this.setState({stateMap});
    },

    render() {
      const props = shallowCopyObj(this.props);

      props.ref = this.defineContainerComponent;
      props[propName] = this.state.stateMap;

      return createElement(Container, props);
    }

  });
}
