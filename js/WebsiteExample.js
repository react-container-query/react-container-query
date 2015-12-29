import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import reactMixin from 'react-mixin';
import createContainerQueryMixin from 'react-container-query';

const MIM_WIDTH = 100;

class Demo extends Component {
  render() {
    const { width } = this.props;
    const motionStyle = {width: spring(width, [120, 11])};

    return (
      <Motion defaultStyle={{width: 160}} style={ motionStyle }>{(values) => (
        <div className="demo__container"
          ref={this.defineContainer.bind(this)}
          style={{width: `${values.width}px`}}>

          <div className="demo__logo"></div>
          <div className="demo__intro">
            <div className="demo__line demo__line-1"></div>
            <div className="demo__line demo__line-2"></div>
            <div className="demo__line demo__line-3"></div>
          </div>
          <ol className="demo__list">
            <li className="demo__item demo__item--feature">
              <div className="demo__item-pic">image</div>
              <div className="demo__item-content"></div>
            </li>
            <li className="demo__item">
              <div className="demo__item-pic">image</div>
              <div className="demo__item-content"></div>
            </li>
            <li className="demo__item">
              <div className="demo__item-pic">image</div>
              <div className="demo__item-content"></div>
            </li>
            <li className="demo__item">
              <div className="demo__item-pic">image</div>
              <div className="demo__item-content"></div>
            </li>
            <li className="demo__item">
              <div className="demo__item-pic">image</div>
              <div className="demo__item-content"></div>
            </li>
          </ol>
        </div>
      )}</Motion>
    );
  }
}

reactMixin(Demo.prototype, createContainerQueryMixin({
  middle: {
    minWidth: 500 / 2
  },
  wide: {
    minWidth: 600 / 2
  },
}));

const LAYOUTS = [320, 550, 620];

export default class WebsiteExample extends Component {
  constructor() {
    super();
    this.state = {width: 160};
  }

  render() {
    const lastBtn = this.props.enableLast ?
      <button className="example__btn" onClick={() => this._layout(2)}>{'>= 600'}</button> :
      null;

    return (
      <div className="example">
        <div className="example__btn-group">
          <button className="example__btn" onClick={() => this._layout(0)}>{'<= 500'}</button>
          <button className="example__btn" onClick={() => this._layout(1)}>{'> 500 and < 600'}</button>
          { lastBtn }
        </div>
        <Demo width={this.state.width} />
      </div>
    );
  }

  _layout(id) {
    this.setState({width: LAYOUTS[id] / 2});
  }
}
