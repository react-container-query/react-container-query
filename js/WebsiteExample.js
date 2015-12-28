import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import reactMixin from 'react-mixin';
import createContainerQueryMixin from 'react-container-query';

const MIM_WIDTH = 100;

class Demo extends Component {
  render() {
    return (
      <Motion defaultStyle={{width: 160}} style={{width: spring(this.props.width)}}>
        {values => (
          <div className="demo__container" ref={this.defineContainer.bind(this)} style={{width: `${values.width}px`}}>
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
        )}
      </Motion>
    );
  }
}

reactMixin(Demo.prototype, createContainerQueryMixin({
  middle: {
    minWidth: 275
  },
  wide: {
    minWidth: 350
  },
}));

const LAYOUTS = [320, 550, 700];

export default class WebsiteExample extends Component {
  constructor() {
    super();
    this.state = {width: 160};
  }

  render() {
    return (
      <div className="example">
        <div className="example__btn-group">
          <button className="example__btn" onClick={() => this._selectLayout(0)}>{'<= 440'}</button>
          <button className="example__btn" onClick={() => this._selectLayout(1)}>{'> 440 and < 620'}</button>
          {this.props.enableLast ?
            <button className="example__btn" onClick={() => this._selectLayout(2)}>{'>= 620'}</button> :
            null
          }
        </div>
        <Demo width={this.state.width} />
      </div>
    );
  }

  _selectLayout(id) {
    this.setState({width: LAYOUTS[id] / 2});
  }
}
