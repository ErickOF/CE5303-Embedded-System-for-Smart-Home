#include <stdio.h>
#include "../include/operations.h"


int main(int argc, char const *argv[])
{
    printf("Add: %f\n", add(2.0, 3.0));
    printf("Sub: %f\n", substract(2.0, 3.0));
    printf("Mult: %f\n", mult(2.0, 3.0));
    printf("Div: %f\n", div(2.0, 3.0));
    printf("Sqrt: %f\n", sqrt(4.0));

    return 0;
}
