import React, { FormEventHandler } from 'react';
import styled from 'styled-components';
import { Logo } from '../components/Logo';
import { useLogin } from '../providers/Auth';
import { Navigate } from 'react-router-dom';

const LoginCard = styled.form`
    width: 100%;
    max-width: 420px;
    border-radius: 8px;
    background: #fff;
    padding: 24px;
    margin: 120px auto;
    display: grid;
    grid-gap: 12px;

    h1 {
        color: #0c0c0e;
    }
`;

const LogoContainer = styled.div`
    display: grid;
    align-items: center;
    grid-gap: 8px;
    margin-bottom: 12px;
    grid-template-columns: minmax(0, max-content) 1fr;

    svg {
        width: 20px;
    }

    p {
        font-size: 24px;
        font-weight: 800;
        color: #0c0c0e;
        line-height: 1;
    }
`;

const FormControl = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 8px;

    & > * {
        color: #0c0c0e;
    }
`;

const Label = styled.label`
    color: #0c0c0e;
    font-size: 14px;
    font-weight: 600;
`;

const Input = styled.input`
    padding: 8px 12px;
    font-size: 18px;
    appearance: none;
    border: 2px solid #4e4e6e;
    border-radius: 4px;

    &:disabled {
        font-style: italic;
        color: #4e4e6e;
        background: #c7c7c7;
    }
`;

const Button = styled.button`
    appearance: none;
    cursor: pointer;
    border: none;
    background: #a700ff;
    color: #efefef;
    font-size: 16px;
    border-radius: 8px;
    padding: 12px;
    font-weight: 600;
`;

const Error = styled.p`
    background: #ff0000;
    font-size: 14px;
    font-weight: 600;
    margin-top: 12px;
    border-radius: 8px;
    padding: 8px;
`;

export const Login = () => {
    const [login, { loading, error, data }] = useLogin();

    if (data && data.accessToken) {
        return <Navigate to="/" />;
    }

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        return login(e.target['email'].value, e.target['password'].value);
    };

    return (
        <LoginCard onSubmit={onSubmit}>
            {error ? <Error>{error.message}</Error> : null}
            <LogoContainer>
                <Logo outline />
                <p>Kit</p>
            </LogoContainer>
            <h1>Log in to start upskilling</h1>
            <FormControl>
                <Label htmlFor="email">Username or Email</Label>
                <Input
                    disabled={loading}
                    required
                    id="email"
                    type="email"
                    name="email"
                />
            </FormControl>
            <FormControl>
                <Label htmlFor="password">Password</Label>
                <Input
                    disabled={loading}
                    required
                    id="password"
                    type="password"
                    name="password"
                />
            </FormControl>
            <Button disabled={loading} type="submit">
                {loading ? 'Logging In...' : 'Get Educated'}
            </Button>
        </LoginCard>
    );
};
