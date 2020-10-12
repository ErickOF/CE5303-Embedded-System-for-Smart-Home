# Dynamic library path
SRC_LIB: str = '/usr/lib/libgpioman.so'


# When writing out one logic voltage
HIGH: int = 1
# When writing out zero logic voltage
LOW: int = 0


# When setting pin_mode to read values
INPUT_MODE: int = 0
# When setting pin_mode to write values
OUTPUT_MODE: int = 1
# When some function does not reach the goal, returns -1


FAIL: int = -1
# When some function reaches the goal, returns 0
SUCCESS = 0


# Pins values
PINS: dict = {
    'rooms': {
        'living-room': 0,
        'bedroom1': 1,
        'bedroom2': 2,
        'kitchen': 3,
        'other': 4
    },
    'doors': {
        '1': 5,
        '2': 6
    }
}
