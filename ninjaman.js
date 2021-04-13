var lives = 3;
var score = 0;
var world = [];
var worldX = 30;
var worldY = 15;
let dx = 0;
let dy = 0;

function randomNumZeroThree() {
    var num = Math.random() * 4;
    num = Math.floor(num);
    return num;
}

for (var i = 0; i < worldY; i++) {
    world.push([]);
    for (var ii = 0; ii < worldX; ii++) {
        if (i == 0 || i == (worldY - 1) || ii == 0 || ii == worldX - 1 ) {
            world[i][ii] = 1;
        } else {
            world[i][ii] = randomNumZeroThree();
        }
    }
}

function drawWorld(){

worldDict = {
    0: 'blank',
    1: 'wall',
    2: 'sushi',
    3: 'onigiri'
};

output = "";

for (var row = 0; row < world.length; row++) {
    output += "<div class='row'>";
    for (var i = 0; i < world[row].length; i++) {
        output += "<div class = '";
        output += worldDict[world[row][i]]+"'></div>";
    }
    output += "</div>"; 
}
document.getElementById('world').innerHTML = output;
}

drawWorld();

var ninjaman = {
    x: 1,
    y: 1
}

function drawNinjaman(){
    document.getElementById('ninjaman').style.top = 
        ninjaman.y * 40 + 'px';
    document.getElementById('ninjaman').style.left = 
        ninjaman.x * 40 + 'px';
    document.getElementById('score').innerHTML =
        "Score: "+ score + " " + "Lives: " + lives; 
}

drawNinjaman();

var ghosts = {
    red : {
        x:3,
        y:6
    },
    bluey : {
        x:10,
        y:5
    },
    pinky : {
        x:20,
        y:10
    },
    pumpky : {
        x:25,
        y:7
    },
    scaredy : {
        x:18,
        y:3
    }
}

function drawGhost(ghost) {
    document.getElementById(ghost).style.top = 
        ghosts[ghost].y * 40 + 'px';
    document.getElementById(ghost).style.left = 
        ghosts[ghost].x * 40 + 'px';
}

drawGhost('red');
drawGhost('bluey');
drawGhost('pinky');
drawGhost('pumpky');
drawGhost('scaredy');

function keepIn(obj,coor,move){
    if (coor == "x") {
        if (world[obj.y][obj.x + move] != 1) obj.x += move;
    }
    if (coor == "y") {
        if (world[obj.y + move][obj.x] != 1) obj.y += move;
    }
}

document.onkeydown = function(e){
    if(e.keyCode == 37) {
        keepIn(ninjaman, "x", -1);
        //keepIn(red, "x", -1);
    }

    if(e.keyCode == 39) {
        keepIn(ninjaman, 'x', 1);
        //keepIn(red, "x", 1);
    }

    if(e.keyCode == 38) {
        keepIn(ninjaman, "y", -1); 
        //keepIn(red, "y", -1);
    }
    if(e.keyCode == 40) {
        keepIn(ninjaman, 'y', 1);
        //keepIn(red, "y", 1);
    }

    if (world[ninjaman.y][ninjaman.x] == 2) {
        score += 2;
    } else if (world[ninjaman.y][ninjaman.x] == 3) {
        score += 1;
    }

        
    world[ninjaman.y][ninjaman.x] = 0;

    drawNinjaman();
    drawGhost('red');
    drawWorld();
}

function chase(ghost) {
    dx = ninjaman.x -  ghosts[ghost].x;
    dy = ninjaman.y -  ghosts[ghost].y;
    if (dx > 0 ) {
        if (world[ghosts[ghost].y][ghosts.red.x + 1] != 1) {
            ghosts[ghost].x++;
        }
    } else if ( dx < 0) {
        if (world[ghosts[ghost].y][ghosts[ghost].x - 1] != 1) {
            ghosts[ghost].x--;
        }
    }

    if (dy > 0 ) {
        if (world[ghosts[ghost].y + 1][ghosts[ghost].x] != 1) {
            ghosts[ghost].y++;
        }
    } else if(dy < 0) {
        if (world[ghosts[ghost].y - 1][ghosts[ghost].x] != 1) {
            ghosts[ghost].y--
        }
    }

    if (ninjaman.x ==  ghosts[ghost].x && ninjaman.y ==  ghosts[ghost].y) {
        if (lives == 1) {
            lives = 0;
            for (var i = 0; i <worldY; i++) {
                for (var ii = 0; ii < worldX; ii++) {
                    world[i][ii] = 0;
                }
            }
            document.getElementById('ninjaman').style.display = 
                'none';
            document.getElementById(ghost).style.display = 
                'none';
            drawWorld();
            clearInterval(x);
        } 
        else {
            lives--;
            ninjaman = {x:1, y:1};
            ghosts = {
                red : {
                    x:3,
                    y:6
                },
                bluey : {
                    x:10,
                    y:5
                },
                pinky : {
                    x:20,
                    y:10
                },
                pumpky : {
                    x:25,
                    y:7
                },
                scaredy : {
                    x:18,
                    y:3
                }
            }
        }
    }
    drawNinjaman();
    drawGhost(ghost);
    drawWorld();
}

var x = setInterval(function() {
    chase('red');
    chase('bluey');
    chase('pinky');
    chase('pumpky');
    chase('scaredy');  
}, 1000);
