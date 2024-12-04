const input = Bun.file("input")

var txt = await input.text()
var lines = txt.split("\n")

function is_x_mas(lines, x, y) {
    if(lines[y][x] != "A") {
        return 0
    }
    
   // array(array(dx,dy))
    const transforms = [
        [1,   1],  // Forwards, Up   /'
        [1,  -1],  // Forwards, Down \.
        [-1,  1],  // Backwards, Up  '\
        [-1, -1],  // Backwards Down ./
    ] 

    var count_m = 0
    var count_s = 0

    for(const ti in transforms) {
        var T = transforms[ti]

        var look_x = Number(x) + T[0]
        var look_y = Number(y) + T[1]

        var opp_x = Number(x) - T[0]
        var opp_y = Number(y) - T[1]

        var line = lines[look_y]
        if(line === undefined) {
            return 0
        }

        var c = line[look_x]
        if(c == undefined) {
            return 0
        }

        var o_line = lines[opp_y]
        if(o_line === undefined) {
            return 0
        }

        var o_c    = o_line[opp_x]
        if(o_c === undefined) {
            return 0
        }

        if(o_c == c) {
            return 0
        }

        if(c == "M") {
            count_m += 1
        }

        if(c == "S") {
            count_s += 1
        }
    }

    if(count_m != 2) {
        return 0
    }

    if(count_s != 2) {
        return 0
    }

    return 1
}

var sum = 0

for (const y in lines) {
    const line = lines[y]

    for(const x in line) {
        sum += is_x_mas(lines, x, y)
    }
}

console.log(sum)