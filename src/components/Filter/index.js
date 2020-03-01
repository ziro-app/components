import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// import { motion } from 'framer-motion'
import Button from '../Button/index'
// import Icon from '../Icon/index'
import { container, filter, description, filterTag, option, name, nameSelected, radio, radioSelected, apply } from './styles'
// import { animate, transition } from './animation'

const Filter = () => {
	const [tag, setTag] = useState('')
	const handleRadio = ({ target: { value } }) => setTag(value)
	return (
		<div style={container}>
			<div style={filter}>
				<label style={description}>Que vendem tendências:</label>
				<div style={filterTag}>
					<div style={option}>
						<label style={tag === 'animal print' ? nameSelected : name} htmlFor='animal print'>Animal Print</label>
						<input style={{ display: 'none' }} onChange={handleRadio} checked={tag === 'animal print'} type='radio' name='trend' value='animal print' id='animal print' />
						<svg height='18' width='18' viewBox='0 0 18 18'>
							<circle cx='9' cy='9' r='7' fill='none' stroke='black' strokeWidth={tag === 'animal print' ? '3' : '1'} />
							{tag === 'animal print' ? <circle cx='9' cy='9' r='3' fill='black' /> : null}
						</svg>
					</div>
					<div style={option}>
						<label style={tag === 'tweed' ? nameSelected : name} htmlFor='tweed'>Tweed</label>
						<input style={{ display: 'none' }} onChange={handleRadio} checked={tag === 'tweed'} type='radio' name='trend' value='tweed' id='tweed' />
						<svg height='18' width='18' viewBox='0 0 18 18'>
							<circle cx='9' cy='9' r='7' fill='none' stroke='black' strokeWidth={tag === 'tweed' ? '3' : '1'} />
							{tag === 'tweed' ? <circle cx='9' cy='9' r='3' fill='black' /> : null}
						</svg>
					</div>
					<div style={option}>
						<label style={tag === 'retilinea' ? nameSelected : name} htmlFor='retilinea'>Retilínea</label>
						<input style={{ display: 'none' }} onChange={handleRadio} checked={tag === 'retilinea'} type='radio' name='trend' value='retilinea' id='retilinea' />
						<svg height='18' width='18' viewBox='0 0 18 18'>
							<circle cx='9' cy='9' r='7' fill='none' stroke='black' strokeWidth={tag === 'retilinea' ? '3' : '1'} />
							{tag === 'retilinea' ? <circle cx='9' cy='9' r='3' fill='black' /> : null}
						</svg>
					</div>
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