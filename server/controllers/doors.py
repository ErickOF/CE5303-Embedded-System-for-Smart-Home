from libs.gpioman import *
from config import constants


def finish() -> None:
    """
    This function clears the pins used by doors.
    """
    for pin in constants.PINS['doors'].values():
        unexport_command(pin)

def start() -> None:
    """
    This function starts the pins used by doors.
    """
    for room, pin in constants.PINS['doors'].items():
        if export_command(pin) == constants.FAIL:
            print(f'Door Error: Pin {pin} for {room} failed to start.')
        else:
            if pin_mode(pin, constants.INPUT_MODE) == constants.FAIL:
                print(f'Door Error: Pin {pin} for {room} failed to start.')

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
    pin: int = constants.PINS['doors'][room]

    # Get the state of the door
    result = digital_read(pin)

    if (result == constants.FAIL):
        print('Door Error: {room} in pin {pin} is not available.')
    
    return result
