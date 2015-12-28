import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import reactMixin from 'react-mixin';
import createContainerQueryMixin from 'react-container-query';

const MIM_WIDTH = 100;

class WebsiteExample2 extends Component {
  constructor() {
    super();

    this.state = {
      width: MIM_WIDTH
    };

    this._timerId = null;
  }

  componentDidMount() {
    let isWide = false;

    const iterate = () => {
      this._timerId = setTimeout(() => {
        this.setState({width: isWide ? MIM_WIDTH : 600});
        isWide = !isWide;
        iterate();
      }, 5000);
    }

    iterate();
  }

  componentWillUnmount() {
    clearTimeout(this._timerId);
    this._timerId = null;
  }

  render() {
    return (
      <Motion defaultStyle={{width: 600}} style={{width: spring(this.state.width, [60, 30])}}>
        {values => (
          <div ref={this.defineContainer.bind(this)} className="example-1__container" style={{width: `${values.width}px`}}>
            <div className="example-1__logo"></div>
            <div className="example-1__intro">
              <div className="example-1__line example-1__line-1"></div>
              <div className="example-1__line example-1__line-2"></div>
              <div className="example-1__line example-1__line-3"></div>
            </div>
            <ol className="example-1__list">
              <li className="example-1__item">
                <div className="example-1__item-pic">image</div>
                <div className="example-1__item-content"></div>
              </li>
              <li className="example-1__item">
                <div className="example-1__item-pic">image</div>
                <div className="example-1__item-content"></div>
              </li>
              <li className="example-1__item">
                <div className="example-1__item-pic">image</div>
                <div className="example-1__item-content"></div>
              </li>
              <li className="example-1__item">
                <div className="example-1__item-pic">image</div>
                <div className="example-1__item-content"></div>
              </li>
              <li className="example-1__item">
                <div className="example-1__item-pic">image</div>
                <div className="example-1__item-content"></div>
              </li>
            </ol>
          </div>
        )}
      </Motion>
    );
  }
}

reactMixin(WebsiteExample2.prototype, createContainerQueryMixin({
  min_with_200: {
    minWidth: 200
  },
  min_with_300: {
    minWidth: 300
  }
}));

export default WebsiteExample2;
