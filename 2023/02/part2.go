package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	sum := 0

	for scanner.Scan() {
		line := scanner.Text()

		game := strings.Split(line, ": ")

		collections := strings.Split(game[1], "; ")

		colours := map[string]int{
			"red":   0,
			"green": 0,
			"blue":  0,
		}

		for _, collection := range collections {
			counts := strings.Split(collection, ", ")

			for _, count := range counts {
				data := strings.Split(count, " ")

				count, _ := strconv.Atoi(data[0])
				colour := data[1]

				if colours[colour] == 0 || colours[colour] < count {
					colours[colour] = count
				}
			}
		}

		power := colours["red"] * colours["blue"] * colours["green"]

		sum += power
	}

	fmt.Println(sum)
}
