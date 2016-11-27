import React, {Component} from 'react';
import {render, findDOMNode} from 'react-dom';
import ContainerQuery from '../lib/index';

describe('ContainerQuery', function () {

  describe('with children function', function () {
    const query = {
      mobile: {maxWidth: 399},
      desktop: {minWidth: 400}
    };

    let $div;

    function renderContainer(children) {
      class Container extends Component {
        render() {
          return (
            <ContainerQuery query={query}>
              {children}
            </ContainerQuery>
          );
        }
      }

      return findDOMNode(render(<Container/>, $div));
    }

    beforeEach(function () {
      $div = document.createElement('div');
      document.body.appendChild($div);
    });

    afterEach(function () {
      document.body.removeChild($div);
    });

    it('renders nothing', function () {
      const node = renderContainer();

      expect(node).toBe(null);
    });

    it('sets mobile to true when width is small', function (done) {
      let _params;

      const node = renderContainer((params) => {
        _params = params;
        return <div style={{width: '200px'}}></div>;
      });

      setTimeout(() => {
        expect(_params).toEqual({mobile: true, desktop: false});
        done();
      }, 100);
    });

    it('changes className to "desktop" when width becomes large', function (done) {
      let _params;

      const node = renderContainer((params) => {
        _params = params;
        return <div style={{width: '200px'}}></div>;
      });

      setTimeout(() => {
        node.style.width = '500px';
        setTimeout(() => {
          expect(_params).toEqual({mobile: false, desktop: true});
          done();
        }, 100);
      }, 100);
    });

    it('allows swap child component type', function (done) {
      class TestApp extends Component {
        constructor(props) {
          super(props);
          this.state = {
            child: <div></div>
          };
        }

        componentDidMount() {
          setTimeout(() => {
            this.setState({
              child: <p></p>
            });
          }, 200);
        }

        render() {
          return (
            <ContainerQuery query={query}>
              {() => this.state.child}
            </ContainerQuery>
          );
        }
      }

      const node = findDOMNode(render(<div><TestApp/></div>, $div));

      setTimeout(() => {
        expect(node.children[0].tagName).toBe('DIV');

        setTimeout(() => {
          expect(node.children[0].tagName).toBe('P');
          done();
        }, 500);
      }, 100);
    });

    it('allows swap child component to null', function (done) {
      class TestApp extends Component {
        constructor(props) {
          super(props);
          this.state = {
            child: <div></div>
          };
        }

        componentDidMount() {
          setTimeout(() => {
            this.setState({
              child: null
            });
          }, 200);
        }

        render() {
          return (
            <ContainerQuery query={query}>
              {() => this.state.child}
            </ContainerQuery>
          );
        }
      }

      const node = findDOMNode(render(<div><TestApp/></div>, $div));

      setTimeout(() => {
        expect(node.children[0].tagName).toBe('DIV');

        setTimeout(() => {
          expect(node.children.length).toBe(0);
          done();
        }, 500);
      }, 100);
    });

    it('allows swap child component from null', function (done) {
      class TestApp extends Component {
        constructor(props) {
          super(props);
          this.state = {
            child: null
          };
        }

        componentDidMount() {
          setTimeout(() => {
            this.setState({
              child: <div></div>
            });
          }, 200);
        }

        render() {
          return (
            <ContainerQuery query={query}>
              {() => this.state.child}
            </ContainerQuery>
          );
        }
      }

      const node = findDOMNode(render(<div><TestApp/></div>, $div));

      setTimeout(() => {
        expect(node.children.length).toBe(0);

        setTimeout(() => {
          expect(node.children[0].tagName).toBe('DIV');
          done();
        }, 500);
      }, 100);
    });
  });

  describe('with static child element', function () {
    const query = {
      mobile: {maxWidth: 399},
      desktop: {minWidth: 400}
    };

    let $div;

    function renderContainer(children) {
      class Container extends Component {
        render() {
          return (
            <ContainerQuery query={query}>
              {children}
            </ContainerQuery>
          );
        }
      }

      return findDOMNode(render(<Container/>, $div));
    }

    beforeEach(function () {
      $div = document.createElement('div');
      document.body.appendChild($div);
    });

    afterEach(function () {
      document.body.removeChild($div);
    });

    it('just renders', function () {
      const node = renderContainer(<div></div>);

      expect(node.tagName).toBe('DIV');
    });
  });
});
