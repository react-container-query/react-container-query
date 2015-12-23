import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { requestAnimationFrame, cancelAnimationFrame } from './raf';
import { getComputedStyle } from './getComputedStyle';

function takeNumber(str) {
  return parseInt(/(\d+)px$/i.exec(str)[1]);
}

export default function createContainerQueryMixin(query) {

  let size = {width: null, height: null};
  let rafId = null;
  let containerElement = null;

  function updateClasses() {
    for (const className of Object.keys(query)) {
      const rules = query[className];
      const { minWidth } = rules;
      let valid = false;

      if (minWidth && takeNumber(minWidth) <= takeNumber(size.width)) {
        valid = true;
        containerElement.classList.add(className);
      }

      if (!valid) {
        containerElement.classList.remove(className);
      }
    }
  }

  return {
    defineContainer(component) {
      containerElement = component;
    },

    componentDidMount() {
      const computedStyles = getComputedStyle(containerElement);

      const checkDimension = () => {
        const width = computedStyles.getPropertyValue('width');
        const height = computedStyles.getPropertyValue('height');

        let changed = false;

        if (size.width !== width) {
          changed = true;
        }

        if (size.height !== height) {
          changed = true;
        }

        size.width = width;
        size.height = height;

        if (changed) {
          updateClasses();
        }

        rafId = requestAnimationFrame(checkDimension);
      };

      checkDimension();
    },

    componentWillUnmount() {
      cancelAnimationFrame(rafId);
      rafId = null;
      containerElement = null;
    }
  };
}
