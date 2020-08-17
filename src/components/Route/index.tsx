import React,{
    useMemo,
    cloneElement,
    ReactElement,
    ReactNode,
    isValidElement
} from "react";
import { useRouter, useLocation, useRoute } from "wouter"
import { useUser, SuspenseWithPerf } from "reactfire"
//@ts-ignore
import InitialLoader from '@bit/vitorbarbosa19.ziro.initial-loader';

interface SwitchProps {
    defaultPrivateOnlyFallback: React.ReactNode
    defaultPublicOnlyFallback: React.ReactNode
    defaultSuspenseFallback ?: React.ReactNode
}

export const Switch: React.FC<SwitchProps> = ({
    children,
    defaultPrivateOnlyFallback,
    defaultPublicOnlyFallback,
    defaultSuspenseFallback = InitialLoader
}) => {
    const { matcher } = useRouter();
    const [location] = useLocation();
    const user = useUser();

    const childrenArray = useMemo(() => Array.isArray(children) ? children : [children],[children]);
    const usableChildren = useMemo<ReactElement[]>(() => childrenArray.filter(isValidElement),[childrenArray])
    const matches = useMemo(() => usableChildren.map(({ props }) => matcher(props.path, location)),[usableChildren,matcher,location]);
    const index = useMemo(() => matches.findIndex(([match]) => match),[matches])
    const element = useMemo(() => usableChildren[index],[usableChildren,index])
    const match = useMemo(() => matches[index],[matches,index])

    if(index===-1) return null

    //if route is public only and user is logged
    if(element.props.publicOnly&&user) return <>{element.props.fallback||defaultPublicOnlyFallback}</>
    //if route is provate only and user is unlogged
    if(element.props.privateOnly&&!user) return <>{element.props.fallback||defaultPrivateOnlyFallback}</>
    //else render element
    return (
        <SuspenseWithPerf traceId={element.props.path} fallback={element.props.suspenseFallback||defaultSuspenseFallback} >
            { React.cloneElement(element, { match }) }
        </SuspenseWithPerf>   
    )
  };

interface CommonProps {
    path: string
    match?: ReturnType<ReturnType<typeof useRouter>["matcher"]>
    suspenseFallback ?: ReactNode
    fallback ?: ReactNode
}

interface PublicOnlyProps extends CommonProps {
    publicOnly: true
    privateOnly?: false
}

interface PrivateOnlyProps extends CommonProps {
    privateOnly: true
    publicOnly?: false
}

type RouteProps = PublicOnlyProps|PrivateOnlyProps

  export const Route: React.FC<RouteProps> = ({ path, match, children }) => {
    const useRouteMatch = useRoute(path)
    const [matches, params] = match || useRouteMatch;
    if (!matches||!isValidElement(children)) return null;
    return cloneElement(children,params);
  };