import React,{
    useMemo,
    cloneElement,
    ReactElement,
    isValidElement
} from "react";
import { useRouter, useLocation, useRoute } from "wouter"
import { useUser, SuspenseWithPerf } from "reactfire"
import InitialLoader from '@bit/vitorbarbosa19.ziro.initial-loader';

interface SwitchProps {
    defaultPrivateFallback: React.ReactNode
    defaultPublicFallback: React.ReactNode
    defaultSuspenseFallback ?: React.ReactNode
}

export const Switch: React.FC<SwitchProps> = ({
    children,
    defaultPrivateFallback,
    defaultPublicFallback,
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

    //if user is logged and this route is public only
    if(user&&element.props.publicOnly) return <>{element.props.privateFallback||defaultPrivateFallback}</>
    //if user is not logged and this route is private only
    if(!user&&element.props.privateOnly) return <>{element.props.publicFallback||defaultPublicFallback}</>
    //else render element
    return (
        <SuspenseWithPerf traceId={element.props.path} fallback={element.props.suspenseFallback||defaultSuspenseFallback} >
            { React.cloneElement(element, { match }) }
        </SuspenseWithPerf>   
    )
  };

  interface RouteProps {
    path: string
    match ?: ReturnType<ReturnType<typeof useRouter>["matcher"]>
    publicOnly ?: boolean
    privateOnly ?: boolean
    privateFallback ?: React.ReactNode
    publicFallback ?: React.ReactNode
    suspenseFallback ?: React.ReactNode
  }

  export const Route: React.FC<RouteProps> = ({ path, match, children }) => {
    const useRouteMatch = useRoute(path);

    const [matches, params] = match || useRouteMatch;
  
    if (!matches||!isValidElement(children)) return null;
  
    return cloneElement(children,params);
  };