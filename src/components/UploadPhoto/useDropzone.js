import React, { useCallback, useState } from 'react'
import { useMemo } from 'react'

export const useDropzone = (isDisabled, setPicture) => {

    const fileReader = useMemo(() => {
        const fr = new FileReader()
        fr.onload = ({ target: { result }}) => setPicture(result)
        return fr
    },[setPicture])

    const onDragEnter = useCallback(e => {
		e.preventDefault()
		e.stopPropagation()
    })
    
	const onDragLeave = useCallback(e => {
		e.preventDefault()
		e.stopPropagation()
    })
    
	const onDragOver = useCallback(e => {
		e.preventDefault()
		e.stopPropagation()
    })
    
	const onDrop = useCallback(({ preventDefault, stopPropagation, dataTransfer: { files: { [0]: image } } })  => {
		preventDefault()
		stopPropagation()
		if (!isDisabled && image) fileReader.readAsDataURL(e.dataTransfer.files[0])
    },[isDisabled, fileReader])
    
	const onChange = useCallback(({ target: { files: { [0]: image } } }) => {
		if (!isDisabled && image) fileReader.readAsDataURL(image)
    },[isDisabled, fileReader])
    
    return { onDragEnter, onDragLeave, onDragOver, onDrop, onChange }
}