const input = Bun.file("input")

var txt = await input.text()
var lines = txt.split("\n")

var rules = {}

var header = true

var sum = 0

for (const li in lines) {
    const line = lines[li]

    if(line == "") {
        header = false
        continue
    }

    if(header) {
        var numbers = line.split("|")
        const X = Number(numbers[0])
        const Y = Number(numbers[1])

        if(rules[X] === undefined) {
            rules[X] = {}
        }

        rules[X][Y] = 1
        continue
    }

    var pages = line.split(",")
    var smallerThanCurrent = []

    var ordered = true

    for(const pi in pages) {
        var y = Number(pages[pi])

        for(const i in smallerThanCurrent) {
            const x = smallerThanCurrent[i]

            if(rules[y] !== undefined) {
                if (rules[y][x] !== undefined) {
                    ordered = false
                    break
                }
            }
        }

        if(!ordered) {
            break
        }

        smallerThanCurrent.push(y)
    }

    if(ordered) {
        var middle = Number(pages[Math.floor(pages.length / 2)])

        sum += middle
    }
} 

console.log(sum)