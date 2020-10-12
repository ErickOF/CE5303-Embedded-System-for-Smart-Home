from libs.gpioman import *
from config import constants


def finish() -> None:
    for pin in constants.PINS['rooms'].values():
        unexport_command(pin)

def start() -> None:
    for room, pin in constants.PINS['rooms'].items():
        if export_command(pin) == constants.FAIL:
            print(f'Light Error: Pin {pin} for {room} failed to start.')
        else:
            if pin_mode(pin, constants.OUTPUT_MODE) == constants.FAIL:
                print(f'Light Error: Pin {pin} for {room} failed to start.')

def turn_on_light(room: str) -> None:
    pin: int = constants.PINS['rooms'][room]

    if digital_write(pin, constants.HIGH) == constants.FAIL:
        raise ValueError

def turn_off_light(room: str) -> None:
    pin: int = constants.PINS['rooms'][room]

    if digital_write(pin, constants.LOW) == constants.FAIL:
        raise ValueError
