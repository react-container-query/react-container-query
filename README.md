# React Container Query

**True modularity in styling responsive component.**

[![npm version](https://badge.fury.io/js/react-container-query.svg)](https://badge.fury.io/js/react-container-query)
[![Circle CI](https://circleci.com/gh/react-container-query/react-container-query/tree/master.svg?style=svg)](https://circleci.com/gh/react-container-query/react-container-query/tree/master)
[![Build Status](https://saucelabs.com/buildstatus/react-cq)](https://saucelabs.com/beta/builds/de7d8039f4e5417399ec27c39036c1b8)
[![codecov](https://codecov.io/gh/react-container-query/react-container-query/branch/master/graph/badge.svg)](https://codecov.io/gh/react-container-query/react-container-query)

[![Build Status](https://saucelabs.com/browser-matrix/react-cq.svg)](https://saucelabs.com/beta/builds/de7d8039f4e5417399ec27c39036c1b8)

## Installation

```sh
npm i -D react-container-query
```

## Disclaimer

I am providing code in this repository to you under an open source license. Because this is my personal repository, the license you receive to my code is from me and not from my employer (Facebook).

## API

### `<ContainerQuery query={query} initialSize?={{width?, height?}}>`

```jsx
import React, {Component} from 'react';
import {render} from 'react-dom';
import {ContainerQuery} from 'react-container-query';
import classnames from 'classnames';

const query = {
  'width-between-400-and-599': {
    minWidth: 400,
    maxWidth: 599
  },
  'width-larger-than-600': {
    minWidth: 600,
  }
};

function MyComponent() {
  /**
   * `params` in the children function will look like
   * {
   *   'width-between-400-and-599': true,
   *   'width-larger-than-600': false
   * }
   */
  return (
    <ContainerQuery query={query}>
      {(params) => (
        <div className={classnames(params)}>the box</div>
      )}
    </ContainerQuery>
  );
};

/**
 * This will generate following HTML:
 * <div class="width-between-400-and-599"></div>
 */

render(<MyComponent/>, document.getElementById('app'));
```

#### properties

- `props.children`

  Must be a function to return a single or an array of React elements. The function will be invoked with `params`, which is a key-value pair where keys are class names, values are booleans to indicate if that class name's constraints are all satisfied.

- `props.query`

  "query" is key-value pairs where keys are the class names that will be applied to container element when all constraints are met. The values are the constraints.

- `props.initialSize?` (optional)

  `initialSize` is an object with optional `width` or `height` property. Because the limitation on how size is computed based on underlying element, in the initial rendering pass, we don't have the size info (because element must be in the DOM have a valid size). At this time `initialSize` will be used as the size of the element.

### `applyContainerQuery(Component, query, initialSize?) -> ReactComponent`

```jsx
import React, {Component} from 'react';
import {render} from 'react-dom';
import {applyContainerQuery} from 'react-container-query';
import classnames from 'classnames';

const query = {
  'width-between-400-and-599': {
    minWidth: 400,
    maxWidth: 599
  },
  'width-larger-than-600': {
    minWidth: 600,
  }
};

class Container extends Component {
  render() {
    /**
     * `this.props.containerQuery` will look like
     * {
     *   'width-between-400-and-599': true,
     *   'width-larger-than-600': false
     * }
     */
    return <div className={classnames(this.props.containerQuery)}>the box</div>;
  }
}

const App = applyContainerQuery(Container, query)

/**
 * This will generate following HTML:
 * <div class="width-between-400-and-599"></div>
 */

render(<App/>, document.getElementById('app'));
```

This is a very similar to `<ContainerQuery/>`, except it's higher order component style. You don't have to use them together.

## Why

Modularity is the heart of component based UI. With most JavaScript modularized, CSS failed to catch up. When developing a responsive web page, we use media queries to toggle styles based on the size of the viewport. This creates problems when creating component level styles. The same component will behave differently when it is placed in different locations on a page. It seriously breaks the modularity of a component. We need components to be responsive and independent of viewport sizes.

## What is container query

Container query is a work in process CSS feature. "Container queries allow an author to control styling based on the size of a containing element rather than the size of the user’s viewport." (from [Container Query](http://responsiveimagescg.github.io/container-queries/)). [Container Queries: Once More Unto the Breach](http://alistapart.com/article/container-queries-once-more-unto-the-breach) is the inspiration of this repo.

With below CSS, `.box` will be blue when `.container` is wider than 600px, green when width between 400px and 599px, and red for the rest of time.

```css
.box {
  background-color: red;
}

.container:media(min-width: 400px) {
  .box {
    background-color: green;
  }
}

.container:media(min-width: 600px) {
  .box {
    background-color: blue;
  }
}
```

_Note: This library does *not* provide these CSS features._

## Demo

Checkout CodePen

- Adjustable Sidebar http://codepen.io/daiweilu/pen/wMrrZM
- Responsive Component Layout https://codepen.io/daiweilu/pen/EXWRqx

You can also check out [examples directory](./examples).

## Performance

react-container-query is using [element-resize-detector](https://www.npmjs.com/package/element-resize-detector) in mainstream browsers and [ResizeObserver](https://developers.google.com/web/updates/2016/10/resizeobserver) in cutting edge browsers. It's completely event based, so no excessive code runs if no changes on element sizes.
