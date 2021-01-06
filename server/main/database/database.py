from parameters import config
from pymongo import MongoClient

MONGO_URI = config['mongo']['uri']

client = MongoClient(MONGO_URI)

db = client.smart_heating
