const input = Bun.file("input")

var txt = await input.text()
var lines = txt.split("\n")

var sum = 0
var enabled = true

for (const li in lines) {
    const line = lines[li]

    const matches = [...line.matchAll(/mul\(([0-9]{1,3}),([0-9]{1,3})\)|do\(\)|don't\(\)/g)]

    console.log(matches)

    for(const i in matches) {
        var match = matches[i]

        if(match[0] == "do()") {
            enabled = true
            continue
        }

        if(match[0] == "don't()") {
            enabled = false
            continue
        }

        if(enabled) {
            sum += match[1] * match[2]
        }
    }
}

console.log(sum)