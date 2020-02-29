import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// import { motion } from 'framer-motion'
// import Button from '../Button/index'
// import Icon from '../Icon/index'
import { container, filter, title, description, filterTag, tag, name, radio, apply } from './styles'
// import { animate, transition } from './animation'

const Filter = () => {
	return (
		<div style={container}>
			<label style={title}>Mostrar marcas</label>
			<div style={filter}>
				<label style={description}>Que vendem tendências:</label>
				<div style={filterTag}>
					<div style={tag}>
						<label style={name}>Animal Print</label>
						<input style={radio} type='radio' />
					</div>
					<div style={tag}>
						<label style={name}>Tweed</label>
						<input style={radio} type='radio' />
					</div>
					<div style={tag}>
						<label style={name}>Retilínea</label>
						<input style={radio} type='radio' />
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