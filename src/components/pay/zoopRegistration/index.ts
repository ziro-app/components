import { useStoreownerDocument, StoreownerQueryDocumentSnapshot } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";
import { useAnalytics } from "reactfire";
import { createBuyer } from "@bit/vitorbarbosa19.ziro.pay.zoop";

const suspendIfNeeded = (() => {
    let _error: any;
    let suspender: Promise<any>;
    return <T = string>(
        analytics: ReturnType<typeof useAnalytics>,
        storeowner: StoreownerQueryDocumentSnapshot,
        startWithValue?: T,
    ) => {
        const data = storeowner.data();
        if (data.zoopId) return data.zoopId;
        if (!suspender)
            suspender = createBuyer(data)
                .then(({ id: zoopId }) => storeowner.ref.update({ zoopId }))
                .catch((error) => {
                    analytics.logEvent("error registering zoop buyer", { error });
                    _error = error;
                })
                .finally(() => (suspender = null));
        if (_error) throw _error;
        if (startWithValue) return startWithValue;
        throw suspender;
    };
})();

/**
 * Esse hook procura pelo zoopId no storeowner, caso não encontra, ele tenta cadastrar o buyer junto a zoop
 * @param startWithValue caso esse valor não seja fornecido o hook irá suspender enquanto estiver fazendo o cadastro
 */
export const useZoopRegistration = <T = string>(startWithValue?: T) => {
    return suspendIfNeeded(useAnalytics(), useStoreownerDocument(), startWithValue);
};
