// ok

import React from "react";
import PropTypes from "prop-types";
import { primaryColor } from "@ziro/theme";

export const VideoOn = ({ size = 50, color = primaryColor }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
);

VideoOn.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
};
