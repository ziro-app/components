import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/index'
import Button from '../Button/index'
import RadioSvg from '../RadioSvg/index'
import { container, body, filter, description, filterTag, option, name, nameSelected, apply } from './styles'

const Filter = ({ trends }) => {
	const [tag, setTag] = useState('')
	const handleRadioInput = ({ target: { value } }) => setTag(value)
	const handleRadioSvg = value => setTag(value)
	const reset = () => setTag('')
	return (
		<div style={container}>
			<Header type='icon-link' title='Mostrar marcas' icon='close' navigateTo='/galeria' />
			<div style={body}>
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
		</div>
	)
}

Filter.propTypes = {
	trends: PropTypes.array.isRequired
}

export default Filter