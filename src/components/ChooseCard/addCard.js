import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import { motion } from 'framer-motion'
import { cardContainer, cardNumber, brandContainer } from './styles'
import { primaryColor, grayColor4 } from '@ziro/theme'

const _AddCard = ({ onClick, color = primaryColor }) => 
    <motion.div
        onClick={onClick}
        style={cardContainer(false)}
        whileTap={{ scale: 0.95 }}
    >
        <div style={{ ...brandContainer, background: grayColor4 }}>
            <Icon type='add' size={35} color={color}/>
        </div>
        <h2 style={{ ...cardNumber, color }}>Adicionar novo cartão</h2>
    </motion.div>

_AddCard.propTypes = {
    onClick: PropTypes.func,
    color: PropTypes.string
}

export const AddCard = React.memo(_AddCard)