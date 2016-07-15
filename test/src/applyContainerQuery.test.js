import React, {Component} from 'react';
import {render, findDOMNode} from 'react-dom';
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
    let containerNode;

    beforeEach(function () {
      div = document.createElement('div');
      document.body.appendChild(div);
      containerNode = findDOMNode(render(<ContainerQuery/>, div));
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
    let containerNode;

    beforeEach(function () {
      div = document.createElement('div');
      document.body.appendChild(div);
      containerNode = findDOMNode(render(<ContainerQuery/>, div));
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
      return findDOMNode(render(
        <ContainerQuery other1={props.other1} other2={props.other2} />,
        div));
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

});
