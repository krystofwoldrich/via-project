from flask import Flask
from flask_restplus import Api, cors
from api.security import security_namespace as security_resources
from api.user import user_namespace as user_resource
from api.heating import heating_namespace as heating_resource
from api.heating_schedule import heating_schedule_namespace as heating_schedule_resource
from database.jsonEncoder import JSONEncoder

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

app.config["RESTPLUS_JSON"] = {"cls": JSONEncoder}

api.decorators = [cors.crossdomain(
    origin='*', headers=['accept', '*']
)]

api.add_namespace(security_resources)
api.add_namespace(user_resource)
api.add_namespace(heating_resource)
api.add_namespace(heating_schedule_resource, '/heating')

app.run(host="0.0.0.0")
