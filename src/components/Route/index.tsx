import React, { useMemo, cloneElement, ReactElement, ReactNode, isValidElement, useEffect } from "react";
import { useRouter, useLocation, useRoute } from "wouter";
import { useUser, SuspenseWithPerf, useAnalytics } from "reactfire";
import SuspenseFallback from "@bit/vitorbarbosa19.ziro.component-suspense-fallback";

interface SwitchProps {
    defaultPrivateOnlyFallback: ReactNode;
    defaultPublicOnlyFallback: ReactNode;
    defaultSuspenseFallback?: ReactNode;
    reactfire?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
    children,
    defaultPrivateOnlyFallback,
    defaultPublicOnlyFallback,
    defaultSuspenseFallback = SuspenseFallback({}),
    reactfire = false,
}) => {
    const { matcher } = useRouter();
    const [location] = useLocation();
    const user = useUser<firebase.User>();
    const analytics = reactfire && useAnalytics();

    const childrenArray = useMemo(() => (Array.isArray(children) ? children : [children]), [children]);
    const usableChildren = useMemo<ReactElement[]>(() => childrenArray.filter(isValidElement), [childrenArray]);
    const matches = useMemo(() => usableChildren.map(({ props }) => matcher(props.path, location)), [usableChildren, matcher, location]);
    const index = useMemo(() => matches.findIndex(([match]) => match), [matches]);
    const element = useMemo(() => usableChildren[index], [usableChildren, index]);
    const match = useMemo(() => matches[index], [matches, index]);

    useEffect(() => {
        new Promise((resolve, reject) => {
            const req = window.indexedDB.open("firebaseLocalStorageDb");
            req.onsuccess = resolve;
            req.onupgradeneeded = reject;
        }).catch(window.location.reload.bind(window.location));
        if (reactfire && element) {
            analytics.setCurrentScreen(window.location.host + element.props.path);
            analytics.logEvent("page_view", {
                app_name: window.location.host,
                screen_name: element.props.path,
            });
        }
    }, [index]);

    useEffect(() => {
        if (!reactfire) return;
        if (user) analytics.setUserId(user.uid);
        if (!user) analytics.setUserId("anonymous");
    }, [user]);

    if (index === -1) return null;

    //if route is public only and user is logged
    if (element.props.publicOnly && user && user.emailVerified)
        return (
            <>
                {element.props.helmet && React.cloneElement(element.props.helmet, match[1])}
                {element.props.fallback || defaultPublicOnlyFallback}
            </>
        );
    //if route is private only and user is unlogged
    if (element.props.privateOnly && (!user || !user.emailVerified))
        return (
            <>
                {element.props.helmet && React.cloneElement(element.props.helmet, match[1])}
                {element.props.fallback || defaultPrivateOnlyFallback}
            </>
        );
    //else render element
    return (
        <SuspenseWithPerf traceId={window.location.host + element.props.path} fallback={element.props.fallback || defaultSuspenseFallback}>
            {element.props.helmet && React.cloneElement(element.props.helmet, match[1])}
            {React.cloneElement(element, { match })}
        </SuspenseWithPerf>
    );
};

interface CommonProps {
    path: string;
    match?: ReturnType<ReturnType<typeof useRouter>["matcher"]>;
    suspenseFallback?: ReactNode;
    fallback?: ReactNode;
    helmet?: ReactNode;
}

interface PublicAndPrivateProps extends CommonProps {
    publicOnly?: false;
    privateOnly?: false;
}

interface PublicOnlyProps extends CommonProps {
    publicOnly: true;
    privateOnly?: false;
}

interface PrivateOnlyProps extends CommonProps {
    privateOnly: true;
    publicOnly?: false;
}

type RouteProps = PublicAndPrivateProps | PublicOnlyProps | PrivateOnlyProps;

export const Route: React.FC<RouteProps> = ({ path, match, children }) => {
    const useRouteMatch = useRoute(path);
    const [matches, params] = match || useRouteMatch;
    if (!matches || !isValidElement(children)) return null;
    return cloneElement(children, params);
};
