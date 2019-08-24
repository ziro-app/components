import React from 'react'
import { render } from 'react-dom'
import './index.css'
import { InputTextType1 } from './InputTextType1/index'

const App = () => 
	<div>
		<InputTextType1 />
	</div>

render(<App />, document.getElementById('app'))