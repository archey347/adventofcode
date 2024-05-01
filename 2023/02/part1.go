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

	colours := map[string]int{
		"red":   12,
		"green": 13,
		"blue":  14,
	}

	sum := 0

	for scanner.Scan() {
		line := scanner.Text()

		game := strings.Split(line, ": ")

		collections := strings.Split(game[1], "; ")

		pass := true

		for _, collection := range collections {
			counts := strings.Split(collection, ", ")

			for _, count := range counts {
				data := strings.Split(count, " ")

				count, _ := strconv.Atoi(data[0])
				colour := data[1]

				if count > colours[colour] {
					pass = false
					break
				}

			}

			if !pass {
				break
			}

		}

		if pass {
			game_data := strings.Split(game[0], " ")
			val, _ := strconv.Atoi(game_data[1])
			sum += val
		}

	}

	fmt.Println(sum)
}
