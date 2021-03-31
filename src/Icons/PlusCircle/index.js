// ok

import React from "react";
import PropTypes from "prop-types";
import { Scaffold } from "../Scaffold";

export const PlusCircle = ({ style, onClick, size, color, strokeWidth }) => (
    <Scaffold
        svgPath={
            <>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
            </>
        }
        style={style}
        onClick={onClick}
        size={size}
        color={color}
        strokeWidth={strokeWidth}
    />
);

PlusCircle.propTypes = {
    style: PropTypes.object,
    onClick: PropTypes.func,
    size: PropTypes.number,
    color: PropTypes.string,
    strokeWidth: PropTypes.number,
};
