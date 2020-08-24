import { useStoreownerDocument, StoreownerQueryDocumentSnapshot } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";
import { createBuyer } from "@bit/vitorbarbosa19.ziro.pay.zoop";

const suspendIfNeeded = (() => {
    let error: any;
    let suspender: Promise<any>;
    return <T = string>(storeowner: StoreownerQueryDocumentSnapshot, startWithValue?: T) => {
        const data = storeowner.data();
        if (data.zoopId) return data.zoopId;
        if (!suspender)
            suspender = createBuyer(data)
                .then(({ id: zoopId }) => storeowner.ref.update({ zoopId }))
                .catch((e) => (error = e))
                .finally(() => (suspender = null));
        if (error) throw error;
        if (startWithValue) return startWithValue;
        throw suspender;
    };
})();

/**
 * Esse hook procura pelo zoopId no storeowner, caso não encontra, ele tenta cadastrar o buyer junto a zoop
 * @param startWithValue caso esse valor não seja fornecido o hook irá suspender enquanto estiver fazendo o cadastro
 */
export const useZoopRegistration = <T = string>(startWithValue?: T) => {
    return suspendIfNeeded(useStoreownerDocument(), startWithValue);
};
