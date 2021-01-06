from os import getenv

secret_key = getenv('HEATING_API_SECRET_KEY', '')
if secret_key == '':
	raise 'HEATING_API_SECRET_KEY env is missing!'

config = {
	'api' : {
		'name': 'Smart heating API',
		'description': 'Custom smart heating API for user settings and heating control.',
		'version': '0.0.0',
		'secret_key': secret_key,
	},
}
