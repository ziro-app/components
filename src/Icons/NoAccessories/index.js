// ok

import React from "react";
import PropTypes from "prop-types";
import { primaryColor } from "@ziro/theme";

export const NoAccessories = ({ size = 50, color = primaryColor }) => (
    <svg width={size} height={size} viewBox="0 0 104 104" fill="none">
        <path
            d="M92.9672 41.1248L68.6914 19.9389C68.6801 19.9289 68.6678 19.9209 68.6562 19.9111C67.0603 18.5295 65.0459 17.7734 62.9141 17.7734C58.0678 17.7734 54.125 21.7162 54.125 26.5625C54.125 28.1805 55.4367 29.4922 57.0547 29.4922C58.6727 29.4922 59.9844 28.1805 59.9844 26.5625C59.9844 24.9471 61.2986 23.6328 62.9141 23.6328C63.6967 23.6328 64.4322 23.9375 64.9857 24.491C65.167 24.6723 77.4119 35.3266 77.4424 35.3531C68.1285 35.4002 60.0834 40.9074 56.3488 48.8313C54.7971 47.6898 52.9369 47.0703 51 47.0703C49.0631 47.0703 47.2029 47.6898 45.6512 48.8313C41.9166 40.9074 33.8715 35.4002 24.5576 35.3531L37.1615 24.3535C37.6939 23.8887 38.3775 23.6328 39.0861 23.6328C40.7016 23.6328 42.0158 24.9471 42.0158 26.5625C42.0158 28.1805 43.3275 29.4922 44.9455 29.4922C46.5635 29.4922 47.8752 28.1805 47.8752 26.5625C47.8752 21.7162 43.9324 17.7734 39.0861 17.7734C36.9607 17.7734 34.9088 18.5426 33.3088 19.9389L9.03281 41.1248C4.07148 45.4541 1 51.8398 1 58.7891C1 71.7125 11.5141 82.2266 24.4375 82.2266C37.3609 82.2266 47.875 71.7125 47.875 58.7891H54.125C54.125 71.7125 64.6391 82.2266 77.5625 82.2266C90.4859 82.2266 101 71.7125 101 58.7891C101 51.8244 97.9166 45.4438 92.9672 41.1248ZM24.4375 76.3672C14.7449 76.3672 6.85938 68.4816 6.85938 58.7891C6.85938 49.0965 14.7449 41.2109 24.4375 41.2109C34.1301 41.2109 42.0156 49.0965 42.0156 58.7891C42.0156 68.4816 34.1301 76.3672 24.4375 76.3672ZM47.875 55.8594C47.875 54.2986 49.3354 52.9297 51 52.9297C52.6646 52.9297 54.125 54.2986 54.125 55.8594H47.875ZM77.5625 76.3672C67.8699 76.3672 59.9844 68.4816 59.9844 58.7891C59.9844 49.0965 67.8699 41.2109 77.5625 41.2109C87.2551 41.2109 95.1406 49.0965 95.1406 58.7891C95.1406 68.4816 87.2551 76.3672 77.5625 76.3672Z"
            fill={color}
        />
        <g filter="url(#filter0_d)">
            <line x1="5.41421" y1="1.58579" x2="98.4142" y2="94.5858" stroke={color} stroke-width="4" stroke-linejoin="round" />
        </g>
        <defs>
            <filter id="filter0_d" x="0" y="0.17157" width="103.828" height="103.828" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
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

NoAccessories.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
};
