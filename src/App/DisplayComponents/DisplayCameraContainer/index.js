import React, { useState } from 'react'
import CameraContainer from '../../../components/CameraContainer'

export const DisplayCameraContainer = () => {
	return (
		<CameraContainer
			startOnMount={true}
			onTakePicture={(picture) => console.log({ picture })}
			allowSwap={true}
		/>
	)
}