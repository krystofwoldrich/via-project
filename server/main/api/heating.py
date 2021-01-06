from flask_restplus import Namespace, fields, Resource
from flask import request
from api.security import token_required
from database.database import db
from bson import ObjectId

heatings_collection = db.heatings

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

@heating_namespace.route('')
class HeatingList(Resource):
	def options(self):
		pass

	@heating_namespace.doc(
		description='Get heating list',
		security='apiKey'
	)
	@heating_namespace.response(200, 'Success', fields.List(fields.Nested(heating_model)))
	@token_required
	def get(self, current_user):
		return list(heatings_collection.find({}))

@heating_namespace.route('/<id>')
class Heating(Resource):
	@heating_namespace.doc(
		params={'id': 'Heating ID'},
		description='Get heating detail',
		security='apiKey')
	@token_required
	@heating_namespace.response(200, 'Success', heating_model)
	def get(self, current_user, id):
		return heatings_collection.find_one({ '_id': ObjectId(id) })

	@heating_namespace.doc(
		params={'id': 'Heating ID'},
		body=heating_update_model,
		description='Update heating detail',
		security='apiKey')
	@heating_namespace.response(200, 'Success')
	@token_required
	def put(self, current_user, id):
		data = request.get_json()
		existingHeating = heatings_collection.find_one({ '_id': ObjectId(id) })
		existingHeating.update(data)
		heatings_collection.replace_one({ '_id': ObjectId(id) }, existingHeating)
		return existingHeating
