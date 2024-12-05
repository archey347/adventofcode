const input = Bun.file("input")

var txt = await input.text()
var lines = txt.split("\n")

var rules = {}

var header = true

var sum = 0

var incorrect = []

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

    if(!ordered) {
        incorrect.push(pages)
    }
} 

for(const pi in incorrect) {
    var pages = incorrect[pi]

    var ordered = []

    for(const i in pages) {
        var x = pages[i]

        if(ordered.length == 0) {
            ordered.push(x)
            continue
        }

        var inserted = false

        for(const insert_i in ordered) {
            var can_insert = true

            for(var y_i = insert_i; y_i < ordered.length; y_i++) {
                var y = ordered[y_i]

                if(rules[y] !== undefined) {
                    if (rules[y][x] !== undefined) {
                        can_insert = false
                        break
                    }
                }
            }

            if(can_insert) {
                ordered.splice(insert_i, 0, x)
                inserted = true
                break
            }
        }

        if(!inserted) {
            ordered.push(x)
        }
    }

    var middle = Number(ordered[Math.floor(ordered.length / 2)])
    sum += middle
}

console.log(sum)