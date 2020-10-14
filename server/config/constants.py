# Dynamic library path
SRC_LIB: str = '/usr/lib/libgpioman.so.0'


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
SUCCESS: int = 0


# Pins values
PINS: dict = {
    'rooms': {
        'living-room': 2,
        'bedroom1': 3,
        'bedroom2': 4,
        'kitchen': 17,
        'other': 27
    },
    'doors': {
        '1': 5,
        '2': 6,
        '3': 20,
        '4': 21
    }
}
