// ok

import React from "react";
import PropTypes from "prop-types";
import { Scaffold } from "../Scaffold";

export const Send = ({ style, onClick, size, color, strokeWidth }) => (
    <Scaffold
        svgPath={
            <>
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </>
        }
        style={style}
        onClick={onClick}
        size={size}
        color={color}
        strokeWidth={strokeWidth}
    />
);

Send.propTypes = {
    style: PropTypes.object,
    onClick: PropTypes.func,
    size: PropTypes.number,
    color: PropTypes.string,
    strokeWidth: PropTypes.number,
};
