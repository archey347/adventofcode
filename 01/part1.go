package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	sum := 0

	for scanner.Scan() {
		line := scanner.Text()

		first_digit := -1
		last_digit := -1

		for _, c := range line {
			val, err := strconv.Atoi(string(c))

			if err == nil {
				last_digit = val

				if first_digit == -1 {
					first_digit = val
				}
			}
		}

		sum += (10 * first_digit) + last_digit
	}

	fmt.Println(sum)
}
