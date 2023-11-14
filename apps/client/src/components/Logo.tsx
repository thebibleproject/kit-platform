import React from 'react';

export const Logo = ({ outline = false }) => (
    <svg
        id="a"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 202.72 305.09"
        width={24}
    >
        <path d="M0,305.09V0H180.57" fill="#FF009D" />
        <path d="M0,0V305.09H205.72" fill="#B700FF" />
        <circle
            cx="168.72"
            cy="146.91"
            r="23.91"
            fill="#feffff"
            stroke={outline ? '#000' : undefined}
            strokeWidth={outline ? 10 : undefined}
        />
    </svg>
);
