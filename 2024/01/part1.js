const input = Bun.file("input")

var txt = await input.text()
var lines = txt.split("\n")


var A = []
var B = []

function orderedInsert(list, item) {
    if (list.length == 0) {
        list[0] = item
        return
    }
    
    for(const i in list) {
        if (item < list[i]) {
            list.splice(i, 0, item)
            return
        }
    }
    
    list.push(item)
}

for (const li in lines) {
    const line = lines[li]

    var numbers = line.split("   ")
    
    var a = numbers[0]
    var b = numbers[1]

    orderedInsert(A, a)
    orderedInsert(B, b)
}

var sum = 0
for (const i in lines) {
    var diff = A[i] - B[i]

    // We only care about magnitude
    if (diff < 0) {
        diff = 0 - diff
    }

    sum += diff
}

console.log(sum)
