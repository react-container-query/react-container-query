import React, { Component } from 'react';
import { render } from 'react-dom';
import classnames from 'classnames';
import hljs from 'highlight.js';
import WebsiteExample1 from './WebsiteExample1';
import WebsiteExample2 from './WebsiteExample2';

class Slide extends Component {
  render() {
    const classes = classnames('slide', `slide-${this.props.order}`, {
      'vertical-center-container': this.props.verticalCenterContainer
    });

    return <div className={ classes }>{ this.props.children }</div>;
  }
}

const Slide1 = () => {
  return (
    <Slide order="1" verticalCenterContainer={ true }>
      <div className="slide-h1 vertical-center-child">
        <h1>Limitation of Media Query and What's</h1>
        <h1 className="slide-h1--highlight">Container Query</h1>
      </div>
    </Slide>
  );
};

const Code = ({code, language = 'css'}) => {
  return (
    <pre>
      <code>{ code }</code>
      {/*<code dangerouslySetInnerHTML={{__html: hljs.highlight(language, code).value}}></code>*/}
    </pre>
  );
};

const Slide2 = (props) => {
  return (
    <Slide order="2">
      <h2>Size Based Styles</h2>
      <div className="slide-content">
        <p>If you create responsive web site, you are likely to use media queries to adjust styles according to the width of viewport.</p>
        <pre className="slide-code-block">
          <code>
{`.image {
  height: 250px;
}
@media (min-width: 480px) {
  .image {
    width: 250px;
    float: left;
  }
}`}
          </code>
        </pre>
        <WebsiteExample1 />
        <p>The list item component (the one with image) changes its styles when viewport width equals to 480px. Assuming the padding of the page is 20px on both sides, the 480px viewport width is equivalent to 440px width of the component.</p>
      </div>
    </Slide>
  );
};

const Slide3 = () => {
  return (
    <Slide order="2">
      <h2>Media Query Breaks CSS Modularity</h2>
      <div className="slide-content">
        <p>This all works fine until we want to fit two items in one row when viewport is wide enough, say 600px.</p>
        <pre className="slide-code-block">
          <code>
{`.image {
  height: 250px;
}
@media (min-width: 480px) {
  .image {
    width: 250px;
    float: left;
  }
}
@media (min-width: 600px) {
  .image {
    width: auto;
    float: none;
  }
}`}
          </code>
        </pre>
        <WebsiteExample2 />
      </div>
    </Slide>
  );
}

class App extends Component {
  render() {
    return (
      <div className="app">
        <Slide1 />
        <Slide2 />
        <Slide3 />
      </div>
    );
  }
}

render(<App />, document.getElementById('app-root'));
