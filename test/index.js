import React, {Component} from 'react';
import {render, findDOMNode} from 'react-dom';
import ContainerQuery from '../lib/index';

describe('ContainerQuery', function () {

  describe('no child element', function () {

    class Container extends Component {
      render() {
        const query = {
          mobile: {maxWidth: 399},
          desktop: {minWidth: 400}
        };

        return (
          <ContainerQuery query={query} {...this.props}/>
        );
      }
    }

    let $div;

    function renderContainer(props) {
      return findDOMNode(render(<Container {...props}/>, $div));
    }

    beforeEach(function () {
      $div = document.createElement('div');
      document.body.appendChild($div);
    });

    afterEach(function () {
      document.body.removeChild($div);
    });

    it('just renders', function () {
      const node = renderContainer();
      expect(node.tagName).toBe('DIV');
    });

    it('assigns className with "mobile" when width is small', function (done) {
      const node = renderContainer({style: {width: '200px'}});

      setTimeout(() => {
        expect(node.className).toBe('mobile');
        done();
      }, 100);
    });

    it('changes className to "desktop" when width becomes large', function (done) {
      const node = renderContainer({style: {width: '200px'}});

      setTimeout(() => {
        node.style.width = '500px';
        setTimeout(() => {
          expect(node.className).toBe('desktop');
          done();
        }, 100);
      }, 100);
    });

  });

  describe('with static child element', function () {

    class Container extends Component {
      render() {
        const query = {
          mobile: {maxWidth: 399},
          desktop: {minWidth: 400}
        };

        return (
          <ContainerQuery query={query} {...this.props}>
            <div></div>
            <div></div>
          </ContainerQuery>
        );
      }
    }

    let $div;

    function renderContainer(props) {
      return findDOMNode(render(<Container {...props}/>, $div));
    }

    beforeEach(function () {
      $div = document.createElement('div');
      document.body.appendChild($div);
    });

    afterEach(function () {
      document.body.removeChild($div);
    });

    it('just renders', function () {
      const node = renderContainer();
      expect(node.tagName).toBe('DIV');
    });

    it('assigns className with "mobile" when width is small', function (done) {
      const node = renderContainer({style: {width: '200px'}});

      setTimeout(() => {
        expect(node.className).toBe('mobile');
        done();
      }, 100);
    });

    it('changes className to "desktop" when width becomes large', function (done) {
      const node = renderContainer({style: {width: '200px'}});

      setTimeout(() => {
        node.style.width = '500px';
        setTimeout(() => {
          expect(node.className).toBe('desktop');
          done();
        }, 100);
      }, 100);
    });

  });

  describe('with function child', function () {

    let func;
    let $div;

    function renderContainer(props) {
      func = jasmine.createSpy('children').and.returnValue(<div/>);

      class Container extends Component {
        render() {
          const query = {
            mobile: {maxWidth: 399},
            desktop: {minWidth: 400}
          };

          return (
            <ContainerQuery query={query} {...this.props}>
              {func}
            </ContainerQuery>
          );
        }
      }

      return findDOMNode(render(<Container {...props}/>, $div));
    }

    beforeEach(function () {
      $div = document.createElement('div');
      document.body.appendChild($div);
    });

    afterEach(function () {
      document.body.removeChild($div);
    });

    it('just renders', function () {
      const node = renderContainer();
      expect(node.tagName).toBe('DIV');
    });

    it('assigns className with "mobile" when width is small', function (done) {
      const node = renderContainer({style: {width: '200px'}});

      setTimeout(() => {
        expect(func.calls.mostRecent().args).toEqual([{mobile: true, desktop: false}]);
        done();
      }, 100);
    });

    it('changes className to "desktop" when width becomes large', function (done) {
      const node = renderContainer({style: {width: '200px'}});

      setTimeout(() => {
        node.style.width = '500px';
        setTimeout(() => {
          expect(func.calls.mostRecent().args).toEqual([{mobile: false, desktop: true}]);
          done();
        }, 100);
      }, 100);
    });

  });

});
