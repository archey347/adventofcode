const input = Bun.file("input")

var txt = await input.text()
var lines = txt.split("\n")

var pass_count = 0

function doesPass(numbers) {
    var pass = 1
    var cmp = undefined

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

        if(cmp !== undefined) {
            if(cmp != a > b) {
                pass = 0
                break
            }
        }

        cmp = a > b
    }

    return (pass == 1)
}

for (const li in lines) {
    const line = lines[li]

    const numbers = line.split(" ")    

    if (doesPass(numbers)) {
        pass_count += 1
        continue
    }

    for(const i in numbers) {
        const tmp = numbers.slice()

        tmp.splice(i, 1)

        if(doesPass(tmp)) {
            pass_count += 1
            break
        }
    }    
}

console.log(pass_count)