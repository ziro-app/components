import React, { useState } from 'react'
import ToggleButton from '../../../components/ToggleButton/index';
import { containerWithPadding } from '@ziro/theme'

export const DisplayToggleButton = () => {
    const [value, setValue] = useState(false);

    return (
        <div style={{ ...containerWithPadding, display: 'grid', gridRowGap: '30px', alignContent: 'start', top: '50%' }}>
            <ToggleButton active={value} setActive={setValue} />
            <ToggleButton active={value} setActive={setValue} template="primary" />
            <ToggleButton active={value} setActive={setValue} template="gray" />
            <ToggleButton active={value} setActive={setValue} template="warning" />
            <ToggleButton active={value} setActive={setValue} template="alert" />
            <ToggleButton active={value} setActive={setValue} template="secundary" />
            <ToggleButton active={value} setActive={setValue} template="success" />
        </div>
    );
};