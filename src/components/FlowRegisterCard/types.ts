export interface StateWithoutInstallments {
    holder_name: string;
    security_code: string;
    expiration_month: string;
    expiration_year: string;
    card_number: string;
    shouldTransact: boolean;
}

export interface StateWithInstallments extends Omit<StateWithoutInstallments, "shouldTransact"> {
    installments: string;
}

export interface PropsWithoutInstallments {
    header: React.ReactNode;
    installmentsMax?: undefined;
    charge?: undefined;
    seller?: undefined;
    showInstallments: false;
    next: {
        onClick: (s: StateWithoutInstallments) => Promise<void>;
        title?: string;
    };
    previous?: {
        onClick: (s: StateWithoutInstallments) => Promise<void>;
        title?: string;
    };
}

export interface PropsWithInstallments {
    header: React.ReactNode;
    installmentsMax: string;
    charge: string;
    seller: string;
    showInstallments: true;
    next: {
        onClick: (s: StateWithInstallments) => Promise<void>;
        title?: string;
    };
    previous?: {
        onClick: (s: StateWithInstallments) => Promise<void>;
        title?: string;
    };
}

export type Props = PropsWithoutInstallments | PropsWithInstallments;
export type State = StateWithoutInstallments | StateWithInstallments;
