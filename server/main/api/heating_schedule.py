from flask_restplus import Namespace, fields, Resource
from flask import request
from api.security import token_required
import uuid

heating_schedule_namespace = Namespace('heating/schedule', description='Heating Schedule API functions')

heating_schedule_search_model = heating_schedule_namespace.model('HeatingScheduleSearch', {
	'from': fields.String(
		require=True,
		example='2020-12-15T16:20:34.426644+00:00',
		description='ISO Datetime from when should the schedule be active.'),
	'to': fields.String(
		require=True,
		example='2020-12-15T16:22:34.426644+00:00',
		description='ISO Datetime to when should the schedule be active.'),
})

heating_schedule_create_model = heating_schedule_namespace.inherit('HeatingScheduleCreate', heating_schedule_search_model, {
	'temperature': fields.Integer(
		require=True,
		example=21,
		description='Current temperature in the room. Temperature in °C.'),
})

heating_schedule_update_model = heating_schedule_namespace.inherit('HeatingScheduleUpdate', heating_schedule_create_model, {
	'id': fields.String(require=True, example='KLJLK43268'),
})

heating_schedule_model = heating_schedule_namespace.inherit('HeatingSchedule', heating_schedule_update_model, {
	'setBy': fields.String(require=True, example='1234567890', description='User ID of who set the schedule.'),
})

#Debug
heating_schedule = {
	'KLJLK43268': {
		'from': '2020-12-15T16:20:34.426644+00:00',
		'to': '2020-12-15T16:22:34.426644+00:00',
		'temperature': 21,
		'id': 'KLJLK43268',
		'setBy': '1234567890',
	}
}

@heating_schedule_namespace.route('/<heatingId>/schedule')
class HeatingSchedule(Resource):
	def options(self):
		pass

	@heating_schedule_namespace.doc(
		params={
			'heatingId': 'Heating ID',
			'from': { 'description': 'YYYY-MM-DD, ISO Date, includes this date' },
			'to': { 'description': 'YYYY-MM-DD, ISO Date, first day out of request' },
		},
		description='Get heating schedule list',
		security='apiKey'
	)
	@heating_schedule_namespace.response(200, 'Success', fields.List(fields.Nested(heating_schedule_model)))
	@token_required
	def get(self, current_user, heatingId):
		result = []
		for heating_schedule_item in heating_schedule.values():
			result.append(heating_schedule_item)

		return result

	@heating_schedule_namespace.doc(
		params={'heatingId': 'Heating ID'},
		body=heating_schedule_create_model,
		description='Create heating schedule',
		security='apiKey')
	@token_required
	@heating_schedule_namespace.response(200, 'Success', heating_schedule_model)
	def post(self, current_user, heatingId):
		data = request.get_json()
		newSchedule = {
			'id': str(uuid.uuid4()),
			'setBy': current_user['id'],
		}
		newSchedule.update(data)
		heating_schedule[newSchedule['id']] = newSchedule
		return newSchedule

	@heating_schedule_namespace.doc(
		params={'heatingId': 'Heating ID'},
		body=heating_schedule_update_model,
		description='Update heating schedule',
		security='apiKey')
	@heating_schedule_namespace.response(200, 'Success', heating_schedule_model)
	@token_required
	def put(self, current_user, heatingId):
		data = request.get_json()
		scheduleId = data['id']
		heating_schedule[scheduleId].update(data)
		return heating_schedule[scheduleId]
