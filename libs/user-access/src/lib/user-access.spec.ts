import { userAccess } from './user-access';

describe('userAccess', () => {
    it('should work', () => {
        expect(userAccess()).toEqual('user-access');
    });
});
