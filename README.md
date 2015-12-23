# React Container Query (proof of concept)

## Proof of Concept

This is only a proof of concept. If you have any idea, please create an issue or PR.

## Intro

Container query is a none standard CSS feature. Similar to media queries, container query doesn't depend on viewports. You can specify styles based on conditions of container element:

```
.box {
  background-color: red;
}

.container:media(min-width: 400px) {
  .box {
    background-color: blue;
  }
}
```

With above CSS, `.box` will be blue when `.container` is wider than 400px, and red for the rest of time. More details see [Container Queries: Once More Unto the Breach](http://alistapart.com/article/container-queries-once-more-unto-the-breach).

## Demo

If you open `demo/index.html` in browser and adjust browser width, which will affect the width of `.container`, you will see `.box` change its color.

```js
class MyComponent extends Component {
  render() {
    const className = this.props.classNames.concat(['container']).join(' ');
    return (
      <div className={className}><div className='box'>the box</div></div>
    );
  }
}

const MyContainer = apply(MyComponent, {
  wide: {
    minWidth: '400px',
  }
});
```

The CSS doesn't look exactly like the container query syntax, but the idea is to switch `wide` class on and off based on the width of `.container`. We can potentially improve this process by using libraries like css-module to parse customize container query and generate needed CSS and JS code.

```css
.box {
  background-color: red;
}

.container.wide .box {
  background-color: blue;
}
```
