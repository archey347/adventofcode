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

	var counter int = 0

	for scanner.Scan() {
		fmt.Println("New line", counter)
		line := scanner.Text()

		shift(&buffer, line)

		sum += get_sum(buffer)

		counter += 1
	}

	fmt.Println("New line")

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

				if last_symbol_pos < 0 {
					fmt.Println(" Discarded number: " + number_buffer)
				} else {
					if len(number_buffer)+1 >= last_symbol_pos {
						val, _ := strconv.Atoi(number_buffer)

						fmt.Println(" Found number: " + number_buffer)

						sum += val
					} else {
						fmt.Println(" Discarded number: " + number_buffer)
					}
				}

				above_line := ""
				this_line := ""
				below_line := ""

				begin := i - len(number_buffer) - 1
				end := i + 1

				if end > len(lines[1]) {
					end = len(lines[1]) - 1
				}

				if begin < 0 {
					begin = 0
				}

				if len(lines[0]) > 0 {
					above_line = lines[0][begin:end]
				}

				this_line = lines[1][begin:end]

				if len(lines[2]) > 0 {
					below_line = lines[2][begin:end]
				}

				fmt.Println("  " + above_line)
				fmt.Println("  " + this_line)
				fmt.Println("  " + below_line)

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
		if last_symbol_pos < 0 {
			fmt.Println(" Discarded number: " + number_buffer)
		} else {
			if len(number_buffer) >= last_symbol_pos {
				val, _ := strconv.Atoi(number_buffer)

				fmt.Println(" Found number: " + number_buffer)

				sum += val
			} else {
				fmt.Println(" Discarded number: " + number_buffer)
			}
		}
	}

	return sum

}

func is_symbol(c byte) bool {
	return !unicode.IsDigit(rune(c)) && c != '.'
}
