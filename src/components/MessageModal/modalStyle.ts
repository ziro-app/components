//@ts-ignore
import { fontTitle, successColor, alertColor, primaryColor, otherColor } from '@ziro/theme'
import { ZiroData } from 'ziro-messages'

type MType = ZiroData<string,any>["type"]

type TitleColor = { [K in MType]: string }

const titleColor: TitleColor = {
	neutral: otherColor,
	success: successColor,
	destructive: alertColor
}

export const

container: React.CSSProperties = {
	display: 'grid',
	justifyItems: "center",
	gridRowGap: '15px',
	color: primaryColor
},

svg: React.CSSProperties = {
	justifySelf: 'center'
},

title: (type: MType) => React.CSSProperties = (type) => ({
	fontFamily: fontTitle,
	textTransform: 'uppercase',
	color: titleColor[type]||otherColor,
	textAlign: "center"
}),

modal: React.CSSProperties = {
	zIndex: 999,
	display: 'grid',
	gridTemplateColumns: '80%',
	justifyContent: 'center',
	maxWidth: '300px',
	width: '85%',
	paddingBottom: '40px',
	borderRadius: '3px',
	textAlign: 'center',
	background: 'white',
	boxShadow: `1px 0px 8px 0px rgba(34,34,34,0.15), 1px 0px 8px 0px rgba(34,34,34,0.10),
	1px 0px 8px 0px rgba(34,34,34,0.05)`
},

buttonsContainer: (second: boolean) => React.CSSProperties = (second) => ({
	display: 'grid',
	gridTemplateColumns: second ? '1fr 1fr' : '1fr',
	gridGap: '10px',
	width: "100%",
	marginTop: '5px'
})