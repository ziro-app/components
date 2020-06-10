import React, { memo, useState, useMemo } from 'react'
import { shape, string, func, bool } from 'prop-types'
import { motion } from 'framer-motion'
import { matchCreditCardBrand } from '../Checkout/utils/matchCreditCardBrand'
import { BrandIcon } from './brandIcon'
import { cardContainer, cardNumber, cardDelete, cardStatus } from './styles'
import Icon from '../Icon'
import Spinner from '../Spinner'
import { alertColor } from '@ziro/theme'
import { useCallback } from 'react'

const visible = { scaleY: 1, height: 70, opacity: 1 }
const invisible = { scaleY: 0, height: 0, opacity: 0 }

export const CardRow = ({ card: { number, status }, isSelected, onClick, onDelete }) => {

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

    const [isDeleting, setDeleting] = useState(false)

    const whileTap = useMemo(() => ({ scale: isDeleting || !onClick ? 1 : 0.95 }),[isDeleting,onClick])
    const _onClick = useCallback(() => !isDeleting && onClick && onClick(),[isDeleting,onClick])
    const _onDelete = useCallback((e) => {
        e.stopPropagation()
        if(isDeleting) return
        setDeleting(true)
        onDelete().finally(() => setDeleting(false))
    },[isDeleting,setDeleting,onDelete])

    return (
        <motion.div initial={visible} animate={animate} onClick={_onClick} whileTap={whileTap}>
            <div style={cardContainer(onDelete)}>
                <BrandIcon brand={brand}/>
                <div style={{ display: 'grid', alignItems: 'center' }}>
                    <label style={cardNumber}>{number}</label>
                    {status!=='approved' && <label style={cardStatus}>{statusMessage}</label>}
                </div>
                { onDelete &&
                    <div style={cardDelete} onClick={_onDelete}>
                    { isDeleting ? <Spinner size='20px'/> : <Icon type='trash' size={20} color={alertColor} /> }
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
    onDelete: func
}