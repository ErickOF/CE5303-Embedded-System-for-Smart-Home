from ctypes import *

from config import constants


gpioman_lib = CDLL(constants.SRC_LIB)


# int export_command(int PIN);
def export_command(pin: int) -> int:
    _export_command = gpioman_lib.export_command
    _export_command.restype = c_int
    _export_command(c_int(pin))

    return _export_command.value

# int pinMode(int PIN, int DIRECTION);
def pin_mode(pin: int, direction: int) -> int:
    _pin_mode = gpioman_lib.pinMode
    _pin_mode.restype = c_int
    _pin_mode(c_int(pin), c_int(direction))

    return _pin_mode.value

# int digitalWrite(int pin, int value);
def digital_write(pin: int, direction: int) -> int:
    _pin_mode = gpioman_lib.pinMode
    _pin_mode.restype = c_int
    _pin_mode(c_int(pin), c_int(direction))

    return _pin_mode.value

# int digitalRead(int pin);
def digital_read(pin: int) -> int:
    _digital_read = gpioman_lib.digital_Read
    _digital_read.restype = c_int
    _digital_read(c_int(pin))

    return _digital_read.value

# int blink(int pin, float freq, double duration);
def blink(pin: int, freq: float, duration: float) -> int:
    _blink = gpioman_lib.blink
    _blink.restype = c_int
    _blink(c_int(pin), c_float(freq), c_double(duration))

    return _blink.value

# int unexport_command(int PIN);
def unexport_command(pin: int) -> int:
    _unexport_command = gpioman_lib.unexport_command
    _unexport_command.restype = c_int
    _unexport_command(c_int(pin))

    return _unexport_command.value

