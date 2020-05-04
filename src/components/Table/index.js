import React from 'react'
import PropTypes from 'prop-types'
import { container, titleStyle, dot, body, cellHeader, cell, cellTotal } from './styles'

const Table = ({ data, customGrid }) =>
	<>
		{data.map(({ title, header, rows, totals }, index) =>
			<div style={container} key={index}>
				<label style={titleStyle}>{title}
					<label style={dot}>&nbsp;.</label>
				</label>
				<div style={body(header.length, customGrid)}>
					{header.map((column, indexHeader) =>
						<label style={cellHeader} key={`${index}H${indexHeader}`}>
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
						<label style={cellTotal} key={`${index}T${indexTotals}`}>
							{column}
						</label>
					)}
				</div>
			</div>
		)}
	</>

Table.propTypes = {
	data: PropTypes.array.isRequired,
	customGrid: PropTypes.object
}

export default Table