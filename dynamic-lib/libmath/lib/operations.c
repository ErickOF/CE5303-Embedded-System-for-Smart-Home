#include "../include/operations.h"


/**
 * This function adds two numbers.
 * 
 * Params:
 *      - double num1 - first operand.
 *      - double num1 - second operand.
 * 
 * Returns:
 *      The result to add two numbers.
 */
double add(double num1, double num2)
{
    return num1 + num2;
}

/**
 * This function substracts two numbers.
 * 
 * Params:
 *      - double num1 - first operand.
 *      - double num1 - second operand.
 * 
 * Returns:
 *      The result to substract two numbers.
 */
double substract(double num1, double num2)
{
    return num1 - num2;
}

/**
 * This function multiplies two numbers.
 * 
 * Params:
 *      - double num1 - first operand.
 *      - double num1 - second operand.
 * 
 * Returns:
 *      The result to multiply two numbers.
 */
double mult(double num1, double num2)
{
    return num1 * num2;
}

/**
 * This function divides two numbers.
 * 
 * Params:
 *      - double num1 - first operand.
 *      - double num1 - second operand.
 * 
 * Returns:
 *      The result to divide two numbers.
 */
double div(double num1, double num2)
{
    return num1 / num2;
}

/**
 * This function computes the square root of a number.
 * 
 * Params:
 *      - double num - number.
 * 
 * Returns:
 *      The square root of num.
 */
double sqrt(double num)
{
    return pow(num, 0.5);
}
