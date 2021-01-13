import React from "react";
import PropTypes from "prop-types";
import { primaryColor } from "@ziro/theme";

export const DocumentTwo = ({ size = 50, color = primaryColor }) => (
    <svg width={size} height={size} viewBox="0 0 100 88" fill="none">
        <path
            d="M32.4219 46.9297H55.8594C57.4787 46.9297 58.7891 45.6193 58.7891 44V20.5625C58.7891 18.9432 57.4787 17.6328 55.8594 17.6328H32.4219C30.8025 17.6328 29.4922 18.9432 29.4922 20.5625V44C29.4922 45.6193 30.8025 46.9297 32.4219 46.9297ZM35.3516 23.4922H52.9297V41.0703H35.3516V23.4922ZM97.0703 0.0546875H20.5078C18.8885 0.0546875 17.5781 1.36504 17.5781 2.98438V58.6484H2.92969C1.31035 58.6484 0 59.9588 0 61.5781V76.2266C0 82.6897 5.25566 87.9453 11.7188 87.9453H85.3516C93.4283 87.9453 100 81.3736 100 73.2969V2.98438C100 1.36504 98.6897 0.0546875 97.0703 0.0546875ZM17.5781 76.2266C17.5781 79.4566 14.9488 82.0859 11.7188 82.0859C8.48867 82.0859 5.85938 79.4566 5.85938 76.2266V64.5078H17.5781V76.2266ZM94.1406 73.2969C94.1406 78.1434 90.198 82.0859 85.3516 82.0859H21.8078C22.817 80.3555 23.4375 78.3705 23.4375 76.2266V5.91406H94.1406V73.2969ZM67.7734 23.4922H85.3516C86.9709 23.4922 88.2812 22.1818 88.2812 20.5625C88.2812 18.9432 86.9709 17.6328 85.3516 17.6328H67.7734C66.1541 17.6328 64.8438 18.9432 64.8438 20.5625C64.8438 22.1818 66.1541 23.4922 67.7734 23.4922ZM67.7734 35.2109H85.3516C86.9709 35.2109 88.2812 33.9006 88.2812 32.2812C88.2812 30.6619 86.9709 29.3516 85.3516 29.3516H67.7734C66.1541 29.3516 64.8438 30.6619 64.8438 32.2812C64.8438 33.9006 66.1541 35.2109 67.7734 35.2109ZM67.7734 46.9297H85.3516C86.9709 46.9297 88.2812 45.6193 88.2812 44C88.2812 42.3807 86.9709 41.0703 85.3516 41.0703H67.7734C66.1541 41.0703 64.8438 42.3807 64.8438 44C64.8438 45.6193 66.1541 46.9297 67.7734 46.9297ZM32.4219 58.6484H85.3516C86.9709 58.6484 88.2812 57.3381 88.2812 55.7188C88.2812 54.0994 86.9709 52.7891 85.3516 52.7891H32.4219C30.8025 52.7891 29.4922 54.0994 29.4922 55.7188C29.4922 57.3381 30.8025 58.6484 32.4219 58.6484ZM32.4219 70.3672H85.3516C86.9709 70.3672 88.2812 69.0568 88.2812 67.4375C88.2812 65.8182 86.9709 64.5078 85.3516 64.5078H32.4219C30.8025 64.5078 29.4922 65.8182 29.4922 67.4375C29.4922 69.0568 30.8025 70.3672 32.4219 70.3672Z"
            fill={color}
        />
        <defs>
            <linearGradient id="paint0_linear" x1="50" y1="87.9453" x2="50" y2="0.0546875" gradientUnits="userSpaceOnUse">
                <stop />
                <stop offset="0.0001" />
            </linearGradient>
        </defs>
    </svg>
);

DocumentTwo.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
};