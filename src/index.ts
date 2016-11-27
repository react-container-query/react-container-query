import React = require('react');
import ReactDOM = require('react-dom');
import isEqual = require('lodash/isEqual');
import ResizeObserverLite from 'resize-observer-lite';
import matchQueries from 'container-query-toolkit/lib/matchQueries';

/**
 * <ContainerQuery tagName='div' query={query}>
 *   {(params) => {
 *     <div className={classname(params.class)}></div>
 *   }}
 * </ContainerQuery>
 */

export default class ContainerQuery extends React.Component<Props, State> {
  private rol: ResizeObserverLite | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      params: {}
    };
  }

  render() {
    let children: JSX.Element | null = null;

    if (this.props.children) {
      if (typeof this.props.children === 'function') {
        children = (this.props.children as ChildFunction)(this.state.params);
      } else {
        children = this.props.children as JSX.Element;
      }
    }

    return children || null;
  }

  componentDidMount() {
    this.rol = new ResizeObserverLite((size) => {
      const params = matchQueries(this.props.query)(size);

      if (!isEqual(this.state.params, params)) {
        this.setState({params});
      }
    });

    this.rol.observe(ReactDOM.findDOMNode(this));
  }

  componentDidUpdate() {
    this.rol!.observe(ReactDOM.findDOMNode(this));
  }

  componentWillUnmount() {
    this.rol!.disconnect();
    this.rol = null;
  }
}

export interface Props extends React.HTMLProps<ContainerQuery> {  
  children?: ChildFunction | JSX.Element;
  query: {[key: string]: ContainerQueries};
}

export interface State {
  params: Params;
}

export interface ChildFunction {
  (params: Params): JSX.Element | null;
}

export interface Params {
  [key: string]: boolean;
}

export interface ContainerQueries {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}
