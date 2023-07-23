export type PropertyMapper<S, D, K extends keyof D> = (source: S) => D[K];
