import React from 'react'
import PropTypes from 'prop-types'
import { container, infoBlock, headerStyle, dot, bodyStyle, info, titleStyle, contentStyle } from './styles'

const Details = ({ blocks }) =>
	<div style={container}>
		{blocks.map(({ header, body }, indexHeader) =>
			<div style={infoBlock} key={indexHeader}>
				<label style={headerStyle}>{header}
					<label style={dot}>&nbsp;.</label>
				</label>
				<div style={bodyStyle}>
					{body.map(({ title, content, color }, indexBody) =>
						<div style={info} key={indexBody}>
							<label style={titleStyle}>{title}</label>
							<label style={contentStyle(color)}>{content}</label>
						</div>
					)}
				</div>
			</div>
		)}
	</div>

Details.propTypes = {
	blocks: PropTypes.array.isRequired
}

export default Details