# React Container Query (proof of concept)

[![npm version](https://badge.fury.io/js/react-container-query.svg)](https://badge.fury.io/js/react-container-query)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/react-cq.svg)](https://saucelabs.com/u/react-cq)

## Proof of Concept

This is only a proof of concept. If you have any idea, you are more than welcome to let me know by creating an issue or PR.

## Intro

Container query is a none standard CSS feature. Similar to media queries, container query doesn't depend on viewport sizes. You can specify styles based on sizes of container element:

```
.box {
  background-color: red;
}

.container:media (min-width: 400px) and (max-width: 599px) {
  .box {
    background-color: green;
  }
}

.container:media (min-width: 600px) {
  .box {
    background-color: blue;
  }
}
```

With above CSS, `.box` will be blue when `.container` is wider than 600px, green when width between 400px and 599px, and red for the rest of time. More details see [Container Queries: Once More Unto the Breach](http://alistapart.com/article/container-queries-once-more-unto-the-breach).

## Demo

If you open `demo/index.html` in browser and adjust browser width, which will affect the width of `.container`, you will see `.box` change its color.

```js
import reactMixin from 'react-mixin';
import createContainerQueryMixin from '../src';

class MyComponent extends Component {
  render() {
    return (
      // IMPORTANT: assign `ref` property here
      // `defineContainer` is a method provided by `createContainerQueryMixin`
      <div ref={this.defineContainer.bind(this)} className='container'>
        <div className='box'>the box</div>
      </div>
    );
  }
}

const query = {
  middle: {
    minWidth: 400,
    maxWidth: 599
  },
  wide: {
    minWidth: 600,
  }
};

reactMixin(MyComponent.prototype, createContainerQueryMixin(query));
```

The CSS doesn't look exactly like the container query syntax, but the idea is to switch `wide` and `middle` attribute on and off based on the width of `.container`. This can be potentially improved by using libraries like css-module to parse customize container query and generate needed CSS and JS code.

```css
.box {
  background-color: red;
}

.container[middle] .box {
  background-color: green;
}

.container[wide] .box {
  background-color: blue;
}
```

## Performance

Internally, it's using [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) API to check container element size periodically. You can checkout `demo/perf.html` to test with your own eyes. But generally this is not a concern.
