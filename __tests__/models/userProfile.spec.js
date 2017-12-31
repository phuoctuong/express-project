import { models } from '../../src/models';

describe('UserProfile Model', () => {
    test('is valid with gender is in [male,female]', async () => {
        expect.assertions(2);
        const rs1 = await models.userProfile.build({
            id: 1,
            firstName: '',
            lastName: '',
            profileImg: '',
            gender: 'male'
        }).validate();
        expect(rs1).toBeDefined();

        const rs2 = await models.userProfile.build({
            id: 1,
            firstName: '',
            lastName: '',
            profileImg: '',
            gender: 'female'
        }).validate();
        expect(rs2).toBeDefined();
    });

    test('is invalid with gender is not in [male,female]', async () => {
        try {
            await models.userProfile.build({
                id: 1,
                firstName: '',
                lastName: '',
                profileImg: '',
                gender: 'test'
            }).validate();
        } catch (error) {
            expect(error.name).toBeDefined();
        }
    });
});