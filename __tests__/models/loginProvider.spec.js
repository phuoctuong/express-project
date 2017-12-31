import { models } from '../../src/models';

describe('LoginProvider Model', () => {
    test('is valid with provider is in [facebook,google]', async () => {
        expect.assertions(2);

        const rs1 = await models.loginProvider.build({
            id: 1,
            socialId: '',
            accessToken: '',
            refreshToken: '',
            provider: 'facebook',
            expiresInAccess: '',
            expiresInRefresh: ''
        }).validate();
        expect(rs1).toBeDefined();

        const rs2 = await models.loginProvider.build({
            id: 1,
            socialId: '',
            accessToken: '',
            refreshToken: '',
            provider: 'google',
            expiresInAccess: '',
            expiresInRefresh: ''
        }).validate();
        expect(rs2).toBeDefined();
    });

    test('is invalid with provider is not in [facebook,google]', async () => {
        try {
            await models.loginProvider.build({
                id: 1,
                socialId: '',
                accessToken: '',
                refreshToken: '',
                provider: 'test',
                expiresInAccess: '',
                expiresInRefresh: ''
            }).validate();
        } catch (error) {
            expect(error.name).toBeDefined();
        }
    });
})