type Grow<T, A extends Array<T>, N extends number> = A["length"] extends N ? A : Grow<T, [...A, T], N>;
export type FixedArray<T, N extends number> = Grow<T, [T], N>;
