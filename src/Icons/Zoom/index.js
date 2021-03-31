// ok

import React from "react";
import PropTypes from "prop-types";
import { Scaffold } from "../Scaffold";

export const Zoom = ({ style, onClick, size, color, strokeWidth }) => (
    <Scaffold
        svgPath={
            <>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
            </>
        }
        style={style}
        onClick={onClick}
        size={size}
        color={color}
        strokeWidth={strokeWidth}
    />
);

Zoom.propTypes = {
    style: PropTypes.object,
    onClick: PropTypes.func,
    size: PropTypes.number,
    color: PropTypes.string,
    strokeWidth: PropTypes.number,
};
