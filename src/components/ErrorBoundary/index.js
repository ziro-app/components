import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ErrorMessage from './ErrorMessage'

export default class ErrorBoundary extends Component {
	state = { renderError: false }
	static getDerivedStateFromError = () => ({ renderError: true })
	componentDidCatch = (error, info) => console.log(error, info)
	render = () => (this.state.renderError ? <ErrorMessage /> : this.props.children)
}

ErrorBoundary.propTypes = {
	children: PropTypes.element.isRequired
}