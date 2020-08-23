import { ZoopCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { FirebaseCard, FirebaseCardDocument } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { RecoilState } from "recoil";

export interface SkeletonProps {
    shouldShowStatus?: boolean;
    rightButton?: {
        icon: string;
        color: string;
        onClick: () => void;
    };
    zoopCard?: ZoopCard.Info;
    firebaseCardData?: FirebaseCard.Generic;
}

type ZoopAtomFamily = (param: string) => RecoilState<ZoopCard.Info>;

export interface CardRowProps {
    onClick?: (id: string) => void;
    selected?: string | undefined;
    shouldShowStatus?: boolean;
    rightButton?: {
        icon: string;
        color: string;
        onClick: (id: string) => void;
    };
    firebaseCard: FirebaseCardDocument;
    zoopAtom: ZoopAtomFamily;
}
