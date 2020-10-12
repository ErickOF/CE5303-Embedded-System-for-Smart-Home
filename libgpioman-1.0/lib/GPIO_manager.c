#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>
#include <string.h>
#include <time.h>
#include <config.h>
//--------Important definitions-----------------
#define IN_MODE         0    //-> When setting pin_mode to read values.
#define OUT_MODE        1    //-> When setting pin_mode to write values. 
#define LOW             0    //-> When writing out zero logic voltage. 
#define HIGH            1    //-> When writing out one logic voltage.
#define BUFF_MAX        3    //-> When export or unexport some pin.
#define FAIL           -1    //-> When some function does not reach the goal, returns -1.
#define SUCCESS         0    //-> When some function reaches the goal, returns 0.
#define DIRECTION_CHAR 35    //-> Max char length for the direction path.
#define VALUE_MAX_LEN  30    //-> Max char length for the value path.
//----------------------------------------------
/**#########################################################################################
 * This export_command function recieves a pin that has to be written in the export file.
 * Return -1 when can not open the file export, but return 0 when everything succeeded.
 * */
int export_command(int PIN){
   printf("Exporting the %d pin\n", PIN);
   char buff[BUFF_MAX];
   ssize_t bytes_written;
   int file_descriptor;
   file_descriptor = open("/sys/class/gpio/export", O_WRONLY);
   if(file_descriptor == FAIL){
      printf("Could not open export file\n");
      printf("Abort exporting.\n");
      return FAIL;
   }
   //Store in buff the pin value wich is going to be written in ~/export.
   bytes_written = snprintf(buff, BUFF_MAX, "%d", PIN);
   //Writing in ~/export the new pin
   write(file_descriptor, buff, bytes_written);
   close(file_descriptor);
   printf("Exporting %d pin, succeeded\n", PIN);
   return SUCCESS;
}
//##########################################################################################
/**#########################################################################################
 * This pinMode recieves a pin and it direction. The direction has to be 0 for reading mode, and 1 for writing mode.
 * Returns -1 when can not open a direction file or when can not write a value in this file.
 * But returns 1 when everything went well.
 * */
int pinMode(int PIN, int DIRECTION){
   const char* in_direction = "in";
   const char* out_direction = "out";
   char direction_path[DIRECTION_CHAR];
   int file_descriptor;
   //Copy in the final path char, the desire pin direction file.
   snprintf(direction_path, DIRECTION_CHAR, "/sys/class/gpio/gpio%d/direction", PIN);
   file_descriptor = open(direction_path, O_WRONLY);
   if(file_descriptor == FAIL){
      printf("Could not open direction file.\n");
      close(file_descriptor);
      return FAIL;
   }
   if(DIRECTION == IN_MODE){
      if(write(file_descriptor, in_direction, 2) == FAIL){
         printf("Could not write in to direction file the new pin mode.\n");
         close(file_descriptor);
         return FAIL;
      }
   }else if (DIRECTION == OUT_MODE){
      if (write(file_descriptor, out_direction, 3) == FAIL){
         printf("Could not write in to direction file the new pin mode\n");
         close(file_descriptor);
         return FAIL;
      }
   }else{
      close(file_descriptor);
      printf("You wrote a wrong mode for this pin, check out if it is 0 for 'in mode', or 1 for 'out mode'\n");
      return FAIL;
   }
   close(file_descriptor);
   printf("The pin %d, has %d mode already done\n", PIN, DIRECTION);
   return SUCCESS;
}
//###########################################################################################
/**##########################################################################################
 * This digitalWrite recieves pin and a value to write, it could be between 0 and 1.
 * Returns -1 when can not open or write the value file.
 * Returns 0 when everything went well.
 * */
int digitalWrite(int pin, int value){
   const char* up_value = "1";
   const char* down_value = "0";
   char value_path[VALUE_MAX_LEN];
   int file_descriptor;
   snprintf(value_path, VALUE_MAX_LEN, "/sys/class/gpio/gpio%d/value", pin);
   file_descriptor = open(value_path, O_WRONLY);
   if(file_descriptor == FAIL){
      printf("Could not open value file.\n");
      return FAIL;
   }
   if(value == LOW){
      if(write(file_descriptor, down_value, 1) == FAIL){
         printf("Could not write 0 on the pin %d\n", pin);
         return FAIL;
      }
   }else if (value == HIGH){
      if(write(file_descriptor, up_value, 1) == FAIL){
         printf("Could not write 1 on the pin %d\n", pin);
         return FAIL;
      }
   }else{
      printf("You did not specified a allowed value, check it out if it is 1 or 0, to turn on or off a pin\n");
      return FAIL;
   }
   close(file_descriptor);
   return SUCCESS;
}
//###########################################################################################
/**##########################################################################################
 * This digitalRead function recieves a pin in which the program will be listening.
 * Returns -1 when can not read or open value file.
 * Returns 0 when everything went well.
 * */
int digitalRead(int pin){
   char value_path[VALUE_MAX_LEN];
   char value_string[3];
   int file_descriptor;
   snprintf(value_path, VALUE_MAX_LEN, "/sys/class/gpio/gpio%d/value", pin);
   file_descriptor = open(value_path, O_RDONLY);
   if(file_descriptor == FAIL){
      printf("Could not open value file for reading\n");
      return FAIL;
   }
   if(read(file_descriptor, value_string, 3) == FAIL){
      printf("Could not read the file\n");
      return FAIL;
   }
   close(file_descriptor);
   int final_value = atoi(value_string);
   printf("Digital read set on pin %d succeeded\n", pin);
   return final_value;
}
//###########################################################################################
/**##########################################################################################
 * This blink function turn on/off a pin during a certain given time and at certain frequency.
 * Returns -1 when frequency is 0, and returns 1 when everything went well.
 * */
int blink(int pin, float freq, double duration){
   float period = 0;
   if(freq == 0){
      printf("You entered a frequency of 0, ensure you put a value greater than 0.\n");
      return FAIL;
   }else{
      period = 1/freq;
   }
   clock_t start_time; 
   start_time = clock();
   float transient_time = 0;
   while( transient_time < duration){
      digitalWrite(pin, 1);
      sleep(period);
      digitalWrite(pin, 0);
      sleep(period);
      //transient_time = clock() - start_time;
      transient_time += period*2;
   }
   return SUCCESS;
}
//###########################################################################################
/**##########################################################################################
 * This unexport_command function recieves a pin, that will be unexported.
 * Returns -1 when can not read or open unexport file.
 * Returns 0 when everything went well.
 * */
int unexport_command(int PIN){
   printf("Unexporting the %d pin\n", PIN);
   char buff[BUFF_MAX];
   ssize_t bytes_writen;
   int file_descriptor;
   file_descriptor = open("/sys/class/gpio/unexport", O_WRONLY);
   if (file_descriptor == FAIL){ 
      printf("Could not open unexport file for writing\n");
      return FAIL;
   }
   bytes_writen = snprintf(buff, BUFF_MAX, "%d", PIN);
   write(file_descriptor, buff, bytes_writen);
   close(file_descriptor);
   printf("Unexported pin %d\n", PIN);
   return SUCCESS;
}
//###########################################################################################
