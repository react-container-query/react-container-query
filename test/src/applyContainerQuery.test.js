import React, {Component} from 'react';
import {render, findDOMNode} from 'react-dom';
import { findRenderedComponentWithType } from 'react-addons-test-utils';
import classnames from 'classnames';
import applyContainerQuery from '../../lib/applyContainerQuery';

describe('applyContainerQuery', function () {

  describe('opts.propName = "containerQuery" (default)', function () {

    class Container extends Component {
      render() {
        return <div className={classnames(this.props.containerQuery)}></div>;
      }
    }

    const ContainerQuery = applyContainerQuery(Container, {
      mobile: {maxWidth: 399},
      desktop: {minWidth: 400}
    });

    let div;
    let renderOutput;
    let intermediateNode;
    let containerNode;

    beforeEach(function () {
      div = document.createElement('div');
      document.body.appendChild(div);
      renderOutput = render(<ContainerQuery/>, div);
      intermediateNode = findDOMNode(renderOutput);
      intermediateNode.style.display = 'inline-block';
      containerNode = findDOMNode(findRenderedComponentWithType(renderOutput, Container));
    });

    afterEach(function () {
      document.body.removeChild(div);
    });

    it('sets container className to mobile', function (done) {
      containerNode.style.width = '200px';

      setTimeout(() => {
        expect(containerNode.className).toBe('mobile');
        done();
      }, 1000);
    });

    it('sets container className to desktop', function (done) {
      containerNode.style.width = '500px';

      setTimeout(() => {
        expect(containerNode.className).toBe('desktop');
        done();
      }, 1000);
    });

  });

  describe('opts.propName = "customName"', function () {

    class Container extends Component {
      render() {
        return <div className={classnames(this.props.customName)}></div>;
      }
    }

    const ContainerQuery = applyContainerQuery(Container, {
      mobile: {maxWidth: 399},
      desktop: {minWidth: 400}
    }, {
      propName: 'customName'
    });

    let div;
    let renderOutput;
    let intermediateNode;
    let containerNode;

    beforeEach(function () {
      div = document.createElement('div');
      document.body.appendChild(div);
      renderOutput = render(<ContainerQuery/>, div);
      intermediateNode = findDOMNode(renderOutput);
      intermediateNode.style.display = 'inline-block';
      containerNode = findDOMNode(findRenderedComponentWithType(renderOutput, Container));
    });

    afterEach(function () {
      document.body.removeChild(div);
    });

    it('sets container className to mobile', function (done) {
      containerNode.style.width = '200px';

      setTimeout(() => {
        expect(containerNode.className).toBe('mobile');
        done();
      }, 1000);
    });

    it('sets container className to desktop', function (done) {
      containerNode.style.width = '500px';

      setTimeout(() => {
        expect(containerNode.className).toBe('desktop');
        done();
      }, 1000);
    });

  });

  describe('props', function () {

    class Container extends Component {
      render() {
        return (
          <div
            data-other1={this.props.other1}
            data-other2={this.props.other2}></div>
        );
      }
    }

    const ContainerQuery = applyContainerQuery(Container, {
      mobile: {maxWidth: 399},
      desktop: {minWidth: 400}
    });

    let div;

    function renderContainerQuery(props) {
      return findDOMNode(
        findRenderedComponentWithType(
          render(
            <ContainerQuery
              other1={props.other1}
              other2={props.other2}
            />,
            div
          ),
          Container
        )
      );
    }

    beforeEach(function () {
      div = document.createElement('div');
      document.body.appendChild(div);
    });

    afterEach(function () {
      document.body.removeChild(div);
    });

    it('passes other props to child', function () {
      const node = renderContainerQuery({other1: 'hello', other2: 'world'});
      expect(node.getAttribute('data-other1')).toBe('hello');
      expect(node.getAttribute('data-other2')).toBe('world');
    });

  });

  describe('displayName', function () {

    it('calculates displayName from wrapped component', function () {
      class Container extends Component {
        render() {
          return <div></div>;
        }
      }

      Container.displayName = 'ABC';

      const ContainerQuery = applyContainerQuery(Container, {});

      expect(ContainerQuery.displayName).toBe('ContainerQuery(ABC)');
    });

    it('uses default displayName if wrapped component has no displayName', function () {
      class Container extends Component {
        render() {
          return <div></div>;
        }
      }

      const ContainerQuery = applyContainerQuery(Container, {});

      expect(ContainerQuery.displayName).toBe('ContainerQuery(Component)');
    });

  });

  describe('edge cases', function () {

    class Container extends Component {
      render() {
        return null;
      }
    }

    const ContainerQuery = applyContainerQuery(Container, {
      mobile: {maxWidth: 399},
      desktop: {minWidth: 400}
    });

    let div;

    function renderContainerQuery(props) {
      return findDOMNode(
        findRenderedComponentWithType(
          render(
            <ContainerQuery
              other1={props.other1}
              other2={props.other2}
            />,
            div
          ),
          Container
        )
      );
    }

    beforeEach(function () {
      div = document.createElement('div');
      document.body.appendChild(div);
    });

    afterEach(function () {
      document.body.removeChild(div);
    });

    it('should allow wrapped component to return null', function () {
      const containerNode = renderContainerQuery({other1: 'hello', other2: 'world'});

      expect(containerNode).toBeNull();
    });

  });


  describe('works with a stateless component', function () {

    const Container = (props) => <div className={classnames(props.containerQuery)}></div>;

    const ContainerQuery = applyContainerQuery(Container, {
      mobile: {maxWidth: 399},
      desktop: {minWidth: 400}
    });

    let div;
    let renderOutput;
    let intermediateNode;
    let containerNode;

    beforeEach(function () {
      div = document.createElement('div');
      document.body.appendChild(div);
      renderOutput = render(<ContainerQuery/>, div);
      intermediateNode = findDOMNode(renderOutput);
      intermediateNode.style.display = 'inline-block';
      containerNode = intermediateNode.querySelector('div');
    });

    afterEach(function () {
      document.body.removeChild(div);
    });

    it('sets container className to mobile', function (done) {
      containerNode.style.width = '200px';

      setTimeout(() => {
        expect(containerNode.className).toBe('mobile');
        done();
      }, 1000);
    });

    it('sets container className to desktop', function (done) {
      containerNode.style.width = '500px';

      setTimeout(() => {
        expect(containerNode.className).toBe('desktop');
        done();
      }, 1000);
    });

  });

});
