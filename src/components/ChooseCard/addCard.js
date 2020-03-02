import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import { motion } from 'framer-motion'
import { cardContainer } from './styles'

const _AddCard = ({ onClick, color = 'grey' }) => 
    <motion.div
        onClick={onClick}
        style={cardContainer(false)}
        whileTap={{ scale: 0.95 }}
    >
        <Icon type='add' size={30} color={color}/>
        <h2 style={{ color }}>Adcionar novo cartão</h2>
    </motion.div>

_AddCard.propTypes = {
    onClick: PropTypes.func,
    color: PropTypes.string
}

export const AddCard = React.memo(_AddCard)