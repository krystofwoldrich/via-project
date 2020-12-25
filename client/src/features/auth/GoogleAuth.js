import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { initAuth2, signInAuth2, signOutAuth2 } from './authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth2Initialized, selectIsAuth2SignIn } from './authSlice';

export default function GoogleAuth() {
	const isAuth2Initialized = useSelector(selectIsAuth2Initialized);
	const isAuth2SignIn = useSelector(selectIsAuth2SignIn);
	const dispatch = useDispatch();

	const handleAuthClick = () => dispatch(signInAuth2());
	const handleSignOutClick = () => dispatch(signOutAuth2());

	useEffect(() => {
		if (!isAuth2Initialized) {
			dispatch(initAuth2());
		}
	}, [isAuth2Initialized, dispatch]);

	return (
		<>
			{isAuth2SignIn
				? <Button
					variant='outlined'
					color='primary'
					onClick={handleSignOutClick}
				>Google Sign Out</Button>
				: <Button
					variant='outlined'
					color='primary'
					onClick={handleAuthClick}
				>Google Sign In</Button>
			}
		</>
	);
};
