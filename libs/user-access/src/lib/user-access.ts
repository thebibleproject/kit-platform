import { InvalidLoginError, LoginResponse } from './types';

// But just to be clear... we would _never_ in real life 😉
const ACCOUNTS = new Map([
    [
        'magnusandy@gmail.com',
        {
            id: 1,
            username: 'magnusandy@gmail.com',
            password: 'password123',
            firstName: 'Andrew',
            lastName: 'Magnus',
        }
    ],
    [
        'mubatt@wyopub.com',
        {
            id: 313,
            username: 'mubatt@wyopub.com',
            password: 'password123',
            firstName: 'Matt',
            lastName: 'McElwee',
        },
    ],
    [
        'david.carroll@bibleproject.com',
        {
            id: 42,
            username: 'david.carroll@bibleproject.com',
            password: 'password123',
            firstName: 'David',
            lastName: 'Carroll',
        },
    ],
    [
        'cameron.carruthers@bibleproject.com',
        {
            id: 1774,
            username: 'cameron.carruthers@bibleproject.com',
            password: 'password123',
            firstName: 'Cameron',
            lastName: 'Carruthers',
        },
    ],
]);

/**
 * Obtain an access token by logging in with username and password.
 */
export async function login(
    username: string,
    password: string
): Promise<LoginResponse> {
    const user = ACCOUNTS.get(username);
    if (!user) throw new InvalidLoginError('Invalid username or password');

    if (user.password === password) {
        return {
            accessToken: 'token123',
            user: {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        };
    }

    throw new InvalidLoginError('Invalid username or password');
}

/**
 * Verify that the given token is valid.
 * possibly by checking with a third-party service.
 * you can also use this function to extract the user id from the token
 */
export async function verifyToken(token: string | null): Promise<boolean> {
    return true;
}

/**
 * Verify that the given token is valid and that the user has access to the given content.
 * in particular we would probably want to ensure that the user requesting the content is the same user that is logged in
 * @param token
 * @param userId
 */
export async function verifyAccessToProgress(token: string | null, userId: string): Promise<boolean> {
    const validToken = await verifyToken(token);
    if(!validToken) {
        return false
    } else {
        //actually verify that the user requesting the content is the same user that is logged in
       return userId === userId;
    }
}
