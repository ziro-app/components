import React from 'react'
import PropTypes from 'prop-types'
import { primaryColor, grayColor2, warningColor, alertColor, secondaryColor, successColor } from '@ziro/theme'
import { innerCircle, toggleButton } from './styles'

const matchColor = {
    default: '#00acee',
    primary: primaryColor,
    gray: grayColor2,
    warning: warningColor,
    alert: alertColor,
    secundary: secondaryColor,
    success: successColor
};

const ToggleButton = ({ active, onClick, size = 80, template = 'default', styleContainer }) =>
    <>
        <div style={styleContainer ? styleContainer : {}} >
            <div style={toggleButton(size, active, matchColor[template])} onClick={onClick}>
                <div style={innerCircle(size, active)}></div>
            </div>
        </div>
    </>

ToggleButton.propTypes = {
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    size: PropTypes.number,
    template: PropTypes.string,
    styleContainer: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};

export default ToggleButton;