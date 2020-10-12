from flask import Flask
from flask import jsonify
from flask import request

from config import server_config as sconf
from controllers import db


app = Flask(__name__)
app.config['DEBUG'] = True



@app.route('/', methods=['GET'])
def home():
    return f'<h1>Smart Home API</h1><p>Welcome to the API.</p>'


@app.route('/login', methods=['POST'])
def login():
    """
    Used to login in the smart home app.
    """
    # Generic response
    response = {
        'error': False,
        'data': None,
        'msg': None
    }

    # Login user
    found = db.login(request.json)

    # Validate
    if not found:
        response['data'] = { 'valid': False, 'msg': 'Invalid username or password.' }
    else:
        response['data'] = { 'valid': True }

    return jsonify(response)


@app.route('/sign_up', methods=['POST'])
def sign_up():
    """
    Used to register a new user in the smart home app.
    """
    # Generic response
    response = {
        'error': False,
        'data': None,
        'msg': None
    }

    # Create user
    _id = db.create_user(request.json)

    # Validate
    if _id:
        response['data'] = { 'valid': True, 'id': _id }
    else:
        response['data'] = { 'valid': False, 'msg': 'User already exists.' }

    return jsonify(response)


@app.route('/home/change_light_state', methods=['POST'])
def change_light_state():
    """
    Used to turn on a light.
    """
    # Generic response
    response = {
        'error': False,
        'data': None,
        'msg': None
    }

    return jsonify(response)


@app.route('/home/get_door_state', methods=['POST'])
def get_door_state():
    """
    Used to get a door state.
    """
    # Generic response
    response = {
        'error': False,
        'data': None,
        'msg': None
    }

    return jsonify(response)


@app.route('/home/take_photo', methods=['GET'])
def take_photo():
    """
    Used to take a photo of a room.
    """
    # Generic response
    response = {
        'error': False,
        'data': None,
        'msg': None
    }

    return jsonify(response)


if __name__ == '__main__':
    app.run(host=sconf.HOST, port=sconf.PORT)

