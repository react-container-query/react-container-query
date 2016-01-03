import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import reactMixin from 'react-mixin';
import classnames from 'classnames';
import createContainerQueryMixin from 'react-container-query';

const MIM_WIDTH = 100;

function render() {
  const { width, scale } = this.props;

  const classes = classnames('demo__container', {
    'demo__container--mobile': scale === 1,
    'demo__container--desktop': scale === 2
  });

  const motionStyle = {width: spring(width, [120, 11])};

  return (
    <Motion defaultStyle={{width}} style={ motionStyle }>{(values) => (
      <div className={classes} ref={this.defineContainer} style={{width: `${values.width}px`}}>
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

const DemoMobile = React.createClass({
  mixins: [createContainerQueryMixin({
    middle: {
      minWidth: 500 / 2
    },
    wide: {
      minWidth: 600 / 2
    },
  })],

  render
});

const DemoDesktop = React.createClass({
  mixins: [createContainerQueryMixin({
    middle: {
      minWidth: 500
    },
    wide: {
      minWidth: 600
    },
  })],

  render
});

const LAYOUTS = [320, 530, 620];

class Button extends Component {
  render() {
    const {isActive, children} = this.props;

    return (
      <button
        className={classnames('example__btn', {'example__btn--active': isActive})}
        onClick={this._onClick.bind(this)}>
        {children}
      </button>
    );
  }

  _onClick() {
    const {onClick} = this.props;
    onClick();
    try {
      ga('send', 'event', 'button', 'click');
    } catch (e) {}
  }
}

export default class WebsiteExample extends Component {
  constructor({defaultLayout = 0}) {
    super({defaultLayout});
    this.state = {
      currentLayout: defaultLayout,
      width: LAYOUTS[defaultLayout]
    };
  }

  render() {
    return (
      <div className="example">
        <p>(Tap buttons to view different layouts)</p>
        <div className="example__btn-group">
          <Button onClick={() => this._layout(0)} isActive={this.state.currentLayout === 0}>&lt;= 500</Button>
          <Button onClick={() => this._layout(1)} isActive={this.state.currentLayout === 1}>&gt; 500 and &lt; 600</Button>
          {this.props.enableLast ? <Button onClick={() => this._layout(2)} isActive={this.state.currentLayout === 2}>&gt;= 600</Button> : null}
        </div>
        <DemoMobile width={this.state.width / 2} scale={1} />
        <DemoDesktop width={this.state.width} scale={2} />
      </div>
    );
  }

  _layout(id) {
    this.setState({
      currentLayout: id,
      width: LAYOUTS[id]
    });
  }
}
