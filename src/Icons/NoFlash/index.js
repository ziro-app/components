import React from "react";
import PropTypes from "prop-types";
import { primaryColor } from "@ziro/theme";

export const NoFlash = ({ size = 50, color = primaryColor }) => (
    <svg width={size} height={size} viewBox="0 0 105 113" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M53.1702 73.8142C50.5862 73.3586 15.7583 55.1749 15.3578 52.4099C14.9572 49.6449 54.117 8.04154 56.3004 5.73212C58.4839 3.42271 47.6096 38.8378 50.04 40.1644C52.4704 41.4911 83.1559 60.772 86.294 63.1216C89.4322 65.4712 47.6398 111.092 46.6851 106.433C45.7304 101.774 55.7542 74.2698 53.1702 73.8142Z"
            stroke={color}
            stroke-width="6"
        />
        <g filter="url(#filter0_d)">
            <line x1="5.76777" y1="7.23223" x2="98.7678" y2="100.232" stroke={color} stroke-width="5" stroke-linejoin="round" />
        </g>
        <defs>
            <filter id="filter0_d" x="0" y="5.46446" width="104.536" height="104.536" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
        </defs>
    </svg>
);

NoFlash.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
};
