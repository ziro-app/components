import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// import { motion } from 'framer-motion'
import Button from '../Button/index'
// import Icon from '../Icon/index'
import { container, filter, description, filterTag, option, name, nameSelected, radio, radioSelected, apply } from './styles'
// import { animate, transition } from './animation'

const Filter = () => {
	const trends = ['animal print', 'tweed', 'retilinea']
	const [tag, setTag] = useState('')
	const handleRadio = ({ target: { value } }) => setTag(value)
	return (
		<div style={container}>
			<div style={filter}>
				<label style={description}>Que vendem as tendências:</label>
				<div style={filterTag}>
					{trends.map(trend => {
						return (
							<div style={option}>
								<label style={tag === trend ? nameSelected : name} htmlFor={trend}>{trend}</label>
								<input style={{ display: 'none' }} onChange={handleRadio} checked={tag === trend} type='radio' name='trend' value={trend} id={trend} />
								<svg height='18' width='18' viewBox='0 0 18 18'>
									<circle cx='9' cy='9' r='7' fill='none' stroke='black' strokeWidth={tag === trend ? '3' : '1'} />
									{tag === trend ? <circle cx='9' cy='9' r='3' fill='black' /> : null}
								</svg>
							</div>
						)
					})}
				</div>
			</div>
			<div style={apply}>
				<Button type='button' cta='Limpar' template='light' />
				<Button type='button' cta='Mostrar' template='regular' />
			</div>
		</div>
	)
}

Filter.propTypes = {
}

export default Filter