import React from "react";
import PropTypes from "prop-types";
import { primaryColor } from "@ziro/theme";

export const PersonalDocument = ({ size = 50, color = primaryColor }) => (
    <svg width={size} height={size} viewBox="0 0 100 88" fill="none">
        <path
            d="M97.0703 17.6328H76.3672V14.7031C76.3672 13.0852 75.0555 11.7734 73.4375 11.7734H64.3541C62.9928 5.09551 57.074 0.0546875 50 0.0546875C42.926 0.0546875 37.0072 5.09551 35.6459 11.7734H26.5625C24.9445 11.7734 23.6328 13.0852 23.6328 14.7031V17.6328H2.92969C1.31172 17.6328 0 18.9445 0 20.5625V85.0156C0 86.6336 1.31172 87.9453 2.92969 87.9453H97.0703C98.6883 87.9453 100 86.6336 100 85.0156V20.5625C100 18.9445 98.6883 17.6328 97.0703 17.6328ZM29.4922 17.6328H38.2812C39.8992 17.6328 41.2109 16.3211 41.2109 14.7031C41.2109 9.85684 45.1537 5.91406 50 5.91406C54.8463 5.91406 58.7891 9.85684 58.7891 14.7031C58.7891 16.3211 60.1008 17.6328 61.7188 17.6328H70.5078V23.4922H29.4922V17.6328ZM94.1406 82.0859H5.85938V23.4922H23.6328V26.4219C23.6328 28.0398 24.9445 29.3516 26.5625 29.3516H73.4375C75.0555 29.3516 76.3672 28.0398 76.3672 26.4219V23.4922H94.1406V82.0859ZM79.2969 52.7891H55.8594C54.2414 52.7891 52.9297 54.1008 52.9297 55.7188C52.9297 57.3367 54.2414 58.6484 55.8594 58.6484H79.2969C80.9148 58.6484 82.2266 57.3367 82.2266 55.7188C82.2266 54.1008 80.9148 52.7891 79.2969 52.7891ZM79.2969 64.5078H55.8594C54.2414 64.5078 52.9297 65.8195 52.9297 67.4375C52.9297 69.0555 54.2414 70.3672 55.8594 70.3672H79.2969C80.9148 70.3672 82.2266 69.0555 82.2266 67.4375C82.2266 65.8195 80.9148 64.5078 79.2969 64.5078ZM50 11.7734C48.382 11.7734 47.0703 13.0852 47.0703 14.7031C47.0703 16.3211 48.382 17.6328 50 17.6328C51.618 17.6328 52.9297 16.3211 52.9297 14.7031C52.9297 13.0852 51.618 11.7734 50 11.7734ZM41.2109 44C41.2109 39.1537 37.2682 35.2109 32.4219 35.2109C27.5756 35.2109 23.6328 39.1537 23.6328 44C23.6328 48.8463 27.5756 52.7891 32.4219 52.7891C37.2682 52.7891 41.2109 48.8463 41.2109 44ZM32.4219 46.9297C30.8064 46.9297 29.4922 45.6154 29.4922 44C29.4922 42.3846 30.8064 41.0703 32.4219 41.0703C34.0373 41.0703 35.3516 42.3846 35.3516 44C35.3516 45.6154 34.0373 46.9297 32.4219 46.9297ZM32.4219 52.7891C24.3447 52.7891 17.7734 59.3604 17.7734 67.4375V73.2969C17.7734 74.9148 19.0852 76.2266 20.7031 76.2266H44.1406C45.7586 76.2266 47.0703 74.9148 47.0703 73.2969V67.4375C47.0703 59.3604 40.499 52.7891 32.4219 52.7891ZM41.2109 70.3672H23.6328V67.4375C23.6328 62.5912 27.5756 58.6484 32.4219 58.6484C37.2682 58.6484 41.2109 62.5912 41.2109 67.4375V70.3672ZM55.8594 46.9297C57.4773 46.9297 58.7891 45.618 58.7891 44C58.7891 42.382 57.4773 41.0703 55.8594 41.0703C54.2414 41.0703 52.9297 42.382 52.9297 44C52.9297 45.618 54.2414 46.9297 55.8594 46.9297ZM67.5781 46.9297C69.1961 46.9297 70.5078 45.618 70.5078 44C70.5078 42.382 69.1961 41.0703 67.5781 41.0703C65.9602 41.0703 64.6484 42.382 64.6484 44C64.6484 45.618 65.9602 46.9297 67.5781 46.9297ZM79.2969 46.9297C80.9148 46.9297 82.2266 45.618 82.2266 44C82.2266 42.382 80.9148 41.0703 79.2969 41.0703C77.6789 41.0703 76.3672 42.382 76.3672 44C76.3672 45.618 77.6789 46.9297 79.2969 46.9297Z"
            fill={color}
        />
        <defs>
            <linearGradient id="paint0_linear" x1="50" y1="87.9453" x2="50" y2="0.0546875" gradientUnits="userSpaceOnUse">
                <stop stop-color={color} />
                <stop offset="0.0001" />
            </linearGradient>
        </defs>
    </svg>
);

PersonalDocument.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
};