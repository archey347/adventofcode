package main

import (
	"fmt"
	"strconv"
)

func main() {
	// Not part of the competition, just me getting used to the language

	fmt.Println("Hello World :)");

	var a int = 2;

	check_a(a);
	a = 3;
	check_a(a);

	for i := 1; i <= 10; i++ {
		fmt.Println(i);
	}
}

func check_a(a int) {
	if (a == 2) {
		fmt.Println("a has a value of 2");
	} else {
		fmt.Println("a does not have a value of 2, rather it is " + strconv.Itoa(a));
	}
}