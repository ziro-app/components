import React from "react";
import PropTypes from "prop-types";
import { primaryColor } from "@ziro/theme";

export const Magnifier = ({ size = 50, color = primaryColor }) => (
    <svg width={size} height={size} viewBox="0 0 152 160" fill="none">
        <circle cx="90.7552" cy="60.9833" r="28.6611" transform="rotate(69 90.7552 60.9833)" stroke={color} stroke-width="6" />
        <rect x="70.9588" y="83.0219" width="4" height="29" transform="rotate(38 70.9588 83.0219)" fill={color} />
        <rect x="54.0108" y="99" width="11" height="39" transform="rotate(38 54.0108 99)" fill={color} />
    </svg>
);

Magnifier.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
};
