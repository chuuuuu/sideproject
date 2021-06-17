# ref: http://www.ioccc.org/2012/endoh1/hint.html
gcc -DG=1 -DP=4 -DV=8 -D_BSD_SOURCE -std=c99 -Wall -W -Wextra -pedantic endoh1.c -o endoh1
./endoh1 < endoh1.c
