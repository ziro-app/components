import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/index'
import RadioSvg from '../RadioSvg/index'
import { container, filter, description, filterTag, option, name, nameSelected, apply } from './styles'

const Filter = () => {
	const trends = ['animal print', 'tweed', 'retilinea']
	const [tag, setTag] = useState('')
	const handleRadioInput = ({ target: { value } }) => setTag(value)
	const handleRadioSvg = value => setTag(value)
	const reset = () => setTag('')
	return (
		<div style={container}>
			<div style={filter}>
				<label style={description}>Que vendem as tendências:</label>
				<div style={filterTag}>
					{trends.map(trend => {
						const isActive = tag === trend
						return (
							<div style={option} key={trend}>
								<label style={isActive ? nameSelected : name} htmlFor={trend}>
									{trend}
								</label>
								<input
									style={{ display: 'none' }}
									onChange={handleRadioInput}
									checked={isActive}
									type='radio'
									name='trend'
									value={trend}
									id={trend}
								/>
								<RadioSvg isActive={isActive} onClick={handleRadioSvg.bind(null, trend)} />
							</div>
						)
					})}
				</div>
			</div>
			<div style={apply}>
				<Button type='button' cta='Limpar' template='light' click={reset} />
				<Button type='button' cta='Mostrar' template='regular' />
			</div>
		</div>
	)
}

Filter.propTypes = {
}

export default Filter