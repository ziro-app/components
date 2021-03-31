// ok

import React from "react";
import PropTypes from "prop-types";
import { primaryColor } from "@ziro/theme";

export const ChevronUp = ({ size = 50, color = primaryColor }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
    </svg>
);

ChevronUp.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
};
