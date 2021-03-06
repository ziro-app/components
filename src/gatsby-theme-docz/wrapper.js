import React from 'react'
import { Helmet } from 'react-helmet'

const Wrapper = ({ children }) =>
	<>
	    <Helmet>
	        <meta charSet="utf-8" />
	        <title>Docz</title>
	        <link rel="icon"
	            type="image/png"
	            href="https://res.cloudinary.com/ziro/image/upload/v1583861558/favicon.png" />
	    </Helmet>
	    {children}
	</>

export default Wrapper