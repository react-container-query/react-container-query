'use strict';

const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const expect = require('expect')
const { ContainerQuery, applyContainerQuery, useContainerQuery } = require('../../lib/index');

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

describe('useContainerQuery', function () {

  const query = {
    mobile: { maxWidth: 399 },
    desktop: { minWidth: 400 }
  };

  function renderContainerToStaticMarkup({ initialSize }) {
    const Container = () => {
      const [params, containerRef] = useContainerQuery(query, initialSize);

      return React.createElement(
        'div',
        {
          ref: containerRef
        },
        JSON.stringify(params)
      );
    };

    return renderToStaticMarkup(React.createElement(Container));
  }

  it('no matches with no initial widths', function () {
    const output = renderContainerToStaticMarkup({});
    expect(output).toBe('<div>{}</div>');
  });

  it('sets "mobile" to true at small sizes', function () {
    const zeroWidthOutput = renderContainerToStaticMarkup({ initialSize: { width: 399 } });
    const maximumMobileWidthOutput = renderContainerToStaticMarkup({ initialSize: { width: 0 } });

    expect(zeroWidthOutput).toBe('<div>{&quot;mobile&quot;:true,&quot;desktop&quot;:false}</div>');
    expect(maximumMobileWidthOutput).toBe('<div>{&quot;mobile&quot;:true,&quot;desktop&quot;:false}</div>');
  });

  it('sets "desktop" to true at large sizes', function () {
    const output = renderContainerToStaticMarkup({ initialSize: { width: 400 } });
    expect(output).toBe('<div>{&quot;mobile&quot;:false,&quot;desktop&quot;:true}</div>');
  });
});
