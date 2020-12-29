
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const TOKEN_KEY = 'token';

export const getToken = () => window.localStorage.getItem(TOKEN_KEY);

export const removeToken = () => window.localStorage.removeItem(TOKEN_KEY);

export const getTokenHeader = () => ({
	'x-access-token': getToken(),
});

export const doRequest = async (resource, method, body) => {
	const response = await window.fetch(
		`${API_BASE_URL}/${resource}`,
		{
			method,
			body,
			headers: {
				...getTokenHeader(),
				'accept': 'application/json',
			}
		},
	);

	return response.json();
}
