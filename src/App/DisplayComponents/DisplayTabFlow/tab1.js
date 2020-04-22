import React from 'react'
import Header from '../../../components/Header'
import { useHeader, useFooter, useCache, useAnimatedLocation, useGlobalCache, useMessageModal, useHistory } from '../../../components/FlowManager'
import { BottomTabBar } from './bottomBar'
import { BRANDS } from './cacheKeys'

const messageModalObject = (action) => ({
    firstError: {
        title: 'Erro 1',
        message: 'Ocorreu o primeiro erro',
        firstButtonTitle: 'Sair',
        secondButtonTitle: 'Pagina 2',
        secondButtonAction: action,
    },
    success: {
        title: 'Sucesso',
        message: 'Tudo deu bom',
        firstButtonTitle: 'ISSO AI',
        illustration: 'buy'
    }
})

export default () => {
    const history = useHistory()

    console.log({ history })

    useHeader(null,[])

    const [location, setLocation] = useAnimatedLocation()
    const [counter2, setCounter2] = useCache(0)

    const [brands, setBrands] = useGlobalCache(undefined, BRANDS)

    const setMessageModal = useMessageModal(messageModalObject(() => setLocation('goLeft', '/tab-flow/2')))

    return (
        <div style={{ display: 'grid', background: 'blue', height: '100%', width: '100%' }}>
            {Array.from(new Array(10)).map((_,index) => {
                return <label>{index}</label>
            })}
            <div style={{ background: 'yellow', height: 50, margin: '10px' }}
                onClick={() => setMessageModal('firstError')}
            >
                <label>{`click to test cache`}</label>
            </div>
            <div style={{ background: 'yellow', height: 50, margin: '10px' }}
                onClick={() => setMessageModal('success')}
            >
                <label>{`click to test cache: ${counter2}`}</label>
            </div>
        </div>
    )
}