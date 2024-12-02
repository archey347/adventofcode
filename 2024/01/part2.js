const input = Bun.file("input")

var txt = await input.text()
var lines = txt.split("\n")

var A = {}
var B = {}

function updateCount(count, number) {
    if (count[number] === undefined) {
        count[number] = 1
        return
    }

    count[number]++
}

for (const li in lines) {
    const line = lines[li]

    var numbers = line.split("   ")
    
    var a = numbers[0]
    var b = numbers[1]

    updateCount(A, a)
    updateCount(B, b)
}

var sum = 0

for(var a in A) {

    function getN(list, number) {
        if (list[number] !== undefined) {
            return list[number]
        }

        return 0
    }

    sum += a * getN(A, a) * getN(B, a)
}

console.log(sum)
