from flask_restplus import Namespace, fields, Resource
from flask import request
from api.security import token_required
import uuid
from bson import ObjectId
from database.database import db

heatings_sechedules_collection = db.heatings_sechedules

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

@heating_schedule_namespace.route('/<heatingId>/schedule/<scheduleId>')
class HeatingSchedule(Resource):
	def options(self):
		pass

	@heating_schedule_namespace.doc(
		params={'heatingId': 'Heating ID', 'scheduleId' : 'Heating Schedule ID'},
		body=heating_schedule_update_model,
		description='Update heating schedule',
		security='apiKey')
	@heating_schedule_namespace.response(200, 'Success', heating_schedule_model)
	@token_required
	def put(self, current_user, heatingId, scheduleId):
		data = request.get_json()
		existingSchedule = None
		existingSchedule = heatings_sechedules_collection.find_one({ '_id' : ObjectId(scheduleId), 'heatingId' : heatingId })
		if existingSchedule != None:
			existingSchedule.update(data)
			existingSchedule.update({
				'setBy': current_user['id'],
			})
			heatings_sechedules_collection.replace_one({ '_id' : ObjectId(scheduleId) }, existingSchedule)
			return existingSchedule
		else:
			return {}, 400

	@heating_schedule_namespace.doc(
		params={'heatingId': 'Heating ID', 'scheduleId' : 'Heating Schedule ID'},
		body=heating_schedule_update_model,
		description='Delete heating schedule',
		security='apiKey')
	@heating_schedule_namespace.response(200, 'Success', heating_schedule_model)
	@token_required
	def delete(self, current_user, heatingId, scheduleId):
		removedSchedule = heatings_sechedules_collection.find_one({ '_id' : ObjectId(scheduleId), 'heatingId' : heatingId })
		if removedSchedule != None:
			heatings_sechedules_collection.delete_one({ '_id' : ObjectId(scheduleId), 'heatingId' : heatingId })
			return removedSchedule
		else:
			return {}, 400

@heating_schedule_namespace.route('/<heatingId>/schedule')
class HeatingScheduleList(Resource):
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
		return list(heatings_sechedules_collection.find({ 'heatingId' : heatingId }))

	@heating_schedule_namespace.doc(
		params={'heatingId': 'Heating ID', 'scheduleId' : 'Heating Schedule ID'},
		body=heating_schedule_create_model,
		description='Create heating schedule',
		security='apiKey')
	@token_required
	@heating_schedule_namespace.response(200, 'Success', heating_schedule_model)
	def post(self, current_user, heatingId):
		data = request.get_json()
		data.update({
			'setBy' : current_user['id'],
			'heatingId' : heatingId,
		})
		result = heatings_sechedules_collection.insert_one(data)
		return heatings_sechedules_collection.find_one({ '_id' : result.inserted_id })
