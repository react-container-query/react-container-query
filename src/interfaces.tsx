export interface Props {
  children: ChildFunction;
  query: Query;
  initialSize?: Size;
}

export interface Size {
  width?: number;
  height?: number;
}

export interface State {
  params: Params;
}

export interface ChildFunction {
  (params: Params): JSX.Element | null;
}

export interface Query {
	[key: string]: ContainerQueries;
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
