'use strict';

const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const expect = require('expect')
const {ContainerQuery, applyContainerQuery} = require('../../lib/index');

describe('ContainerQuery', function () {

  const query = {
    mobile: {maxWidth: 399},
    desktop: {minWidth: 400}
  };

  it('renders without initialSize', function () {
    function Container() {
      return React.createElement(ContainerQuery, {query},
        (params) => React.createElement('div', null, JSON.stringify(params))
      );
    }

    expect(renderToStaticMarkup(React.createElement(Container)))
      .toBe('<div>{}</div>');
  });

  it('renders initialSize', function () {
    const initialSize = {
      width: 250,
    };

    function Container() {
      return React.createElement(ContainerQuery, {query, initialSize},
        (params) => React.createElement('div', null, JSON.stringify(params))
      );
    }

    expect(renderToStaticMarkup(React.createElement(Container)))
      .toBe('<div>{&quot;mobile&quot;:true,&quot;desktop&quot;:false}</div>');
  });

});

describe('applyContainerQuery', function () {

  const query = {
    mobile: {maxWidth: 399},
    desktop: {minWidth: 400}
  };

  it('renders without initialSize', function () {
    class Container extends React.Component {
      render() {
        return React.createElement(
          'div',
          null,
          JSON.stringify(this.props.containerQuery)
        );
      }
    }

    const HOCContainer = applyContainerQuery(Container, query);

    expect(renderToStaticMarkup(React.createElement(HOCContainer)))
      .toBe('<div>{}</div>');
  });

  it('renders initialSize', function () {
    const initialSize = {
      width: 250,
    };

    class Container extends React.Component {
      render() {
        return React.createElement(
          'div',
          null,
          JSON.stringify(this.props.containerQuery)
        );
      }
    }

    const HOCContainer = applyContainerQuery(Container, query, initialSize);

    expect(renderToStaticMarkup(React.createElement(HOCContainer)))
      .toBe('<div>{&quot;mobile&quot;:true,&quot;desktop&quot;:false}</div>');
  });

});
