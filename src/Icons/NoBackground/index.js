import React from "react";
import PropTypes from "prop-types";
import { primaryColor } from "@ziro/theme";

export const NoBackground = ({ size = 50, color = primaryColor }) => (
    <svg width={size} height={size} viewBox="0 0 167 167" fill="none">
        <path d="M24.5588 140.476H53.0471V160.615C39.9563 154.802 33.4662 150.905 24.5588 141.95V140.476Z" fill={color} />
        <path d="M138.512 140.476H143.915L140.476 143.424L138.512 145.879V140.476Z" fill={color} />
        <path d="M81.5352 140.476H110.023V162.088C98.6264 165.652 92.4037 166.518 81.5352 166.509V140.476Z" fill={color} />
        <rect x="24.5588" y="28.4883" width="28.4882" height="28.4882" fill={color} />
        <rect x="81.5352" y="28.4883" width="28.4882" height="28.4882" fill={color} />
        <path d="M138.512 28.4883H145.388C145.388 28.4883 158.159 44.2059 162.579 56.9765H138.512V28.4883Z" fill={color} />
        <rect x="53.0471" y="113.953" width="28.4882" height="28.4882" fill={color} />
        <path d="M6.5 113.953H24.5588V142.441L23.5765 140.968C14.9686 130.504 11.709 125.33 6.5 113.953Z" fill={color} />
        <rect x="110.024" y="113.953" width="28.4882" height="28.4882" fill={color} />
        <rect x="53.0471" y="56.9765" width="28.4882" height="28.4882" fill={color} />
        <path d="M4.42059 56.9765H24.5588V85.4647H0C0.155828 74.2714 1.07252 68.0316 4.42059 56.9765Z" fill={color} />
        <rect x="110.024" y="56.9765" width="28.4882" height="28.4882" fill={color} />
        <path d="M53.0471 5.89412C63.4189 2.54345 69.7111 1.32865 81.5353 0V28.4882H53.0471V5.89412Z" fill={color} />
        <path d="M24.5588 25.05V28.4883H20.6294L24.5588 25.05Z" fill={color} />
        <path d="M110.024 4.91174C123.415 10.7168 128.449 12.8725 138.512 21.1206V28.4882H110.024V4.91174Z" fill={color} />
        <rect x="24.5588" y="85.4648" width="28.4882" height="28.4882" fill={color} />
        <rect x="81.5352" y="85.4648" width="28.4882" height="28.4882" fill={color} />
        <path d="M138.512 85.4648H166.509C165.658 97.0552 164.487 103.288 161.106 113.953H138.512V85.4648Z" fill={color} />
        <circle cx="83.5" cy="83.5" r="83" stroke={color} />
    </svg>
);

NoBackground.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
};
