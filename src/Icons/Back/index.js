// ok

import React from "react";
import PropTypes from "prop-types";
import { Scaffold } from "../Scaffold";

export const Back = ({ style, onClick, size, color, strokeWidth }) => (
    <Scaffold
        svgPath={
            <>
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </>
        }
        style={style}
        onClick={onClick}
        size={size}
        color={color}
        strokeWidth={strokeWidth}
    />
);

Back.propTypes = {
    style: PropTypes.object,
    onClick: PropTypes.func,
    size: PropTypes.number,
    color: PropTypes.string,
    strokeWidth: PropTypes.number,
};
