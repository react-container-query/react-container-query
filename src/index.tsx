import React = require('react');
import ReactDOM = require('react-dom');
import {Props, State, Params, Query} from './interfaces';
import ContainerQueryCore from './ContainerQueryCore';

/**
 * <ContainerQuery query={query}>
 *   {(params) => {
 *     <div className={classname(params.class)}></div>
 *   }}
 * </ContainerQuery>
 */

export class ContainerQuery extends React.Component<Props, State> {
  private cqCore: ContainerQueryCore | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      params: {}
    };
  }

  componentDidMount() {
    this.cqCore = new ContainerQueryCore(this.props.query, (params) => {
      this.setState({params});
    });

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
  query: Query
): React.ComponentClass<P> {
  class ContainerQuery extends React.Component<P, State> {
    static displayName: string = Component.displayName
      ? `ContainerQuery(${Component.displayName})`
      : 'ContainerQuery';

    private cqCore: ContainerQueryCore | null = null;

    constructor(props: P) {
      super(props);
      this.state = {
        params: {}
      };
    }

    componentDidMount() {
      this.cqCore = new ContainerQueryCore(query, (params) => {
        this.setState({params});
      });

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
