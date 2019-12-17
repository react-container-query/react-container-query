import React = require('react');
import { useEffect, useRef, useState } from 'react';
import ReactDOM = require('react-dom');
import matchQueries from 'container-query-toolkit/lib/matchQueries';
import { Props, State, Params, Query, Size } from './interfaces';
import ContainerQueryCore from './ContainerQueryCore';

/**
 * <ContainerQuery query={query} initialSize={{width: 123, height: 456}}>
 *   {(params) => {
 *     <div className={classname(params)}></div>
 *   }}
 * </ContainerQuery>
 */

export const ContainerQuery: React.FunctionComponent<Props> = ({
  children: renderContents,
  query,
  initialSize,
}) => {
  const [params, setParams]: [any, any] = useState(initialSize ? matchQueries(query)(initialSize) : {});
  const [prevQuery, setPrevQuery]: [any, any] = useState(null);
  const elementRef: any = useRef(null);
  const cqCoreRef: any = useRef(null);

  useEffect(() => {
    cqCoreRef.current = new ContainerQueryCore(query, (params: any) => {
      if (elementRef.current) {
        setParams(params);
      }
    });

    return () => {
      cqCoreRef.current = null;
    };
  }, [elementRef, query]);

  useEffect(() => {
    if (elementRef.current && query !== prevQuery) {
      cqCoreRef.current.observe(elementRef.current);
      setPrevQuery(query);
    }

    return () => {};
  }, [elementRef, prevQuery, query]);

  return renderContents(params, elementRef)
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

      this.cqCore.observe(ReactDOM.findDOMNode(this) as Element);
    }

    componentDidUpdate() {
      this.cqCore!.observe(ReactDOM.findDOMNode(this) as Element);
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
