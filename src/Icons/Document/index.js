import React from "react";
import PropTypes from "prop-types";
import { primaryColor } from "@ziro/theme";

export const Document = ({ size = 50, color = primaryColor }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <path
            d="M99.1381 24.2922L75.7078 0.861914C75.4367 0.590039 75.1119 0.374414 74.7516 0.225391C74.3936 0.0773438 74.0141 0 73.6328 0H38.4766C36.8572 0 35.5469 1.31035 35.5469 2.92969V11.7188H2.92969C1.31035 11.7188 0 13.0291 0 14.6484V97.0703C0 98.6897 1.31035 100 2.92969 100H61.9141C63.5334 100 64.8438 98.6897 64.8438 97.0703V87.8906H97.0703C98.6897 87.8906 100 86.5803 100 84.9609V26.3672C100 25.9859 99.9227 25.6064 99.7746 25.2484C99.6256 24.8881 99.41 24.5633 99.1381 24.2922ZM76.5625 10.0021L89.9978 23.4375H76.5625V10.0021ZM58.9844 94.1406H5.85938V17.5781H35.5469V84.9609C35.5469 86.5803 36.8572 87.8906 38.4766 87.8906H58.9844V94.1406ZM94.1406 82.0312H41.4062V5.85938H70.7031V26.3672C70.7031 27.9865 72.0135 29.2969 73.6328 29.2969H94.1406V82.0312Z"
            fill={color}
        />
        <path
            d="M47.2656 43.9453C47.2656 45.5646 48.5759 46.875 50.1953 46.875H85.3515C86.9709 46.875 88.2812 45.5646 88.2812 43.9453C88.2812 42.326 86.9709 41.0156 85.3515 41.0156H50.1953C48.5759 41.0156 47.2656 42.326 47.2656 43.9453Z"
            fill={color}
        />
        <path
            d="M85.3515 58.5938H50.1953C48.5759 58.5938 47.2656 59.9041 47.2656 61.5234C47.2656 63.1428 48.5759 64.4531 50.1953 64.4531H85.3515C86.9709 64.4531 88.2812 63.1428 88.2812 61.5234C88.2812 59.9041 86.9709 58.5938 85.3515 58.5938Z"
            fill={color}
        />
        <defs>
            <linearGradient id="paint0_linear" x1="50" y1="100" x2="50" y2="0" gradientUnits="userSpaceOnUse">
                <stop stop-color={color} />
                <stop offset="0.0001" />
            </linearGradient>
            <linearGradient id="paint1_linear" x1="67.7734" y1="46.875" x2="67.7734" y2="41.0156" gradientUnits="userSpaceOnUse">
                <stop stop-color={color} />
                <stop offset="0.0001" />
            </linearGradient>
            <linearGradient id="paint2_linear" x1="67.7734" y1="64.4531" x2="67.7734" y2="58.5938" gradientUnits="userSpaceOnUse">
                <stop stop-color={color} />
                <stop offset="0.0001" />
            </linearGradient>
        </defs>
    </svg>
);

Document.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
};
