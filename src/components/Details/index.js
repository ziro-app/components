import React from 'react'
import PropTypes from 'prop-types'
import { container, infoBlock, headerStyle, dot, bodyStyle, info, titleStyle, contentStyle, description, contentDescriptionStyle } from './styles'

const Details = ({ blocks, blockGap, centerTitle = false }) =>
	<div style={container(blockGap)}>
		{blocks.map(({ header, body }, indexHeader) =>
			<div style={infoBlock} key={indexHeader}>
				<label style={headerStyle(centerTitle)}>{header}
					<label style={dot}>&nbsp;.</label>
				</label>
				<div style={bodyStyle}>
					{body.map(({ title, content, color, isDescription = false }, indexBody) => {
						return isDescription ?
							<div style={description} key={indexBody}>
								<label style={contentDescriptionStyle(color)}>{content}</label>
							</div>
							:
							<div style={info} key={indexBody}>
								<label style={titleStyle}>{title}</label>
								<label style={contentStyle(color)}>{content}</label>
							</div>
					}
					)}
				</div>
			</div>
		)}
	</div>

Details.propTypes = {
	blocks: PropTypes.array.isRequired,
	blockGap: PropTypes.string
}

export default Details
