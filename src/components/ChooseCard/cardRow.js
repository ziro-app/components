import React, { memo, useState, useMemo } from 'react'
import { shape, string, func, bool, exact } from 'prop-types'
import { motion } from 'framer-motion'
import { matchCreditCardBrand } from '../Checkout/utils/matchCreditCardBrand'
import { BrandIcon } from './brandIcon'
import { cardContainer, cardNumber, cardDelete, cardStatus } from './styles'
import Icon from '../Icon'
import Spinner from '../Spinner'
import { alertColor } from '@ziro/theme'
import { useCallback } from 'react'
import { load } from 'webfontloader'

const visible = { scaleY: 1, height: 70, opacity: 1 }
const invisible = { scaleY: 0, height: 0, opacity: 0 }

export const CardRow = ({ card: { number, status }, isSelected, onClick, rightButton }) => {

    const brand = matchCreditCardBrand(number)
    const animate = useMemo(() => isSelected ? invisible : visible, [isSelected])
    const statusMessage = useMemo(() => {
        switch(status) {
            case 'pendingDocument': return 'Aguardando documento'
            case 'pendingSelfie': return 'Aguardando selfie'
            case 'pendingManualApproval': return 'Aguardando revisão'
            default: return ''
        }
    },[status])

    const [loading, setLoading] = useState(false)

    const whileTap = useMemo(() => ({ scale: loading || !onClick ? 1 : 0.95 }),[loading,onClick])
    const _onClick = useCallback(() => !loading && onClick && onClick(),[loading,onClick])
    const _onRightButtonClick = useCallback((e) => {
        e.stopPropagation()
        if(loading||!rightButton.onClick) return
        const maybePromise = rightButton.onClick()
        if(maybePromise instanceof Promise) {
            setLoading(true)
            maybePromise.finally(() => setLoading(false))
        }
    },[loading,setLoading,rightButton])

    return (
        <motion.div initial={visible} animate={animate} onClick={_onClick} whileTap={whileTap}>
            <div style={cardContainer(!!rightButton)}>
                <BrandIcon brand={brand}/>
                <div style={{ display: 'grid', alignItems: 'center' }}>
                    <label style={cardNumber}>{number}</label>
                    {status!=='approved' && <label style={cardStatus}>{statusMessage}</label>}
                </div>
                { rightButton &&
                    <div style={cardDelete} onClick={_onRightButtonClick}>
                    { loading ? <Spinner size='20px'/> : <Icon type={rightButton.icon} size={20} color={rightButton.color} /> }
                    </div>
                }
            </div>
        </motion.div>
    )
}

CardRow.propTypes = {
    card: shape({ number: string.isRequired, status: string.isRequired }).isRequired,
    onClick: func,
    isSelected: bool,
    rightButton: exact({
        icon: string.isRequired,
        color: string.isRequired,
        onClick: func.isRequired
    })
}