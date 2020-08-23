import React from 'react'
import Header from '../../../components/Header'
import {
    useHeader,
    useFooter,
    useCache,
    useGlobalCache,
    useHistory
} from '../../../components/FlowManager'
import {
    BottomTabBar
} from './bottomBar'
import {
    BRANDS
} from './cacheKeys'
import {
    useEffect
} from 'react'
import Fallback from "../../../components/ComponentSuspenseFallback"

export default () => {
    const history = useHistory()

    console.log({
        history
    })

    useHeader( < Header type = 'title-only'
        title = 'tab2' / > , [])

    const [counter, setCounter] = useCache(0)
    const [counter2, setCounter2] = useCache(0)

    const [brands, setBrands] = useGlobalCache(undefined, BRANDS)

    console.log({
        brands
    })

    useEffect(() => {
        setBrands('seila')
    }, [])

    return <Fallback / >
}