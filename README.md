## Smart heating idea

This application will combine Google Calendar, weatherstack and custom apis, to create pleasing experience, when setting home heating.

Google calendar will be used to suggest turning heating down, to save on energy. The weather api will be used to suggest when to turn the heating on. And the custom api will take care of saving users preference and communications with the hardware of the smart heating.

[weatherstack API Documentation](https://weatherstack.com/documentation) to get weather forecast.

[Google calendar API Documentation](https://developers.google.com/calendar/quickstart/js) shows how to use it in application front-end using javascript.

## Presentation

<iframe
	src="https://docs.google.com/presentation/d/e/2PACX-1vSO904qsEWZtYYJj0k5hRa-N7hP1Nw7re1mie4I6P3UwPCWP2sxf8n5DNaUURPa8YMYT80HOB_rb-6w/embed?start=false&loop=false&delayms=60000"
	frameborder="0"
	allowfullscreen="true"
	mozallowfullscreen="true"
	webkitallowfullscreen="true"
	style="
		width: 100%;
		height: 500px;
	"
></iframe>

[Open in Google Slides.](https://docs.google.com/presentation/d/1CLocuMqYReHWZoPJi0ToZj_qzAQEAYn0Rd3DMnzcdIg/edit?usp=sharing)

## Progress

What has been done on the project categorized by weeks.

### 2021 Week 1

- Add server api facade
- Add mongo to server side for users, heatings and heatings schedules
- Add set heating schedule, update heating schedule using calendar
- Fix mapping from api objects to view object
- Many other fixes

### 2020 Week 53

- Add loading skeleton for weather and calendar views
- Add cors to server
- Fix jwt
- Add client login api connection

### 2020 Week 52

- Add dashboard, login, upcoming events and calendar demo view
- Add Google Auth and Calendar API
- Add material ui styles
- Add weather forecast view and API connection

### 2020 Week 51

- Added docker client, server image and docker compose
- Added user, heating, heating schedule endpoints with demo data
- Embedded Google Slides presentation in this documentation page
- Setup Redux CRA for front-end development

### 2020 Week 46

- Setup Github Pages, Basic documentation
- Setup Pipenv development environment
- Added simple Flask RestPlus API Server
- Added DateTime to ISO Converter
- Added User Authentication Endpoint
