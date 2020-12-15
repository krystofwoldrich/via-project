from flask_restplus import Namespace, fields, Resource
from flask import request
from api.security import token_required

heating_namespace = Namespace('heating', description='Heating API functions')

heating_update_model = heating_namespace.model('HeatingUpdate', {
	'name': fields.String(require=False, example='Living room heating'),
	'description': fields.String(require=False, example='Radiator on the left from the window'),
	'current_temperature': fields.Integer(
		require=False,
		example=19,
		description='Current temperature in the room. Temperature in °C.')
}) 

heating_model = heating_namespace.inherit('Heating', heating_update_model, {
	'id': fields.String(require=True, example='KLJLK43268'),
})

#Debug
heating = {
	'KLJLK43268': {
		'id': 'KLJLK43268',
		'name': 'Living room heating',
		'description': 'Radiator on the left from the window',
		'current_temperature': 19,
	},
}

@heating_namespace.route('/')
class HeatingList(Resource):
	@heating_namespace.doc(
		description='Get heating list',
		security='apiKey'
	)
	@heating_namespace.response(200, 'Success', fields.List(fields.Nested(heating_model)))
	@token_required
	def get(self, current_user):
		result = []
		for heating_item in heating.values():
			result.append(heating_item)
		return result

@heating_namespace.route('/<id>')
class Heating(Resource):
	@heating_namespace.doc(
		params={'id': 'Heating ID'},
		description='Get heating detail',
		security='apiKey')
	@token_required
	@heating_namespace.response(200, 'Success', heating_model)
	def get(self, current_user, id):
		return heating[id]

	@heating_namespace.doc(
		params={'id': 'Heating ID'},
		body=heating_update_model,
		description='Update heating detail',
		security='apiKey')
	@heating_namespace.response(200, 'Success')
	@token_required
	def put(self, current_user, id):
		data = request.get_json()
		return heating[id].update(data)
