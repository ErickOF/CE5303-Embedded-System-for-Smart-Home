from libs.gpioman import *
from config import constants


def finish() -> None:
    """
    This function clears the pins used by lights.
    """
    for pin in constants.PINS['rooms'].values():
        unexport_command(pin)

def start() -> None:
    """
    This function starts the pins used by lights.
    """
    for room, pin in constants.PINS['rooms'].items():
        if export_command(pin) == constants.FAIL:
            print(f'Light Error: Pin {pin} for {room} failed to start.')
        else:
            if pin_mode(pin, constants.OUTPUT_MODE) == constants.FAIL:
                print(f'Light Error: Pin {pin} for {room} failed to start.')

def turn_on_light(room: str) -> None:
    """
    This function turns on the light of a specific room.

    Params
    ------------------------------------------------------------------
        room: str
            Name of the room.
    """
    pin: int = constants.PINS['rooms'][room]

    if digital_write(pin, constants.HIGH) == constants.FAIL:
        raise ValueError

def turn_off_light(room: str) -> None:
    """
    This function turns off the light of a specific room.

    Params
    ------------------------------------------------------------------
        room: str
            Name of the room.
    """
    pin: int = constants.PINS['rooms'][room]

    if digital_write(pin, constants.LOW) == constants.FAIL:
        raise ValueError

def get_state(room: str) -> int:
    """
    This function returns the current state of a specific door.

    Params
    ------------------------------------------------------------------
        room: str
            Name of the room.
    
    Returns
    ------------------------------------------------------------------
        the current state of the room door.
    """
    pin: int = constants.PINS['rooms'][room]

    # Get the state of the door
    result = digital_read(pin)

    if (result == constants.FAIL):
        print('Light Error: {room} in pin {pin} is not available.')
    
    return result
