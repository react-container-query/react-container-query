import React, { Component } from 'react';
import classnames from 'classnames';

export default function Page({ order, verticalCenterContainer, isHero, children }) {
  const classes = classnames('page', `page-${order}`, {
    'vertical-center-container': verticalCenterContainer,
    'page-hero': isHero
  });

  return <section className={ classes }>{ children }</section>;
};
