export interface Validation<T> {
    name: string;
    validation: (value: T) => boolean;
    value: T;
    message: string;
}
