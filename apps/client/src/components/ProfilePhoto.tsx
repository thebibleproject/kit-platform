import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #ff009d;
    object-fit: cover;
`;

export const ProfilePhoto = ({ email }: { email: string }) => {
    const [hash, setHash] = useState<string | null>(null);

    useEffect(() => {
        const enc = new TextEncoder();
        crypto.subtle
            .digest('SHA-256', enc.encode(email.trim().toLowerCase()).buffer)
            .then((hash) =>
                Array.from(new Uint8Array(hash))
                    .map((b) => b.toString(16).padStart(2, '0'))
                    .join('')
            )
            .then(setHash);
    }, [email]);

    return (
        <Image src={`https://www.gravatar.com/avatar/${hash}?d=identicon`} />
    );
};
