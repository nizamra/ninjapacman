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
            };
        }
    }
    drawNinjaman();
    drawGhost(ghost);
    drawWorld();
}