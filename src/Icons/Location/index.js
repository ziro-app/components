// ok

import React from "react";
import PropTypes from "prop-types";
import { Scaffold } from "../Scaffold";

export const Location = ({ style, onClick, size, color, strokeWidth }) => (
    <Scaffold
        svgPath={
            <>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </>
        }
        style={style}
        onClick={onClick}
        size={size}
        color={color}
        strokeWidth={strokeWidth}
    />
);

Location.propTypes = {
    style: PropTypes.object,
    onClick: PropTypes.func,
    size: PropTypes.number,
    color: PropTypes.string,
    strokeWidth: PropTypes.number,
};
