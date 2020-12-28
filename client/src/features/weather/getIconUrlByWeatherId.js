
export const getIconUrlById = (
	id,
	size = 2,
	type = 'd',
) => `http://openweathermap.org/img/wn/${id}${type}@${size}x.png`;

export const getIconIdByMainWeatherId = (weatherId) => MainWeatherIdToIconIdMap[weatherId].icon;

const getIconUrlByWeatherId = (weatherId) => getIconUrlById(getIconIdByMainWeatherId(weatherId));

export default getIconUrlByWeatherId;

const MainWeatherIdToIconIdMap = {
	'200':	{
		main: 'Thunderstorm',
		description: 'thunderstorm with light rain',
		icon:	'11',
	},
	'201':	{
		main: 'Thunderstorm',
		description: 'thunderstorm with rain',
		icon:	'11',
	},
	'202':	{
		main: 'Thunderstorm',
		description: 'thunderstorm with heavy rain',
		icon:	'11',
	},
	'210':	{
		main: 'Thunderstorm',
		description: 'light thunderstorm',
		icon:	'11',
	},
	'211':	{
		main: 'Thunderstorm',
		description: 'thunderstorm',
		icon:	'11',
	},
	'212':	{
		main: 'Thunderstorm',
		description: 'heavy thunderstorm',
		icon:	'11',
	},
	'221':	{
		main: 'Thunderstorm',
		description: 'ragged thunderstorm',
		icon:	'11',
	},
	'230':	{
		main: 'Thunderstorm',
		description: 'thunderstorm with light drizzle',
		icon:	'11',
	},
	'231':	{
		main: 'Thunderstorm',
		description: 'thunderstorm with drizzle',
		icon:	'11',
	},
	'232':	{
		main: 'Thunderstorm',
		description: 'thunderstorm with heavy drizzle',
		icon:	'11',
	},
	'300':	{
		main: 'Drizzle',
		description: 'light intensity drizzle',
		icon:	'09',
	},
	'301':	{
		main: 'Drizzle',
		description: 'drizzle',
		icon:	'09',
	},
	'302':	{
		main: 'Drizzle',
		description: 'heavy intensity drizzle',
		icon:	'09',
	},
	'310':	{
		main: 'Drizzle',
		description: 'light intensity drizzle rain',
		icon:	'09',
	},
	'311':	{
		main: 'Drizzle',
		description: 'drizzle rain',
		icon:	'09',
	},
	'312':	{
		main: 'Drizzle',
		description: 'heavy intensity drizzle rain',
		icon:	'09',
	},
	'313':	{
		main: 'Drizzle',
		description: 'shower rain and drizzle',
		icon:	'09',
	},
	'314':	{
		main: 'Drizzle',
		description: 'heavy shower rain and drizzle',
		icon:	'09',
	},
	'321':	{
		main: 'Drizzle',
		description: 'shower drizzle',
		icon:	'09',
	},
	'500':	{
		main: 'Rain',
		description: 'light rain',
		icon:	'10',
	},
	'501':	{
		main: 'Rain',
		description: 'moderate rain',
		icon:	'10',
	},
	'502':	{
		main: 'Rain',
		description: 'heavy intensity rain',
		icon:	'10',
	},
	'503':	{
		main: 'Rain',
		description: 'very heavy rain',
		icon:	'10',
	},
	'504':	{
		main: 'Rain',
		description: 'extreme rain',
		icon:	'10',
	},
	'511':	{
		main: 'Rain',
		description: 'freezing rain',
		icon:	'13',
	},
	'520':	{
		main: 'Rain',
		description: 'light intensity shower rain',
		icon:	'09',
	},
	'521':	{
		main: 'Rain',
		description: 'shower rain',
		icon:	'09',
	},
	'522':	{
		main: 'Rain',
		description: 'heavy intensity shower rain',
		icon:	'09',
	},
	'531':	{
		main: 'Rain',
		description: 'ragged shower rain',
		icon:	'09',
	},
	'600':	{
		main: 'Snow',
		description: 'light snow',
		icon:	'13',
	},
	'601':	{
		main: 'Snow',
		description: 'Snow',
		icon:	'13',
	},
	'602':	{
		main: 'Snow',
		description: 'Heavy snow',
		icon:	'13',
	},
	'611':	{
		main: 'Snow',
		description: 'Sleet',
		icon:	'13',
	},
	'612':	{
		main: 'Snow',
		description: 'Light shower sleet',
		icon:	'13',
	},
	'613':	{
		main: 'Snow',
		description: 'Shower sleet',
		icon:	'13',
	},
	'615':	{
		main: 'Snow',
		description: 'Light rain and snow',
		icon:	'13',
	},
	'616':	{
		main: 'Snow',
		description: 'Rain and snow',
		icon:	'13',
	},
	'620':	{
		main: 'Snow',
		description: 'Light shower snow',
		icon:	'13',
	},
	'621':	{
		main: 'Snow',
		description: 'Shower snow',
		icon:	'13',
	},
	'622':	{
		main: 'Snow',
		description: 'Heavy shower snow',
		icon:	'13',
	},
	'701':	{
		main: 'Mist',
		description: 'mist',
		icon:	'50',
	},
	'711':	{
		main: 'Smoke',
		description: 'Smoke',
		icon:	'50',
	},
	'721':	{
		main: 'Haze',
		description: 'Haze',
		icon:	'50',
	},
	'731':	{
		main: 'Dust',
		description: 'sand/ dust whirls',
		icon:	'50',
	},
	'741':	{
		main: 'Fog',
		description: 'fog',
		icon:	'50',
	},
	'751':	{
		main: 'Sand',
		description: 'sand',
		icon:	'50',
	},
	'761':	{
		main: 'Dust',
		description: 'dust',
		icon:	'50',
	},
	'762':	{
		main: 'Ash',
		description: 'volcanic ash',
		icon:	'50',
	},
	'771':	{
		main: 'Squall',
		description: 'squalls',
		icon:	'50',
	},
	'781':	{
		main: 'Tornado',
		description: 'tornado',
		icon:	'50',
	},
	'800':	{
		main: 'Clear',
		description: 'clear sky',
		icon:	'01',
	},
	'801':	{
		main: 'Clouds',
		description: 'few clouds: 11-25',
		icon: '02',
	},
	'802':	{
		main: 'Clouds',
		description: 'scattered clouds: 25-50',
		icon: '03',
	},
	'803':	{
		main: 'Clouds',
		description: 'broken clouds: 51-84',
		icon: '04'
	},
	'804':	{
		main: 'Clouds',
		description: 'overcast clouds: 85-100',
		icon: '04',
	},
};
