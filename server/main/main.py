from flask import Flask
from flask_restplus import Api
from api.security import security_namespace as security_resources
from api.user import user_namespace as user_resource
from parameters import config

authorizations = {
	'apiKey': {
		'type': 'apiKey',
		'in': 'header',
		'name': 'x-access-token',
	},
}

app = Flask(__name__)

api = Api(app,
		version = config['api']['version'],
		title = config['api']['name'],
		description = config['api']['description'],
		authorizations=authorizations)

api.add_namespace(security_resources)
api.add_namespace(user_resource)

app.run(host="0.0.0.0")
