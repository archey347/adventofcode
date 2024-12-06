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

function rotate() {
    direction = directions[(directions.indexOf(direction) + 1) % 4]
}

function visit(pos) {
    var x = pos[0]
    var y = pos[1]

    if (visited[y] === undefined) {
        visited[y] = {}
    }

    if(visited[y][x] === undefined) {
        visited[y][x] = 1
        count += 1
    }
}

var map = []

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

const width = map[0].length
const height = map.length

while(true) {
    var t = transforms[direction]

    // mv to next position
    var nextPos = [pos[0] + t[0], pos[1] + t[1]]
    
    // Check if outside boundaries so we can exit
    if (nextPos[0] < 0 || width <= nextPos[0]) {
        break
    }
    if (nextPos[1] < 0 || height <= nextPos[1]) {
        break
    }

    var map_here = map[nextPos[1]][nextPos[0]]

    if (map_here == "#") {
        // We can't move here, we need to rotate in situ
        rotate()
        continue
    }

    // Move there
    pos = nextPos
    visit(pos)
}

console.log(count)
