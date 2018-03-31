export const UNIQUE_VIOLATION = 'unique violation';
export const PROVIDER = ['facebook', 'google'];
export const GENDER = ['male', 'female'];
export const GRAPH = {
	facebook: {
		url: 'https://graph.facebook.com',
		version: 'v2.12',
		fields: ['id', 'name', 'first_name', 'last_name', 'email', 'gender', 'picture']
	}
};
