
export const

shooterBtn= (size) => ({
	border: {
		display:'flex',
		width: size,
		height: size,
		borderRadius: '50%',
		borderWidth: '5px',
		borderStyle: 'solid',
		borderColor: 'white',
		background: 'transparent',
		justifyContent: 'center',
		alignItems: 'center'
	},
	middle: {
		width: size-5,
		height: size-5,
		borderRadius: '50%',
		background: 'white'
	}
}),

toggleBtn= (size) => ({
	display: 'flex',
	width: size,
	height: size,
	borderRadius: '50%',
	borderStyle: 'none',
	background: 'rgba(0,0,0,0.5)',
	justifyContent: 'center',
	alignItems: 'center'
})