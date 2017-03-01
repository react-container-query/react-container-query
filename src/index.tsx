import React = require('react');
import ReactDOM = require('react-dom');
import omitBy = require('lodash/omitBy');
import matchQueries from 'container-query-toolkit/lib/matchQueries';
import {Props, State, Params, Query, Values} from './interfaces';
import ContainerQueryCore from './ContainerQueryCore';

function cleanParams(query: Query, params: Params, width: number, height: number): Params {
  // Clean up any matches that include a query for a value we don't yet have
  if (width === Infinity) {
    params = omitBy(params, (_, key: string): boolean => (
      typeof query[key].minWidth !== 'undefined'
      || typeof query[key].maxWidth !== 'undefined'
    )) as Params;
  }

  if (height === Infinity) {
    params = omitBy(params, (_, key: string): boolean => (
      typeof query[key].minHeight !== 'undefined'
      || typeof query[key].maxHeight !== 'undefined'
    )) as Params;
  }

  return params;
}

/**
 * <ContainerQuery query={query} values={{width: 123, height: 456}}>
 *   {(params) => {
 *     <div className={classname(params.class)}></div>
 *   }}
 * </ContainerQuery>
 */

export class ContainerQuery extends React.Component<Props, State> {
  private cqCore: ContainerQueryCore | null = null;

  constructor(props: Props) {
    super(props);
    const {width = Infinity, height = Infinity}: {width?: number, height?: number} = (props.values || {});

    if (width === Infinity && height === Infinity) {
      this.state = {
        params: {}
      };
      return;
    }

    let params: Params = matchQueries(props.query)({width, height});

    params = cleanParams(props.query, params, width, height);

    this.setState({params});
  }

  componentDidMount() {
    this.cqCore = new ContainerQueryCore(this.props.query, (params) => {
      this.setState({params});
    });
    this.cqCore.storeParams(this.state.params);
    this.cqCore.observe(ReactDOM.findDOMNode(this));
  }

  componentDidUpdate() {
    this.cqCore!.observe(ReactDOM.findDOMNode(this));
  }

  componentWillUnmount() {
    this.cqCore!.disconnect();
    this.cqCore = null;
  }

  render() {
    return this.props.children(this.state.params);
  }
}

/**
 * applyContainerQuery(BoxComponent, query);
 */

export function applyContainerQuery<P extends {containerQuery: Params}>(
  Component: React.ComponentClass<P>,
  query: Query,
  values?: Values
): React.ComponentClass<P> {
  class ContainerQuery extends React.Component<P, State> {
    static displayName: string = Component.displayName
      ? `ContainerQuery(${Component.displayName})`
      : 'ContainerQuery';

    private cqCore: ContainerQueryCore | null = null;

    constructor(props: P) {
      super(props);

      const {width = Infinity, height = Infinity}: {width?: number, height?: number} = (values || {});

      if (width === Infinity && height === Infinity) {
        this.state = {
          params: {}
        };
        return;
      }

      let params: Params = matchQueries(query)({width, height});

      params = cleanParams(query, params, width, height);

      this.setState({params});
    }

    componentDidMount() {
      this.cqCore = new ContainerQueryCore(query, (params) => {
        this.setState({params});
      });
      this.cqCore.storeParams(this.state.params);
      this.cqCore.observe(ReactDOM.findDOMNode(this));
    }

    componentDidUpdate() {
      this.cqCore!.observe(ReactDOM.findDOMNode(this));
    }

    componentWillUnmount() {
      this.cqCore!.disconnect();
      this.cqCore = null;
    }

    render() {
      return <Component {...this.props} containerQuery={this.state.params}/>;
    }
  };

  return ContainerQuery;
}
