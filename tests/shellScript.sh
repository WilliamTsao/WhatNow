#!/bin/bash

for ((num=1; num<=1000000; num++));
do
	yarn run test >> stdout.txt
done