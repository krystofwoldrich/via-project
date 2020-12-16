import uuid
import jwt
from flask_restplus import Namespace, Resource, fields
from flask import request
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from parameters import config
from custom_time.custom_time import get_now_utc_iso_string
from datetime import datetime, timedelta

SECRET_KEY = config['api']['secret_key']

security_namespace = Namespace('auth', description='Auth API functions')

registration_body_model = security_namespace.model('Registration', {
	'username': fields.String(required=True, example='john_doe'),
	'password': fields.String(required=True, example='myAwEsOmE_pass!1234'),
	'email': fields.String(required=True, example='john_doe@example.com'),
})

login_body_model = security_namespace.model('Login', {
	'username': fields.String(required=True, example='john_doe'),
	'password': fields.String(required=True, example='myAwEsOmE_pass!1234'),
})

# Debug
users = [
	{
		'id': '123456789',
		'username': 'admin',
		'password': generate_password_hash('admin', method='sha256'),
		'email': 'admin@admin.cz',
		'admin': True,
		'last_login_at': get_now_utc_iso_string(),
	}
]

def token_required(f):
	@wraps(f)
	def decorated(ref, *args, **kwargs):
		token = None

		if 'x-access-token' in request.headers:
			token = request.headers['x-access-token']

		if not token:
			return {'message' : 'Token is missing!'}, 401

		try: 
			data = jwt.decode(token, SECRET_KEY)
			current_user = None
			for user in users:
				if user['id'] == data['id']:
					current_user = user

		except:
			return {'message' : 'Token is invalid!'}, 401

		return f(ref, current_user, *args, **kwargs)

	return decorated

@security_namespace.route('/register')
class Register(Resource):
	@security_namespace.doc(body=registration_body_model, responses={201: 'Created'}, description="Register a new user")
	def post(self):
		data = request.get_json()

		hashed_password = generate_password_hash(data['password'], method='sha256')

		new_user = {
			'id': str(uuid.uuid4()),
			'username': data['username'],
			'password': hashed_password,
			'email': data['email'],
			'admin': False,
			'last_login_at': get_now_utc_iso_string(),
		}

		users.append(new_user)

		return {'message' : 'New user created!'}, 201

@security_namespace.route('/login')
@security_namespace.header('X-Header', 'Some class header')
class Login(Resource):
	@security_namespace.doc(body=login_body_model, responses={200: 'OK'}, description="Register a new user")
	def put(self):
		auth = request.get_json()

		if not auth or not auth['username'] or not auth['password']:
			return 'Could not verify', 401

		current_user = None
		for user in users:
			if user['username'] == auth['username']:
				current_user = user

		if not current_user:
			return 'Could not verify', 401

		if check_password_hash(user['password'], auth['password']):
			token = jwt.encode({'id' : user['id'], 'exp' : datetime.utcnow() + timedelta(minutes=30)}, SECRET_KEY)

			return {'token' : token.decode('UTF-8')}

		return 'Could not verify', 401
