import React, { useState } from 'react'
import ToggleButton from '../../../components/ToggleButton/index';
import { containerWithPadding } from '@ziro/theme'

export const DisplayToggleButton = () => {
    const [value, setValue] = useState(false);

    const asyncClick = async () => {
        try {
            const promise = new Promise((resolve) => {
                setTimeout(() => resolve(Math.random() > 0.5), 2000);
            });
            promise.then(res => {
                console.log('Deu bom ', res);
                setValue(!value);
            }).catch(err => console.log('Deu ruim ', err));
        } catch (error) { }
    };

    return (
        <div style={{ ...containerWithPadding, display: 'grid', gridRowGap: '30px', alignContent: 'start', top: '50%' }}>
            <ToggleButton active={value} onClick={asyncClick} />
            <ToggleButton active={value} onClick={asyncClick} template="primary" />
            <ToggleButton active={value} onClick={asyncClick} template="gray" />
            <ToggleButton active={value} onClick={asyncClick} template="warning" />
            <ToggleButton active={value} onClick={asyncClick} template="alert" />
            <ToggleButton active={value} onClick={asyncClick} template="secundary" />
            <ToggleButton active={value} onClick={asyncClick} template="success" />
        </div>
    );
};