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

		var buffer []byte = make([]byte, 0)

		for _, c := range line {
			ch := string(c)

			// First attempt integer
			val, err := strconv.Atoi(ch)

			// Attempt to extract number
			if err != nil {
				buffer = append(buffer, ch[0]) // Nasty way to convert string to byte

				var success bool

				val, success = number_detector(buffer)

				if !success {
					continue
				}
			} else {
				buffer = nil
			}

			last_digit = val

			if first_digit == -1 {
				first_digit = val
			}

			if len(buffer) == 5 {
				buffer = buffer[1:]
			}
		}

		sum += (10 * first_digit) + last_digit
	}

	fmt.Println(sum)
}

func number_detector(buffer []byte) (int, bool) {
	numbers := []string{
		"one",
		"two",
		"three",
		"four",
		"five",
		"six",
		"seven",
		"eight",
		"nine",
	}

	buffer_len := len(buffer)

	for i, number := range numbers {
		matches := true

		number_len := len(number)

		if buffer_len < number_len {
			continue
		}

		for number_i := 1; number_i <= number_len; number_i++ {

			buffer_c := buffer[buffer_len-number_i]
			number_c := number[number_len-number_i]

			if number_c != buffer_c {
				matches = false
				break
			}

		}

		if matches {
			return (i + 1), true
		}

	}

	return -1, false

}
