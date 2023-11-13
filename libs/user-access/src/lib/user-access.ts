import { InvalidLoginError, LoginResponse } from './types';

/**
 * Obtain an access token by logging in with username and password.
 */
export async function login(
    username: string,
    password: string
): Promise<LoginResponse> {
    if (username === 'admin' && password === 'admin') {
        return {
            accessToken: 'token123',
        };
    }

    throw new InvalidLoginError('Invalid username or password');
}
