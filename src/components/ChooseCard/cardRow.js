import React, { memo, useState, useMemo } from 'react'
import { shape, string, func, bool } from 'prop-types'
import { motion } from 'framer-motion'
import { matchCreditCardBrand } from '../Checkout/utils/matchCreditCardBrand'
import { BrandIcon } from './brandIcon'
import { cardContainer, cardNumber } from './styles'
import Icon from '../Icon'
import Spinner from '../Spinner'

const visible = { scaleY: 1, height: 70, opacity: 1 }
const invisible = { scaleY: 0, height: 0, opacity: 0 }

const _CardRow = ({ card: { number, status }, isSelected, onClick, onDelete }) => {

    const brand = matchCreditCardBrand(number)
    const animate = useMemo(() => isSelected ? invisible : visible, [isSelected])
    const statusMessage = useMemo(() => {
        switch(status) {
            case 'pendingDocument': return 'Aguardando envio do documento'
            case 'pendingSelfie': return 'Aguardando envio da selfie'
            case 'pendingManualApproval': return 'Aguardando revisão'
            default: return ''
        }
    },[status])

    const [isDeleting, setDeleting] = useState(false)

    return (
        <motion.div initial={visible} animate={animate} onClick={onClick} whileTap={{ scale: 0.95 }}>
            <div style={cardContainer}>
                <BrandIcon brand={brand}/>
                <div style={{ display: 'grid', alignItems: 'center' }}>
                    <label style={cardNumber}>{number}</label>
                    {status!=='approved' &&
                        <label style={{ fontSize: 10, textAlign: 'center' }}>{statusMessage}</label>}
                </div>
                { onDelete &&
                    <div style={{ height: '60px', width: '60px', display: 'grid', alignItems: 'center', justifyItems: 'center', background: '#FF7777' }} onClick={e => {
                        e.stopPropagation()
                        if(isDeleting) return
                        setDeleting(true)
                        onDelete().finally(() => setDeleting(false))
                    }}>
                    { isDeleting ? <Spinner size='20px'/> : <Icon type='trash' size={20} color='white' /> }
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