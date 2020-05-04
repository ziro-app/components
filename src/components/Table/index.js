import React from 'react'
import PropTypes from 'prop-types'
import { container, infoBlock, titleStyle, dot, bodyStyle, info, cell } from './styles'

const Table = ({ data }) =>
	<div style={container}>
		{data.map(({ title, header, rows, totals }, index) =>
			<div style={infoBlock} key={index}>
				<label style={titleStyle}>{title}
					<label style={dot}>&nbsp;.</label>
				</label>
				<div style={bodyStyle}>
					<div style={info}>
						{header.map((column, indexHeader) =>
							<label style={cell} key={`${index}H${indexHeader}`}>
								{column}
							</label>
						)}
						{rows.map((row, indexRow) =>
							row.map((column, indexColumn) =>
								<label style={cell} key={`${index}${indexRow}${indexColumn}`}>
									{column}
								</label>
						))}
						{totals.map((column, indexTotals) =>
							<label style={cell} key={`${index}T${indexTotals}`}>
								{column}
							</label>
						)}
					</div>
				</div>
			</div>
		)}
	</div>

Table.propTypes = {
	data: PropTypes.array.isRequired
}

export default Table