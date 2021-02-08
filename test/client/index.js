import React, { Component, useState } from 'react';
import { useEffect } from 'react';
import { render, findDOMNode } from 'react-dom';
import { ContainerQuery, applyContainerQuery, useContainerQuery } from '../../lib/index';

describe('useContainerQuery', function () {

  const query = {
    mobile: { maxWidth: 399 },
    desktop: { minWidth: 400 }
  };

  let $div;

  function renderContainer({ width }) {
    const Container = () => {
      const [params, containerRef] = useContainerQuery(query);
      return (
        <div data-testid="container" ref={containerRef} style={{ width }}>
          {params.mobile && 'mobile'}
          {params.desktop && 'desktop'}
        </div>
      );
    };

    return render(<Container />, $div);
  }

  beforeEach(function () {
    $div = document.createElement('div');
    document.body.appendChild($div);
  });

  afterEach(function () {
    document.body.removeChild($div);
  });

  it('sets mobile to true when width is small', function (done) {
    renderContainer({ width: '200px' });
    setTimeout(() => {
      const node = document.querySelector(`div[data-testid='container']`);
      expect(node.textContent).toBe('mobile');
      done();
    }, 100);
  });

  it('changes className to "desktop" when width becomes large', function (done) {
    renderContainer({ width: '200px' });

    setTimeout(() => {
      const node = document.querySelector(`div[data-testid='container']`);
      node.style.width = '500px';
      setTimeout(() => {
        expect(node.textContent).toBe('desktop');
        done();
      }, 100);
    }, 100);
  });

  it('allows swapping container types', function (done) {
    const TestApp = () => {
      const [swap, setSwap] = useState(false);
      const [params, containerRef] = useContainerQuery(query);

      useEffect(() => {
        setTimeout(() => {
          setSwap(true);
        }, 200);
      }, []);
      
      if (swap) {
        return (
          <p data-testid="p-container" style={{ width: '200px' }} ref={containerRef}>
            {params.mobile && 'mobile'}
            {params.desktop && 'desktop'}
          </p>
        );
      } else {
        return (
          <div data-testid="div-container" style={{ width: '500px' }} ref={containerRef}>
            {params.mobile && 'mobile'}
            {params.desktop && 'desktop'}
          </div>
        );
      }
    };

    render(<TestApp />, $div);

    setTimeout(() => {
      const divNode = document.querySelector(`div[data-testid='div-container']`);
      expect(divNode.textContent).toBe('desktop')

      setTimeout(() => {
        const pNode = document.querySelector(`p[data-testid='p-container']`);
        expect(pNode.textContent).toBe('mobile')
        done();
      }, 500);
    }, 100);
  });

  it('allows swapping container from null', function (done) {
    const TestApp = () => {
      const [swap, setSwap] = useState(false);
      const [params, containerRef] = useContainerQuery(query);

      useEffect(() => {
        setTimeout(() => {
          setSwap(true);
        }, 200);
      }, []);
      
      if (swap) {
        return (
          <p data-testid="p-container" style={{ width: '200px' }} ref={containerRef}>
            {params.mobile && 'mobile'}
            {params.desktop && 'desktop'}
          </p>
        );
      } else {
        return null;
      }
    };

    render(<TestApp />, $div);

    setTimeout(() => {
      const pNode = document.querySelector(`p[data-testid='p-container']`);
      expect(pNode).toBe(null);

      setTimeout(() => {
        const pNode = document.querySelector(`p[data-testid='p-container']`);
        expect(pNode.textContent).toBe('mobile')
        done();
      }, 500);
    }, 100);
  });


  it('allows swapping container to null', function (done) {
    const TestApp = () => {
      const [swap, setSwap] = useState(false);
      const [params, containerRef] = useContainerQuery(query);

      useEffect(() => {
        setTimeout(() => {
          setSwap(true);
        }, 200);
      }, []);
      
      if (swap) {
        return null;
      } else {
        return (
          <p data-testid="p-container" style={{ width: '200px' }} ref={containerRef}>
            {params.mobile && 'mobile'}
            {params.desktop && 'desktop'}
          </p>
        );
      }
    };

    render(<TestApp />, $div);

    setTimeout(() => {
      const pNode = document.querySelector(`p[data-testid='p-container']`);
      expect(pNode.textContent).toBe('mobile')

      setTimeout(() => {
        const pNode = document.querySelector(`p[data-testid='p-container']`);
        expect(pNode).toBe(null);
        done();
      }, 500);
    }, 100);
  });

});
