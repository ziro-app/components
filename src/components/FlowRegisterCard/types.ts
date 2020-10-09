export interface State {
    number: string;
    cardholder: string;
    expiry: string;
    cvv: string;
    brand: string;
}

export interface Props {
    next: {
        onClick: (state: State) => Promise<void>;
        name: string;
    };
    previous?: {
        onClick: (state: State) => Promise<void>;
        name: string;
    };
    header?: React.ReactElement;
}
