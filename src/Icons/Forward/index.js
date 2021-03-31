// ok

import React from "react";
import PropTypes from "prop-types";
import { primaryColor } from "@ziro/theme";

export const Forward = ({ size = 50, color = primaryColor, strokeWidth = 2, fill = false }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-arrow-right"
    >
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);
Forward.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    strokeWidth: PropTypes.number,
};
