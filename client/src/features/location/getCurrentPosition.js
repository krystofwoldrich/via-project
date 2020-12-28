
const getCurrentPosition = () => new Promise((resolve, reject) => {
	navigator.geolocation.getCurrentPosition(resolve, reject);
});

export default getCurrentPosition;
