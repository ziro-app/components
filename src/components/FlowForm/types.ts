import type { Validation } from "./utils/types";

export interface Button {
    title?: string;
    onClick: () => Promise<void>;
}

export interface FormProps<T> {
    validations: Validation<T>[];
    inputs: React.ReactElement[];
    next: Button;
    previous?: Button;
    padding?: string;
    summary?: JSX.Element;
}

export type FormComponent = <T>(props: FormProps<T>) => React.ReactElement;
