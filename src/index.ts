import React = require('react');
import omit = require('lodash/omit');
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

export default class extends React.Component<Props, State> {
  private rol: ResizeObserverLite | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      params: {}
    };
  }

  componentDidMount() {
    this.rol = new ResizeObserverLite((size) => {
      const params = matchQueries(this.props.query)(size);

      if (!isEqual(this.state.params, params)) {
        this.setState({params});
      }
    });

    this.rol.observe((<any> this.refs).container as HTMLElement);
  }

  render() {
    const children = this.props.children(this.state.params);
    const props = omit(this.props, ['children', 'tagName', 'query']) as any;

    props.ref = 'container';

    if (children) {
      return React.createElement(this.props.tagName || 'div', props, children);
    } else {
      return React.createElement(this.props.tagName || 'div', props);
    }
  }

  componentWillUnmount() {
    this.rol!.disconnect();
    this.rol = null;
  }
}

export interface Props {
  children: ChildFunction;
  tagName?: string;
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
