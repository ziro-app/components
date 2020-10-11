export interface State {
    number: string;
    cardholder: string;
    expiry: string;
    cvv: string;
    brand: string;
}

export interface Props {
    header: React.ReactNode;
    next: {
        onClick: (s: State) => Promise<void>;
        title?: string;
    };
    previous: {
        onClick: (s: State) => Promise<void>;
        title?: string;
    };
}
