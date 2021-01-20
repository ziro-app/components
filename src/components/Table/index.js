import React from 'react'
import PropTypes from 'prop-types'
import { container, titleStyle, dot, body, cellHeader, cell, cellTotal } from './styles'

const Table = ({ data, customGrid, cellStyle = cell }) =>
	<>
		{data.map(({ title, header, rows, align, rowsClicks, totals }, index) =>
			<div style={container} key={index}>
				<label style={titleStyle}>{title}
					<label style={dot}>&nbsp;.</label>
				</label>
				<div style={body(header.length, customGrid)}>
					{header.map((column, indexHeader) =>
						<label style={align ? {...cellHeader, textAlign: align[indexHeader]} : cellHeader} key={`${index}H${indexHeader}`}>
							{column}
						</label>
					)}
					{rows.map((row, indexRow) =>
						row.map((column, indexColumn) =>
							<label style={align ? {...cellStyle, textAlign: align[indexColumn]} : cellStyle} key={`${index}${indexRow}${indexColumn}`} onClick={rowsClicks && rowsClicks[indexRow] ? rowsClicks[indexRow] : null}>
								{column}
							</label>
						))}
					{totals.map((column, indexTotals) =>
						<label style={align ? {...cellTotal, textAlign: align[indexTotals]} : cellTotal} key={`${index}T${indexTotals}`}>
							{column}
						</label>
					)}
				</div>
			</div>
		)}
	</>

Table.propTypes = {
	data: PropTypes.array.isRequired,
	customGrid: PropTypes.object,
	cellStyle: PropTypes.object
}

export default Table