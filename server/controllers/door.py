from libs.gpioman import *
from config import constants


def finish() -> None:
    for pin in constants.PINS['doors'].values():
        unexport_command(pin)

def start() -> None:
    for room, pin in constants.PINS['doors'].items():
        if export_command(pin) == constants.FAIL:
            print(f'Door Error: Pin {pin} for {room} failed to start.')
        else:
            if pin_mode(pin, constants.INPUT_MODE) == constants.FAIL:
                print(f'Door Error: Pin {pin} for {room} failed to start.')

def get_state(room: str) -> None:
    pin: int = constants.PINS['doors'][room]

    result = digital_read(pin)

    if (result == constants.FAIL):
        print('Door Error: {room} in pin {pin} is not available.')
    
    return result
