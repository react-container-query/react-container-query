import React, { Component } from 'react';
import Page from './Page';
import WebsiteExample from './WebsiteExample';

const HeroPage = () => (
  <Page order="1" verticalCenterContainer={ true }>
    <div className="slide-h1 vertical-center-child">
      <h1>Limitation of Media Query and What's</h1>
      <h1 className="slide-h1--highlight">Container Query</h1>
    </div>
  </Page>
);

const Page1 = (props) => (
  <Page order="2">
    <h2>Viewport Size Based Styles</h2>
    <div className="slide-content">
      <p>If you have created responsive web site, you likely have used media queries to adjust styles according to the width of viewport.</p>
      <pre className="slide-code-block">
        <code>
{`.image {
  height: 200px;
}
@media (min-width: 440px) {
  .image {
    width: 200px;
    float: left;
  }
}`}
        </code>
      </pre>
      <WebsiteExample />
      <p>The list item component (the one with image) changes its styles when viewport width equals to 440px. Assuming the padding of the page is 20px on both sides, the 440px viewport width is equivalent to 400px width of the component.</p>
    </div>
  </Page>
);

const Page2 = () => (
  <Page order="2">
    <h2>Media Query Breaks CSS Modularity</h2>
    <div className="slide-content">
      <p>This all works fine until we want to apply different style to the same component at the same viewport width. Imagine we want a feature item to be displayed differently when viewport is wider than 620px.</p>
      <WebsiteExample enableLast={true} />
      <p>Beyond 620px, our featured item stays horizontal but the rest are stacked side by side.</p>
      <pre className="slide-code-block">
        <code>
{`.image {
  height: 200px;
}
@media (min-width: 440px) {
  .image {
    width: 200px;
    float: left;
  }
}
@media (min-width: 620px) {
  .feature .image {
    float: left;
    width: 100px;
  }

  .image {
    width: 280px;
    float: none;
  }
}`}
        </code>
      </pre>
      <p>Pay attention to the ".feature .image" rules, we are repeating the "(min-width: 440px)" media query rules. It will become messy quickly if the code base is huge.</p>
    </div>
  </Page>
);

const Page3 = () => (
  <Page order="3">
    <h2>Container Query to the Rescue</h2>
    <div className="slide-content">
      <p>Container query is a work in process CSS feature. With it you can apply media query to an element instead of viewport.</p>
      <pre className="slide-code-block">
        <code>
{`.image {
  height: 200px;
}
.container:media (min-width: 400px) {
  .image {
    width: 200px;
    float: left;
  }
}`}
        </code>
      </pre>
      <p>This way we only have to control the size of ".container" and not have to worry about positioning ".image" according to viewport width. We write less code and component is more modular.</p>
    </div>
  </Page>
);

const Page4 = () => (
  <Page order="4">
    <h2>Not Yet Supported in Any Browser</h2>
    <div className="slide-content">
      <p>Unfortunately, container query is not yet supported in any browser. But that's not the end of the story.</p>
    </div>
  </Page>
);

const Page5 = () => (
  <Page order="5">
    <h2>React Container Query Mixin</h2>
    <div className="slide-content">
      <p></p>
    </div>
  </Page>
);

const Page6 = () => (
  <Page order="5">
    <h2>Other Pollyfill</h2>
    <div className="slide-content">
      <p></p>
    </div>
  </Page>
);

const Page7 = () => (
  <Page order="5">
    <h2>Other Pollyfill</h2>
    <div className="slide-content">
      <p></p>
    </div>
  </Page>
);

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <HeroPage />
        <Page1 />
        <Page2 />
        <Page3 />
        <Page4 />
        <Page5 />
        <Page6 />
        <Page7 />
      </div>
    );
  }
}
