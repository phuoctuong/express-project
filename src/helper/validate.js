// @flow

const EMAIL_REGEX = /^[A-Za-z0-9!#$%&‘*+-/=?^_`{|}~]+@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\!\\@\\#\\$\\%\\&\\*]).{8,}$/;

export const validateEmail = (email: string): boolean => {
	return EMAIL_REGEX.test(email);
};

export const validatePassword = (password: string): boolean => {
	return PASSWORD_REGEX.test(password);
};

export const validateEmptyString = (str: string): boolean => {
	return str.length > 0;
};
