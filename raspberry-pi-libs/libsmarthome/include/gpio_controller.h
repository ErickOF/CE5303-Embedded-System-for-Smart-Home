#ifndef LIBSMARTHOME_GPIO_CONTROLLER_H
#define LIBSMARTHOME_GPIO_CONTROLLER_H


void pinMode(unsigned short pin, bool MODE);
void digitalWrite(unsigned short pin, unsigned short value);
void digitalRead(unsigned short pin);
void blink(unsigned short pin, float freq, float duration);

#endif /* LIBSMARTHOME_GPIO_CONTROLLER_H */
