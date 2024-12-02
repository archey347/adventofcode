const input = Bun.file("input")

var txt = await input.text()
var lines = txt.split("\n")

var pass_count = 0

for (const li in lines) {
    const line = lines[li]

    const numbers = line.split(" ")

    var pass = 1
    var cmp = undefined

    console.log(numbers)

    for (const ai in numbers) {
        const bi = Number(ai) + 1
        if (numbers.length == bi) {
            break
        }

        const a = Number(numbers[ai])
        const b = Number(numbers[bi])
        
        if (a == b) {
            pass = 0
            break
        }

        if (Math.abs(a - b) > 3) {
            pass = 0
            break
        }

        console.log(a, b, cmp, a > b)

        if(cmp !== undefined) {
            if(cmp != a > b) {
                pass = 0
                break
            }
        }

        cmp = a > b
    }

    pass_count += pass
}

console.log(pass_count)