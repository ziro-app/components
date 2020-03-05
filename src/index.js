import React from 'react'
import { render } from 'react-dom'
import { load as FontLoader } from 'webfontloader'
import { App } from './App/index'
import './index.css'

FontLoader({
	google: { families: ['Rubik:500,600', 'Work Sans:300,400,500'] }
})

render(<App />, document.getElementById('app'))