import React, { memo, useState, useMemo } from 'react'
import { shape, string, func, bool } from 'prop-types'
import { motion } from 'framer-motion'
import { matchCreditCardBrand } from '../Checkout/utils/matchCreditCardBrand'
import { BrandIcon } from './brandIcon'
import { cardContainer, cardNumber, cardDelete } from './styles'
import Icon from '../Icon'
import Spinner from '../Spinner'
import { grayColor1, alertColor } from '@ziro/theme'

const visible = { scaleY: 1, height: 70, opacity: 1 }
const invisible = { scaleY: 0, height: 0, opacity: 0 }

const _CardRow = ({ card: { number, status }, isSelected, onClick, onDelete }) => {

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

    return (
        <motion.div initial={visible} animate={animate} onClick={isDeleting ? () => null : onClick } whileTap={isDeleting ? { scale: 1 } : { scale: 0.95 }}>
            <div style={cardContainer(onDelete)}>
                <BrandIcon brand={brand}/>
                <div style={{ display: 'grid', alignItems: 'center' }}>
                    <label style={cardNumber}>{number}</label>
                    {status!=='approved' &&
                        <label style={{ fontSize: 12, textAlign: 'center', fontWeight: '300', color: grayColor1 }}>{statusMessage}</label>}
                </div>
                { onDelete &&
                    <div style={cardDelete} onClick={e => {
                        e.stopPropagation()
                        if(isDeleting) return
                        setDeleting(true)
                        onDelete().finally(() => setDeleting(false))
                    }}>
                    { isDeleting ? <Spinner size='20px'/> : <Icon type='trash' size={20} color={alertColor} /> }
                    </div>
                }
            </div>
        </motion.div>
    )
}

_CardRow.propTypes = {
    card: shape({ number: string.isRequired, status: string.isRequired }).isRequired,
    onClick: func,
    isSelected: bool,
    onDelete: func
}

export const CardRow = memo(_CardRow)