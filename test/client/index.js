import React, { Component } from 'react';
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

  const originalOnError = window.onerror;

  afterAll(() => {
    // it is safe to ignore this error.
    // https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
    window.onerror = function(err) {
      console.log('onerror', err)
      if(err === 'ResizeObserver loop limit exceeded') {
        return false;
      } else {
        return originalOnError(...arguments);
      }
    }
  });

  afterAll(() => {
    window.onerror = originalOnError;
  })

  beforeEach(function () {
    $div = document.createElement('div');
    document.body.appendChild($div);
  });

  afterEach(function () {
    document.body.removeChild($div);
  });

  it('sets mobile to true when width is small', function (done) {
    try{
      renderContainer({ width: '200px' });
    }catch(e){
      console.log(e);
    }
    setTimeout(() => {
      const node = document.querySelector(`div[data-testid='container']`);
      expect(node.textContent).toBe('mobile');
      done();
    }, 500);
  });

  // it('changes className to "desktop" when width becomes large', function (done) {
  //   let _params;

  //   const node = renderContainer((params) => {
  //     _params = params;
  //     return <div style={{ width: '200px' }}></div>;
  //   });

  //   setTimeout(() => {
  //     node.style.width = '500px';
  //     setTimeout(() => {
  //       expect(_params).toEqual({ mobile: false, desktop: true });
  //       done();
  //     }, 100);
  //   }, 100);
  // });

  // it('allows swap child component type', function (done) {
  //   class TestApp extends Component {
  //     constructor(props) {
  //       super(props);
  //       this.state = {
  //         child: <div></div>
  //       };
  //     }

  //     componentDidMount() {
  //       setTimeout(() => {
  //         this.setState({
  //           child: <p></p>
  //         });
  //       }, 200);
  //     }

  //     render() {
  //       return (
  //         <ContainerQuery query={query}>
  //           {() => this.state.child}
  //         </ContainerQuery>
  //       );
  //     }
  //   }

  //   const node = findDOMNode(render(<div><TestApp /></div>, $div));

  //   setTimeout(() => {
  //     expect(node.children[0].tagName).toBe('DIV');

  //     setTimeout(() => {
  //       expect(node.children[0].tagName).toBe('P');
  //       done();
  //     }, 500);
  //   }, 100);
  // });

  // it('allows swap child component to null', function (done) {
  //   class TestApp extends Component {
  //     constructor(props) {
  //       super(props);
  //       this.state = {
  //         child: <div></div>
  //       };
  //     }

  //     componentDidMount() {
  //       setTimeout(() => {
  //         this.setState({
  //           child: null
  //         });
  //       }, 200);
  //     }

  //     render() {
  //       return (
  //         <ContainerQuery query={query}>
  //           {() => this.state.child}
  //         </ContainerQuery>
  //       );
  //     }
  //   }

  //   const node = findDOMNode(render(<div><TestApp /></div>, $div));

  //   setTimeout(() => {
  //     expect(node.children[0].tagName).toBe('DIV');

  //     setTimeout(() => {
  //       expect(node.children.length).toBe(0);
  //       done();
  //     }, 500);
  //   }, 100);
  // });

  // it('allows swap child component from null', function (done) {
  //   class TestApp extends Component {
  //     constructor(props) {
  //       super(props);
  //       this.state = {
  //         child: null
  //       };
  //     }

  //     componentDidMount() {
  //       setTimeout(() => {
  //         this.setState({
  //           child: <div></div>
  //         });
  //       }, 200);
  //     }

  //     render() {
  //       return (
  //         <ContainerQuery query={query}>
  //           {() => this.state.child}
  //         </ContainerQuery>
  //       );
  //     }
  //   }

  //   const node = findDOMNode(render(<div><TestApp /></div>, $div));

  //   setTimeout(() => {
  //     expect(node.children.length).toBe(0);

  //     setTimeout(() => {
  //       expect(node.children[0].tagName).toBe('DIV');
  //       done();
  //     }, 500);
  //   }, 100);
  // });

});
