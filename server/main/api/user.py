from flask_restplus import Namespace, fields, Resource
from flask import request
from api.security import token_required
from database.database import db
from bson import ObjectId
from database.jsonEncoder import JSONEncoder
import json

users_collection = db.users

user_namespace = Namespace('user', description='User API functions')

user_response_model = user_namespace.model('User', {
	'id': fields.String(require=True, example='1234567890'),
	'username': fields.String(required=True, example='john_doe'),
	'email': fields.String(required=True, example='john_doe@example.com'),
	'admin': fields.Boolean(required=True, example=True),
	'last_login_at': fields.String(required=True, example='2020-12-15T16:20:34.426644+00:00'),
	'calendar_api_key': fields.String(require=True, example='HKGHJG65zdakfgkdadsa675Z6TIGHjhgjhg'),
	'weather_api_key': fields.String(require=True, example='HKGHJG65zdakfgkdadsgflskjhfjhf53E46R78TZ98HGZU'),
})

user_update_model = user_namespace.model('UserUpdate', {
	'calendar_api_key': fields.String(require=True, example='HKGHJG65zdakfgkdadsa675Z6TIGHjhgjhg'),
	'weather_api_key': fields.String(require=True, example='HKGHJG65zdakfgkdadsgflskjhfjhf53E46R78TZ98HGZU'),
})

@user_namespace.route('/<id>')
class User(Resource):
	def options(self):
		pass

	@user_namespace.doc(
		params={'id': 'User ID'},
		description='Get user detail',
		security='apiKey')
	@user_namespace.response(200, 'Success', user_response_model)
	@token_required
	def get(self, current_user, id):
		if current_user['id'] == id:
			return users_collection.find_one({ '_id': ObjectId(id) })

	@user_namespace.doc(
		params={'id': 'User ID'},
		body=user_update_model,
		description='Update user detail',
		security='apiKey')
	@user_namespace.response(200, 'Success', user_response_model)
	@token_required
	def put(self, current_user, id):
		if current_user['id'] == id:
			data = request.get_json()
			existingUser = None
			existingUser = users_collection.find_one({ '_id': ObjectId(id) })
			if existingUser != None:
				existingUser.update(data)
				users_collection.replace_one({ '_id': ObjectId(id) }, existingUser)
				return existingUser
