import React = require('react');
import ReactDOM = require('react-dom');
import assign = require('lodash/assign');
import createContainerQueryMixin, {ContainerQueryDefinition} from './createContainerQueryMixin';

export default function<P> (
  Component: React.ComponentClass<P>,
  query: ContainerQueryDefinition) {

  return React.createClass<P, any>({
    propTypes: Component.propTypes,
    displayName: 'ContainerQuery',
    mixins: [createContainerQueryMixin(query)],

    defineContainerComponent(ref: React.Component<any, any>) {
      this.defineContainer(ReactDOM.findDOMNode(ref));
    },

    render() {
      const props = assign({
        containerQuery: this.state.containerQuery,
        ref: this.defineContainerComponent
      }, this.props) as P;

      return React.createElement(Component, props);
    }
  });
}
