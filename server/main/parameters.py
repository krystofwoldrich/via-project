from os import getenv

secret_key = getenv('HEATING_API_SECRET_KEY', '')

config = {
	'api' : {
		'name': 'Smart heating API',
		'description': 'Custom smart heating API for user settings and heating control.',
		'version': '0.0.0',
		'secret_key': secret_key,
	},
}
