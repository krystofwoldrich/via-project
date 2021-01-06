
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const TOKEN_KEY = 'token';

export const getToken = () => window.localStorage.getItem(TOKEN_KEY);

export const removeToken = () => window.localStorage.removeItem(TOKEN_KEY);

export const getTokenHeader = () => ({
	'x-access-token': getToken(),
});

export const getContentType = (body) => {
	return body ? { 'Content-Type': 'application/json' } : {};
}

export const doRequest = async (resource, method, body) => {
	const response = await window.fetch(
		`${API_BASE_URL}/${resource}`,
		{
			method,
			mode: 'cors',
			headers: {
				...getTokenHeader(),
				...getContentType(body),
				'accept': 'application/json',
			},
			body: body,
		}
	);

	if (!response.ok) {
		throw new Error(`Request failed: ${response.text()}`)
	}

	return response.json();
}
