import { fontTitle, fontSizeInput, primaryColor, grayColor1, grayColor2, grayColor4 } from '@ziro/theme'

export const

	wrapper = (withoutBorder) => ({
		position: 'relative',
		display: 'grid',
		borderLeft: withoutBorder ? '' : `3px ${grayColor4} solid`,
		marginLeft: withoutBorder ? '10px' : '7px',
		padding: '0 0 40px 20px',
		cursor: 'pointer',
		gridTemplate: `
		'secure _'
		'supplier value'
		'status date'
		/ 60% 40%`
	}),

	secureCss = {
		gridArea: 'secure',
		display: 'grid',
		gridTemplateColumns: 'auto 1fr',
		gridColumnGap: '2px',
		fontSize: '1.1rem',
		textTransform: 'uppercase',
		cursor: 'pointer',
		paddingBottom: '4px',
		fontWeight: 'bold',
	},

	sellerCss = {
		gridArea: 'supplier',
		marginTop: '-4px',
		fontSize: fontSizeInput,
		cursor: 'pointer',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap'
	},

	chargeCss = {
		gridArea: 'value',
		justifySelf: 'end',
		marginTop: '-4px',
		fontSize: fontSizeInput,
		cursor: 'pointer'
	},

	statusCss = (statusColor) => ({
		gridArea: 'status',
		fontFamily: fontTitle,
		fontSize: '1.2rem',
		color: statusColor ? statusColor : grayColor2,
		cursor: 'pointer'
	}),

	dateCss = {
		gridArea: 'date',
		justifySelf: 'end',
		fontSize: '1.2rem',
		color: grayColor1,
		cursor: 'pointer'
	},

	start = {
		position: 'relative',
		display: 'grid',
		marginLeft: '10px',
		padding: '0 0 0 20px'
	},

	welcome = {
		marginTop: '-4px',
		fontSize: fontSizeInput
	},

	illustration = {
		display: 'grid',
		justifyItems: 'center'
	},

	empty = {
		display: 'grid',
		textAlign: 'center'
	},

	after = `.timeline::after {
	content: ' ';
	position: absolute;
	top: 0px;
	left: -8px;
	width: 10px;
	height: 10px;
	border: 2px solid ${primaryColor};
	border-radius: 50%;
	background-color: #FFF;
	box-shadow: 0px 5px 15px -2px rgba(34,34,34,0.55);
}`,

	afterInsurance = `.timelineInsurance::after {
	content: ' ';
	position: absolute;
	top: 20px;
	left: -8px;
	width: 10px;
	height: 10px;
	border: 2px solid ${primaryColor};
	border-radius: 50%;
	background-color: #FFF;
	box-shadow: 0px 5px 15px -2px rgba(34,34,34,0.55);
}`,

	afterWelcome = `.welcome::after {
	content: ' ';
	position: absolute;
	top: 0px;
	left: -8px;
	width: 10px;
	height: 10px;
	border: 2px solid ${primaryColor};
	background-color: #FFF;
	box-shadow: 0px 5px 15px -2px rgba(34,34,34,0.55);
}`