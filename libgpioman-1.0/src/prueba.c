#include <GPIO_manager.h>
#include <stdio.h>
int main(int argc, char const* argv[] ){
    export_command(4);
    pinMode(4, 1);
    digitalWrite(4, 1);
    blink(4, 1, 5);

    export_command(17);
    pinMode(17, 0);
    int valor = 0;
    int indice = 0;
    while (indice <= 10)
    {
        valor = digitalRead(17);
        printf("Leyendo %d de %d\n", valor, 17);
        indice++;
        sleep(1);
    }
    unexport_command(4);
    unexport_command(17);
    return 0;
}
