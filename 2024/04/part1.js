const input = Bun.file("input")

var txt = await input.text()
var lines = txt.split("\n")

const pattern = "XMAS"

function getLocalCount(lines, pattern, x, y) {
    if(lines[y][x] != pattern[0]) {
        return 0
    }
    
   // array(array(dx,dy))
    const transforms = [
        [1,   0],  // Forwards       ->
        [-1,  0],  // Backwards      <-
        [0,   1],  // Up             |'
        [0,  -1],  // Down           |.
        [1,   1],  // Forwards, Up   /'
        [1,  -1],  // Forwards, Down \.
        [-1,  1],  // Backwards, Up  '\
        [-1, -1],  // Backwards Down ./
    ] 

    var match_count = 0

    for (const ti in transforms) {
        var T = transforms[ti]

        var found = true
        for(const ci in pattern) {
            if(ci == 0) {
                // We've already checked the first
                continue
            }

            var look_x = Number(x) + (T[0] * ci)
            var look_y = Number(y) + (T[1] * ci)

            if(outsideBounds(lines, x, y)) {
                found = false
                break
            }

            var c = pattern[ci]

            var line = lines[look_y]

            if(line === undefined) {
                found = false
                break
            }

            var c_cmp = line[look_x]

            if(c_cmp === undefined) {
                found = false
                break
            }

            if(c_cmp != c) {
                found = false
                break
            }
        }

        if(found) {
            match_count += 1
        }
    }

    return match_count
}

var sum = 0

for (const y in lines) {
    const line = lines[y]

    for(const x in line) {
        sum += getLocalCount(lines, pattern, x, y)
    }
}

console.log(sum)