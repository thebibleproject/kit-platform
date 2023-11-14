import React from 'react';
import styled from 'styled-components';
import { MagnifyingGlass } from '@phosphor-icons/react';

import { Logo } from './Logo';
import { ProfilePhoto } from './ProfilePhoto';
import { useUser } from '../providers/Auth';
import { Link } from 'react-router-dom';

const NavigationContainer = styled.nav`
    width: 100%;
    background: transparent;
    padding: 24px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, max-content)) 1fr minmax(
            0,
            max-content
        );
    grid-gap: 56px;
    justify-content: space-between;
    align-items: center;
`;

const LogoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, max-content));
    align-items: center;
    grid-gap: 8px;
    color: #fdfdfd;

    h1 {
        font-weight: 800;
        font-size: 36px;
        line-height: 1;
    }
`;

const Menu = styled.ul`
    display: grid;
    list-style: none;
    grid-template-columns: repeat(3, minmax(0, max-content));
    grid-gap: 24px;
    color: #fdfdfd;
    margin: 0 auto;
`;

const SearchContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;

    svg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 12px;
    }
`;

const SearchInput = styled.input`
    background: #161718;
    border-radius: 8px;
    border: 0;
    width: 100%;
    font-size: 16px;
    color: #ededed;
    padding: 12px 16px 12px 40px;
`;

const Profile = styled.div`
    color: #fdfdfd;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, max-content));
    grid-gap: 16px;
    align-items: center;
    font-size: 16px;
`;

export const Navigation = () => {
    const user = useUser();

    return (
        <NavigationContainer>
            <Link to="/">
                <LogoContainer>
                    <Logo />
                    <h1>Kit</h1>
                </LogoContainer>
            </Link>
            <Menu>
                <li>Top Performers</li>
                <li>Videos</li>
                <li>Articles</li>
            </Menu>
            <SearchContainer>
                <SearchInput placeholder="Search" />
                <MagnifyingGlass color="#626262" size={18} weight={'bold'} />
            </SearchContainer>
            <Profile>
                <p>
                    Welcome Back, <strong>{user.firstName}</strong>
                </p>
                <ProfilePhoto email={user.username} />
            </Profile>
        </NavigationContainer>
    );
};
