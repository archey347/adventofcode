const input = Bun.file("input")

var txt = await input.text()
var lines = txt.split("\n")

var sum = 0

var directions = ["^", ">", "V", "<"];

// (dx, dy)
var transforms = {
    "^": [0, -1],
    ">": [1, 0],
    "V": [0, 1],
    "<": [-1, 0],
}

var pos = null
var direction = null

var visited = {}
var count = 0
var extra = {}
var map = []

function rotate(direction) {
    return directions[(directions.indexOf(direction) + 1) % 4]
}

function outsideMap(nextPos) {
    const width = map[0].length
    const height = map.length
    
    if (nextPos[0] < 0 || width <= nextPos[0]) {
        return true
    }
    if (nextPos[1] < 0 || height <= nextPos[1]) {
        return true
    }

    return false
}

function getNewPos(pos, direction) {
    const t = transforms[direction]
    return [pos[0] + t[0], pos[1] + t[1]]
}

function addExtra(pos) {
    var x = pos[0]
    var y = pos[1]

    if (extra[y] === undefined) {
        extra[y] = {}
    }

    if(extra[y][x] === undefined) {
        extra[y][x] = 1
        count += 1
    }
}

function visit(pos, direction) {
    var x = pos[0]
    var y = pos[1]

    if (visited[y] === undefined) {
        visited[y] = {}
    }

    if(visited[y][x] === undefined) {
        visited[y][x] = {}
    }

    visited[y][x][direction] = 1
}

function hasVisited(pos, direction) {
    var x = pos[0]
    var y = pos[1]

    if (visited[y] === undefined) {
        return false
    }

    if(visited[y][x] === undefined) {
        return false
    }
    
    return visited[y][x][direction] == 1
}

function drawMap() {
    for (const y in lines) {
        const line = lines[y]
        var out = ""
        for(const x in line) {
            const c = line[x]
            if (pos[0] == x && pos[1] == y) {
                out += direction
            } else {
                out += line[x]
            }
        }
        console.log(out)
    }
}
 
for (const li in lines) {
    var line = lines[li]

    var out = ""

    for(const ci in line) {
        const c = line[ci]

        if (directions.includes(c)) {
            direction = c
            pos = [Number(ci), Number(li)]
            out += "."
        } else {
            out += c
        }
    }

    map.push(out)
}



while(true) {
    visit(pos, direction)

    // mv to next position
    var nextPos = getNewPos(pos, direction)
    
    // Check if outside boundaries so we can exit
    if(outsideMap(nextPos)) {
        break
    }

    var map_here = map[nextPos[1]][nextPos[0]]

    if (map_here == "#") {
        // We can't move here, we need to rotate in situ
        direction = rotate(direction)
        continue
    }
    
    // Speculate what adding an obstacle to newPos will do
    var spec_direction = rotate(direction)
    var spec_pos = [pos[0], pos[1]]
    console.log("start spec for", nextPos)
    var steps = 0
    while(true) {
        if(hasVisited(spec_pos, spec_direction)) {
            addExtra(nextPos)
            break
        }

        var new_spec_pos = getNewPos(spec_pos, spec_direction)

        if(outsideMap(new_spec_pos)) {
            break
        }

        var spec_map_here = map[new_spec_pos[1]][new_spec_pos[0]]
        if (spec_map_here == "#") {
            spec_direction = rotate(spec_direction)
            continue
        }

        spec_pos = new_spec_pos
        steps += 1

        // Hacky way of stopping infinite loops
        if (steps > (map.length*2)+(map[0].length*2)+10) {
            break
        }
    }

    // Move there
    pos = nextPos
}

console.log(count)
