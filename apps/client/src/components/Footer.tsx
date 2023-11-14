import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
    margin-top: 102px;
    padding: 24px;
    text-align: center;
    color: #636363;
    font-size: 14px;

    div {
        margin: 0 auto;
        width: max-content;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            top: -24px;
            width: 60px;
            height: 4px;
            background: #ff009d;
            transform: translateX(50%);
        }
    }
`;

export const Footer = () => {
    return (
        <FooterWrapper>
            <div>&copy; Kit, LLC. 2023.</div>
        </FooterWrapper>
    );
};
