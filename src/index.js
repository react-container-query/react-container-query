import React, { Component } from 'react';
import { requestAnimationFrame, cancelAnimationFrame } from './raf';
import { parseQuery, isClassMapEqual, toPairs } from './containerQuery';

export default function createContainerQueryMixin(query) {

  const getClasses = parseQuery(query);

  return {
    defineContainer(component) {
      this._containerElement = component;
    },

    componentDidMount() {
      this._containerQueryClassMap = {};
      this._size = {width: null, height: null};
      this._rafId = null;

      const checkDimension = () => {
        const {clientWidth: width, clientHeight: height} = this._containerElement;

        let changed = false;

        if (this._size.width !== width) {
          changed = true;
        }

        if (this._size.height !== height) {
          changed = true;
        }

        this._size.width = width;
        this._size.height = height;

        if (changed) {
          this._updateClasses();
        }

        this._rafId = requestAnimationFrame(checkDimension);
      };

      checkDimension();
    },

    componentWillUnmount() {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
      this._containerElement = null;
    },

    _updateClasses() {
      const classMap = getClasses(this._size);

      if (isClassMapEqual(this._containerQueryClassMap, classMap)) {
        return;
      }

      this._containerQueryClassMap = classMap;

      for (const [className, isOn] of toPairs(this._containerQueryClassMap)) {
        this._containerElement.classList[isOn ? 'add' : 'remove'](className);
      }
    },
  };
}
