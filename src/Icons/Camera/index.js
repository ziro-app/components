// ok

import React from "react";
import PropTypes from "prop-types";
import { primaryColor } from "@ziro/theme";

export const Camera = ({ size = 50, color = primaryColor }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
    </svg>
);

Camera.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
};
