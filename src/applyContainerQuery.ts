import React = require('react');
import ReactDOM = require('react-dom');
import assign = require('lodash/assign');
import createContainerQueryMixin, {ContainerQueryDefinition} from './createContainerQueryMixin';

export default function<P> (
  Component: React.ComponentClass<P>,
  query: ContainerQueryDefinition,
  {propName = 'containerQuery'} = {}) {

  return React.createClass<P, any>({
    propTypes: Component.propTypes,
    displayName: 'ContainerQuery(' + getDisplayName(WrappedComponent) + ')',
    mixins: [createContainerQueryMixin(query)],

    defineContainerComponent(ref: React.Component<any, any>) {
      this.defineContainer(ReactDOM.findDOMNode(ref));
    },

    render() {
      const props: {[key: string]: any} = assign({ref: this.defineContainerComponent}, this.props);
      props[propName] = this.state ? this.state.containerQuery : {};
      return React.createElement(Component, props as P);
    }
  });
}

function getDisplayName(WrappedComponent: React.ComponentClass<P>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
