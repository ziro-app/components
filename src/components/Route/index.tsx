import React from "react";
import { Route, Redirect } from "wouter"
import { AuthCheck, SuspenseWithPerf } from "reactfire"
import InitialLoader from '@bit/vitorbarbosa19.ziro.initial-loader';

type RouteProps = {
    path: string
    redirect: string
    auth: boolean
    fallback: React.ReactNode
}

const _Route: React.FC<RouteProps> = ({ path, auth, fallback=<InitialLoader/>, redirect = "/login", children }) => 
    <Route path={path}>
        {
            (params: any) => 
            <SuspenseWithPerf traceId={path} fallback={fallback}>
                {
                    auth ? (
                        <AuthCheck fallback={<Redirect to={redirect}/>}>
                            { React.isValidElement(children) && React.cloneElement(children, params) }
                        </AuthCheck>
                    ) : React.isValidElement(children) && React.cloneElement(children,params)
                }
            </SuspenseWithPerf>
        }
    </Route>

export default _Route