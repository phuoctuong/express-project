// @flow

declare type UserProfile = {
    id: number,
    firstName: string,
    lastName: string,
};

declare type UserAccount = {
    id: number,
    email: string,
    password: string,
    activated?: boolean,
    saltHash?: string,
    status?: boolean,
    emailConfirmationToken?: string,
    passwordReminderToken?: string,
    UserProfile?: UserProfile,
    LoginProvider?: LoginProvider
};

declare type LoginProvider = {
    id: number,
    socialId: string,
    accessToken: string,
    refreshToken: string,
    provider: string,
    expiresInAccess: any,
    expiresInRefresh: any,
};

declare type Post = {
    id: number,
    title: string,
};

declare type Comment = {
    id: number,
    commentable: string,
    commentableId: number,
    userAccountId: number,
};