const input = Bun.file("input")

var txt = await input.text()
var lines = txt.split("\n")

var sum = 0

for (const li in lines) {
    const line = lines[li]

    const matches = [...line.matchAll(/mul\(([0-9]{1,3}),([0-9]{1,3})\)/g)]
    
    for(const i in matches) {
        var match = matches[i]

        sum += match[1] * match[2]
    }
}

console.log(sum)