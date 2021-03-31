// ok

import React from "react";
import PropTypes from "prop-types";
import { primaryColor } from "@ziro/theme";

export const Magnifier = ({ size = 50, color = primaryColor }) => (
    <svg width={size} height={size} viewBox="0 0 101 101" fill="none">
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M87.2894 49.921C97.3107 39.8997 97.3107 23.6519 87.2894 13.6307C77.2681 3.60936 61.0204 3.60936 50.9991 13.6307C40.9778 23.652 40.9778 39.8997 50.9991 49.921C61.0204 59.9423 77.2681 59.9423 87.2894 49.921ZM91.5321 54.1636C103.897 41.7992 103.897 21.7525 91.5321 9.38801C79.1676 -2.97642 59.1209 -2.97642 46.7565 9.38801C34.8747 21.2698 34.4109 40.2458 45.365 52.6815L30.5282 67.5183L28.0406 65.0306L0.46344 92.6078L8.24161 100.386L35.8188 72.8088L33.3567 70.3467L48.1907 55.5127C60.6254 66.5104 79.635 66.0607 91.5321 54.1636Z"
            fill={color}
        />
    </svg>
);

Magnifier.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
};
