import styled from 'styled-components';

export const Columns = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 24px;
    align-items: start;

    &:not(:first-child) {
        margin-top: 24px;
    }
`;
