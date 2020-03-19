import React from 'react'
import FlowManager from '../../../components/FlowManager'
import Summary from '../../../components/FlowSummary'
import ChooseCard from '../../../components/FlowChooseCard'
import ChooseInstallments from '../../../components/FlowChooseInstallments'
import RegisterCard from '../../../components/FlowRegisterCard'
import { Route, Switch, useLocation } from 'wouter'
import { useEffect } from 'react'
import { useState } from 'react'

export const DisplayFlowAntiFraude = () => {

    const [_, setLocation] = useLocation()

    const [cardNumber, setCardNumber] = useState()

    return (
        <FlowManager>
            <div style={{ padding: '20px' }}>
                <Switch>
                    <Route path='/anti-fraude/summary'>
                        <Summary
                            seller='Crisfael'
                            charge='60072'
                            maxInstallments='6'
                            nextLocation='/anti-fraude/choose-card'
                            misc={{
                                title: 'Sobre a loja',
                                text: 'A Crisfael é uma loja parceira da Ziro.'
                            }}
                        />
                    </Route>
                    <Route path='/anti-fraude/choose-card'>
                        <ChooseCard
                            numbers={[
                                '4839 **** **** **** 4382',
                                '5049 **** **** **** 3928',
                                '9382 **** **** **** 4930',
                                '9403 **** **** **** 3928'
                            ]}
                            next={{
                                onClick: ({ number }) => {
                                    return new Promise((res,rej) => {
                                        if(number) {
                                            setCardNumber(number)
                                            res()
                                        }
                                        else rej('NO_CARD')
                                    })
                                },
                                location: '/anti-fraude/choose-installments'
                            }}
                            previous={{ location: '/anti-fraude/summary' }}
                            newCard={{ location: '/anti-fraude/register-card'}}
                        />
                    </Route>
                    <Route path='/anti-fraude/choose-installments'>
                        <ChooseInstallments
                            seller='Crisfael'
                            charge='60072'
                            maxInstallments='6'
                            cardNumber={cardNumber}
                            previous={{ location: 'anti-fraude/choose-card' }}
                            next={{
                                onClick: ({ installments }) => {
                                    return new Promise((res, rej) => {
                                        if(installments) {
                                            console.log('sending to backend')
                                        }
                                        else rej('NO_INSTALLMENTS')
                                    })
                                }
                            }}
                        />
                    </Route>
                    <Route path='/anti-fraude/register-card' >
                        <RegisterCard
                            next={{
                                onClick: (state) => {
                                    console.log({ state })
                                    return new Promise((res, rej) => {
                                        setTimeout(res,1000)
                                    })
                                },
                                location: 'anti-fraude/document-photo'
                            }}
                            previous={{
                                location: 'anti-fraude/choose-card'
                            }}
                        />
                    </Route>
                </Switch>
            </div>
        </FlowManager>
    )
}