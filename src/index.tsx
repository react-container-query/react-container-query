import React = require('react');
import ReactDOM = require('react-dom');
import matchQueries from 'container-query-toolkit/lib/matchQueries';
import {Props, State, Params, Query, Size} from './interfaces';
import ContainerQueryCore from './ContainerQueryCore';

/**
 * <ContainerQuery query={query} initialSize={{width: 123, height: 456}}>
 *   {(params) => {
 *     <div className={classname(params)}></div>
 *   }}
 * </ContainerQuery>
 */

export class ContainerQuery extends React.Component<Props, State> {
  private cqCore: ContainerQueryCore | null = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      params: props.initialSize
        ? matchQueries(props.query)(props.initialSize)
        : {},
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
  query: Query,
  initialSize?: Size
): React.ComponentClass<P> {
  class ContainerQuery extends React.Component<P, State> {
    static displayName: string = Component.displayName
      ? `ContainerQuery(${Component.displayName})`
      : 'ContainerQuery';

    private cqCore: ContainerQueryCore | null = null;

    constructor(props: P) {
      super(props);

      this.state = {
        params: initialSize
          ? matchQueries(query)(initialSize)
          : {},
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
