import React, { Component } from 'react';
import Page from './Page';
import WebsiteExample from './WebsiteExample';

const HeroPage = () => (
  <Page order={1} verticalCenterContainer={ true } isHero={ true } >
    <header className="page-h1 vertical-center-child">
      <h1>Limitation of Media Query and What's</h1>
      <h1 className="page-h1--highlight">Container Query</h1>
    </header>
  </Page>
);

const Page1 = (props) => (
  <Page order={2}>
    <h2>Viewport Size Based Styles</h2>
    <div>
      <p>If you have created responsive web site, you likely have used media queries to adjust styles according to the width of viewport.</p>
      <pre>
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
    <div>
      <p>This all works fine until we want to apply different style to the same component at the same viewport width. Imagine we want a feature item to be displayed differently when viewport is wider than 620px.</p>
      <WebsiteExample enableLast={true} />
      <p>Beyond 620px, our featured item stays horizontal but the rest are stacked side by side.</p>
      <pre>
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
    <div>
      <p>Container query is a work in process CSS feature. With it you can apply media query to an element instead of viewport.</p>
      <pre>
        <code>
{`.image {
  height: 200px;
}
.box:media(min-width: 400px) {
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
    <h2>No Support in Any Browser</h2>
    <div>
      <p>Unfortunately, container query is not yet supported in any browser. But that's not the end of the story. There are libraries and polyfill available to help us use this future CSS today.</p>
    </div>
  </Page>
);

const Page5 = () => (
  <Page order="5">
    <h2>React Container Query Mixin</h2>
    <div>
      <p>If you work with React, you can create component with <a href="https://github.com/d6u/react-container-query">React Container Query Mixin</a> to use container query today. Demos on this page is built using this mixin.</p>
    </div>
  </Page>
);

const Page6 = () => (
  <Page order="6">
    <h2>Other Polyfills</h2>
    <div>
      <p>There are also other generic polyfill and React solutions available:</p>
      <ul className="page-list">
        <li className="page-list-item"><a href="https://github.com/walmartreact/container-query" target="_blank">walmartreact/container-query</a></li>
        <li className="page-list-item"><a href="https://github.com/ausi/cq-prolyfill" target="_blank">ausi/cq-prolyfill</a></li>
        <li className="page-list-item"><a href="https://github.com/VinSpee/react-container-query-container" target="_blank">VinSpee/react-container-query-container</a></li>
        <li className="page-list-item"><a href="https://github.com/lemonmade/container-queries" target="_blank">lemonmade/container-queries</a></li>
      </ul>
    </div>
  </Page>
);

const Page7 = () => (
  <Page order="7">
    <h2>About this Website</h2>
    <div>
      <p>This page is created by <a href="https://github.com/d6u">d6u</a> using React.js and <a href="https://github.com/d6u/react-container-query">React Container Query Mixin</a>. I'm also on Twitter as <a href="https://twitter.com/daiweilu">daiweilu</a>. Love any feedbacks on this little project. You are welcome to open issue or PR on Github. Happy hacking!</p>
    </div>
  </Page>
);

export default class App extends Component {
  render() {
    return (
      <article className="app">
        <HeroPage />
        <Page1 />
        <Page2 />
        <Page3 />
        <Page4 />
        <Page5 />
        <Page6 />
        <Page7 />
      </article>
    );
  }
}
