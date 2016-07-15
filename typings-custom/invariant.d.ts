declare module 'invariant' {
  interface Invariant {
    (value: any, message: string): void;
  }

  const invariant: Invariant;

  export = invariant;
}
