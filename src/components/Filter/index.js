import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// import { motion } from 'framer-motion'
// import Button from '../Button/index'
// import Icon from '../Icon/index'
import { container, filter, title, description, filterTag, option, name, radio, apply } from './styles'
// import { animate, transition } from './animation'

const Filter = () => {
	const [tag, setTag] = useState('')
	const handleRadio = ({ target: { value } }) => setTag(value)
	return (
		<div style={container}>
			<label style={title}>Mostrar marcas</label>
			<div style={filter}>
				<label style={description}>Que vendem tendências:</label>
				<div style={filterTag}>
					<div style={option}>
						<label style={name} htmlFor='animal print'>Animal Print</label>
						<input style={radio} onChange={handleRadio} checked={tag === 'animal print'} type='radio' name='trend' value='animal print' id='animal print' />
					</div>
					<div style={option}>
						<label style={name} htmlFor='tweed'>Tweed</label>
						<input style={radio} onChange={handleRadio} checked={tag === 'tweed'} type='radio' name='trend' value='tweed' id='tweed' />
					</div>
					<div style={option}>
						<label style={name} htmlFor='retilinea'>Retilínea</label>
						<input style={radio} onChange={handleRadio} checked={tag === 'retilinea'} type='radio' name='trend' value='retilinea' id='retilinea' />
					</div>
				</div>
			</div>
			<div style={apply}>Mostrar</div>
		</div>
	)
}

Filter.propTypes = {
}

export default Filter