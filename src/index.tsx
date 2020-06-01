import React = require('react');
import ReactDOM = require('react-dom');
import matchQueries from 'container-query-toolkit/lib/matchQueries';
import {Props, State, Params, Query, Size} from './interfaces';
import ContainerQueryCore from './ContainerQueryCore';
import isShallowEqual from './isShallowEqual';

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
    this._startObserving(this.props.query);
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    // componentWillReceiveProps and componentDidMount can potentially run out of order,
    // so we need to consider the case where cqCore is not initialized yet.
    if (this.cqCore && !isQueriesEqual(this.props.query, nextProps.query)) {
      this.cqCore.disconnect();
      this.cqCore = null;
      this._startObserving(nextProps.query);
    }
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

  _startObserving(query: Query) {
    this.cqCore = new ContainerQueryCore(query, (params) => {
      this.setState({ params });
    });

    this.cqCore.observe(ReactDOM.findDOMNode(this));
  }
}

/**
 * applyContainerQuery(BoxComponent, query, initialSize);
 */

export type Component<T> = React.ComponentClass<T> | React.StatelessComponent<T>;

export interface QueryProps {
  containerQuery: Params;
};

export function applyContainerQuery<T>(
  Component: Component<T & QueryProps>,
  query: Query,
  initialSize?: Size
): React.ComponentClass<T> {
  return class ContainerQuery extends React.Component<T, State> {
    static displayName: string = Component.displayName
      ? `ContainerQuery(${Component.displayName})`
      : 'ContainerQuery';

    private cqCore: ContainerQueryCore | null = null;

    constructor(props: T) {
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
      return (
        <Component
          {...this.props}
          containerQuery={this.state.params}
        />
      );
    }
  };
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

function isQueriesEqual(queryA: Query, queryB: Query): boolean {
  const keysA = Object.keys(queryA);
  const keysB = Object.keys(queryB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(queryB, keysA[i]) ||
      !isShallowEqual(queryA[keysA[i]], queryB[keysA[i]])) {
      return false;
    }
  }

  return true;
}
