package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"unicode"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	var buffer [3]string // 0 - last line, 1 - current line, 2 - next line

	var sum int = 0

	for scanner.Scan() {
		line := scanner.Text()

		shift(&buffer, line)

		sum += get_sum(buffer)
	}

	shift(&buffer, "")
	sum += get_sum(buffer)

	fmt.Println(sum)
}

func shift(buffer *[3]string, new_line string) {
	buffer[0] = buffer[1]
	buffer[1] = buffer[2]
	buffer[2] = new_line
}

func get_sum(lines [3]string) int {

	sum := 0
	number_buffer := ""
	in_number := false
	last_symbol_pos := -1

	for i, c := range lines[1] {
		if last_symbol_pos >= 0 {
			last_symbol_pos += 1
		}

		for line_i := 0; line_i < 3; line_i++ {
			if len(lines[line_i]) <= i {
				continue
			}

			if is_symbol(lines[line_i][i]) {
				last_symbol_pos = 0
			}
		}

		if in_number {
			if !unicode.IsDigit(rune(c)) {
				in_number = false

				if last_symbol_pos >= 0 {
					if len(number_buffer)+1 >= last_symbol_pos {
						val, _ := strconv.Atoi(number_buffer)

						sum += val
					}
				}
			} else {
				number_buffer += string(c)
			}
		} else {
			if unicode.IsDigit(rune(c)) {
				in_number = true
				number_buffer = string(c)
			}
		}
	}

	if in_number {
		if last_symbol_pos >= 0 {
			if len(number_buffer) >= last_symbol_pos {
				val, _ := strconv.Atoi(number_buffer)

				sum += val
			}
		}
	}

	return sum

}

func is_symbol(c byte) bool {
	return !unicode.IsDigit(rune(c)) && c != '.'
}
