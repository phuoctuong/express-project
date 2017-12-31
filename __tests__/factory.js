import { factory } from 'factory-girl';
import faker from 'faker';

export default (models) => {
    factory.define('comment', models.comment, {
        title: () => faker.lorem.sentence(),
        commentable: () => '',
        commentableId: () => null,
        userAccountId: () => null
    });

    factory.define('loginProvider', models.loginProvider, {
        socialId: () => '',
        accessToken: () => '',
        refreshToken: () => '',
        provider: () => 'facebook',
        expiresInAccess: () => faker.date.future(),
        expiresInRefresh: () => faker.date.future()
    });

    factory.define('post', models.post, {
        title: () => faker.lorem.sentence()
    });

    factory.define('userAccount', models.userAccount, {
        email: () => faker.internet.email(),
        userName: () => faker.internet.userName(),
        passwordHash: () => '',
        activated: () => false,
        saltHash: () => '',
        status: () => false,
        emailConfirmationToken: () => null,
        passwordReminderToken: () => null,
        userProfileId: () => null,
        loginProviderId: () => null
    });

    factory.define('userProfile', models.userProfile, {
        firstName: () => faker.name.findName(),
        lastName: () => faker.name.lastName(),
        profileImg: () => faker.image.avatar(),
        gender: () => 'male'
    });
}