import { login } from './user-access';

// If the `user-access` library was actually calling any third-party services,
// such as Firebase, we would mock those here.

describe('login', () => {
    it('should return a token when given correct credentials', async () => {
        const { accessToken } = await login('magnusandy@gmail.com', 'password123');
        expect(accessToken).toEqual('token123');
    });
});
