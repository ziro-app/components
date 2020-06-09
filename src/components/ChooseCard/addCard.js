import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import { motion } from 'framer-motion'
import { cardContainer, cardNumber, brandContainer } from './styles'

const _AddCard = ({ onClick, color = 'grey' }) => 
    <motion.div
        onClick={onClick}
        style={{ ...cardContainer, gridTemplateColumns: '60px 1fr' }}
        whileTap={{ scale: 0.95 }}
    >
        <div style={{ ...brandContainer, background: '#F0F0F0' }}>
            <Icon type='add' size={35} color={color}/>
        </div>
        <h2 style={{ ...cardNumber, color }}>Adcionar novo cartão</h2>
    </motion.div>

_AddCard.propTypes = {
    onClick: PropTypes.func,
    color: PropTypes.string
}

export const AddCard = React.memo(_AddCard)