from pymongo import MongoClient, ASCENDING
from pymongo.errors import CollectionInvalid, WriteError
from collections import OrderedDict

from config import db_config


# Get the MongoDB client
client = MongoClient(db_config.URL)

# Get collection
collection = client.users.users


def create_users_schema():
   """
   Create the user schema
   """
   # User schema
   user_schema = {
      'name': {
         'type': 'string',
         'minlength': 1,
         'required': True
      },
      'username': {
         'type': 'string',
         'minlength': 5,
         'required': True,
         'unique': True
      },
      'email': {
         'type': 'string',
         'required': True,
         'unique': True
      },
      'password': {
         'type': 'string',
         'minlength': 8,
         'required': True
      }
   }

   validator = {'$jsonSchema': {'bsonType': 'object', 'properties': {}}}
   required = []

   # Set properties
   for field_key in user_schema:
      field = user_schema[field_key]
      properties = {'bsonType': field['type']}
      minimum = field.get('minlength')

      if type(minimum) == int:
         properties['minimum'] = minimum

      if field.get('required') == True:
         required.append(field_key)

      validator['$jsonSchema']['properties'][field_key] = properties

   if len(required) > 0:
      validator['$jsonSchema']['required'] = required

   query = [('collMod', 'users'),
            ('validator', validator)]

   try:
      client.users.create_collection('users')
      client.users.users.create_index([('username', ASCENDING), ('slug', ASCENDING)], unique=True)
      client.users.users.create_index([('email', ASCENDING), ('slug', ASCENDING)], unique=True)
   except CollectionInvalid:
      pass

   # Set the schema
   command_result = client.users.command(OrderedDict(query))


def create_user(user) -> int:
   try:
      return str(collection.insert(user))
   except WriteError:
      return None

def login(user) -> bool:
   found_user = collection.find_one(user)
   return True if found_user else False


create_users_schema()
