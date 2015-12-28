import React, { Component } from 'react';
import classnames from 'classnames';

export default class Page extends Component {
  render() {
    const classes = classnames('slide', `slide-${this.props.order}`, {
      'vertical-center-container': this.props.verticalCenterContainer
    });

    return <div className={ classes }>{ this.props.children }</div>;
  }
}
