# React Container Query

[![npm version](https://badge.fury.io/js/react-container-query.svg)](https://badge.fury.io/js/react-container-query)
[![Circle CI](https://circleci.com/gh/d6u/react-container-query/tree/master.svg?style=svg)](https://circleci.com/gh/d6u/react-container-query/tree/master)
[![Build Status](https://saucelabs.com/buildstatus/react-cq)](https://saucelabs.com/beta/builds/de7d8039f4e5417399ec27c39036c1b8)
[![codecov](https://codecov.io/gh/d6u/react-container-query/branch/master/graph/badge.svg)](https://codecov.io/gh/d6u/react-container-query)

[![Build Status](https://saucelabs.com/browser-matrix/react-cq.svg)](https://saucelabs.com/beta/builds/de7d8039f4e5417399ec27c39036c1b8)

## Intro

**True modularity in styling responsive component.**

Modularity is the heart of component based UI. With most JavaScript modularized, CSS failed to catch up. When developing responsive webpage, we use media queries to toggle styles based on the size of the viewport. This creates problems when creating component level styles. The same component will behave differently when it is placed in different locations on a page. It seriously breaks the modularity of a component. We need components to be responsive and independent of viewport sizes.

## What is Container Query

**For real usage see [usage](#usage) section.**

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

## Usage

```sh
npm install --save-dev react-container-query
```

**react-container-query doesn't specify peerDependencies in package.json, but you should have react and react-dom available.**

### `applyContainerQuery(Component, query, [opts])`

Create [higher order component](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775) for container.

```js
import React, { Component } from 'react';
import { render } from 'react-dom';
import classnames from 'classnames';
import { applyContainerQuery } from 'react-container-query';

class MyComponent extends Component {
  render() {
    // `this.props.containerQuery` is a property provided by the higher order
    // component. It will look like:
    //
    //   {
    //     width_between_400_and_599: true,
    //     width_larger_than_600: false
    //   }
    return (
      <div className={classnames('container', this.props.containerQuery)}>
        <div className='box'>the box</div>
      </div>
    );
  }
}

const query = {
  'width-between-400-and-599': {
    minWidth: 400,
    maxWidth: 599
  },
  'width-larger-than-600': {
    minWidth: 600,
  }
};

const HigherOrderComponent = applyContainerQuery(MyComponent, query);

render(<HigherOrderComponent/>, document.getElementById('app'));
```

#### options

- `opts.propName = "containerQuery"`: use this arguments, you can customized the name of property to pass container query state to.

## Demo

Checkout CodePen

- Adjustable Sidebar http://codepen.io/daiweilu/pen/wMrrZM
- Responsive Component Layout http://codepen.io/daiweilu/pen/XXexrj

You can also checkout [examples](./examples).

## Performance

React Contianer Query is using [element-resize-detector](https://www.npmjs.com/package/element-resize-detector) to make sure it's performant. It's completely event based, so no excessive code runs if no changes on element sizes.
