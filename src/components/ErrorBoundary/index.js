import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ErrorMessage from './ErrorMessage'

export default class ErrorBoundary extends Component {
	constructor() {
		super()
		this.state = { renderError: false }
	}
	static getDerivedStateFromError() { return ({ renderError: true }) }
	componentDidCatch(error, info) { console.log(error, info) }
	render() { return this.state.renderError ? <ErrorMessage /> : this.props.children }
}

ErrorBoundary.propTypes = {
	children: PropTypes.element.isRequired
}