import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL, TOKEN_KEY, getToken, removeToken } from '../../api/api';

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_KEY;
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

export const checkSignIn = createAsyncThunk(
	'auth/checkSignIn',
	() => {
		const token = getToken();
		return token !== null;
	},
)

export const signIn = createAsyncThunk(
	'auth/signIn',
	async ({ login, password }) => {
		const resource = 'auth/login';
		const response = await window.fetch(
			`${API_BASE_URL}/${resource}`,
			{
				method: 'PUT',
				body: JSON.stringify({
					username: login,
					password,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		if (response.ok) {
			const result = await response.json();

			window.localStorage.setItem(TOKEN_KEY, result.token);
			
			return result.token;
		} else {
			throw new Error('Login failed');
		}
	},
);

export const initAuth2 = createAsyncThunk(
  'auth/initAuth2',
  (_, thunkAPI) => {
		const updateSigninStatusCallback = (isSignedIn) => {
			thunkAPI.dispatch(updateSigninStatus(isSignedIn));
		}

		return new Promise((resolve, reject) => {
			const initClient = () => {
				window.gapi.client.init({
					apiKey: API_KEY,
					clientId: CLIENT_ID,
					discoveryDocs: DISCOVERY_DOCS,
					scope: SCOPES
				}).then(function () {
					// Listen for sign-in state changes.
					window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatusCallback);
	
					// Handle the initial sign-in state.
					updateSigninStatusCallback(window.gapi.auth2.getAuthInstance().isSignedIn.get());

					resolve();
				}, function(error) {
					reject(error)
				});
			}
	
			window.gapi.load('client:auth2', initClient);
		});
  },
);

export const signInAuth2 = createAsyncThunk(
  'auth/signInAuth2',
  () => {
		window.gapi.auth2.getAuthInstance().signIn();
  },
);

export const signOutAuth2 = createAsyncThunk(
  'auth/signOutAuth2',
  () => {
		window.gapi.auth2.getAuthInstance().signOut();
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
		isUserSignIn: false,
		isAuth2Initialized: false,
		isAuth2Signin: false,
	},
  reducers: {
		updateSigninStatus: (state, action) => {
			state.isAuth2Signin = action.payload;
		},
		signOut: (state) => {
			removeToken();
			state.isUserSignIn = false;
		},
	},
	extraReducers: {
		[initAuth2.fulfilled]: (state) => {
			state.isAuth2Initialized = true;
		},
		[checkSignIn.fulfilled]: (state, action) => {
			state.isUserSignIn = action.payload;
		},
		[signIn.fulfilled]: (state) => {
			state.isUserSignIn = true;
		}
	},
});

export const { updateSigninStatus, signOut } = authSlice.actions;

export const selectIsAuth2Initialized = state => state.auth.isAuth2Initialized;
export const selectIsAuth2SignIn = state => state.auth.isAuth2Signin;

export const selectIsUserSignIn = state => state.auth.isUserSignIn;

export default authSlice.reducer;
