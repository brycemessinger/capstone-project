// setting everything up with naming and styling
class GridSystem {
	constructor(matrix, playerX, playerY) {
		this.matrix = matrix;
		this.uiContext = this.#getContext(420, 580, "transparent");
		this.outlineContext = this.#getContext(0, 0, "#444");
		this.topContext = this.#getContext(0, 0, "#111", true);
		this.cellSize = 40;
		this.padding = 0;
		this.player = { x: playerX, y: playerY, color: "red" };
        this.outlineBlock = {color: "brown"}
        this.questionMarkBlock = {color: "yellow"}
        this.structureBlock = {color: "orange"}
        this.mushroom = {color: "purple"}
        this.koopa = {color: "#81D510"}
        this.brickBlock = {color: "#3C1518"}
        this.pipe = {color: "green"}
        this.coin = {color: "gold"}
        this.toad = {color: "white"}

		this.matrix[playerY][playerX] = 2;

		document.addEventListener("keydown", this.#movePlayer);
	}
// lines 26 - 72 for player movement
	#isValidMove(x, y) {
		if (this.matrix[this.player.y + y][this.player.x + x] === 0) {
			return true;
		}
		return false;
	}

	#updateMatrix(y, x, val) {
		this.matrix[y][x] = val;
	}

    // player movement
	#movePlayer = ( { keyCode } ) => {
		if (keyCode === 37) {
            // left key
			if (this.#isValidMove(-1, 0)) {
			 this.#updateMatrix(this.player.y, this.player.x, 0)
			 this.#updateMatrix(this.player.y, this.player.x - 1, 2)
			 this.player.x --
			 this.render()
		 }
		} else if (keyCode === 39) {
            // right key
			if (this.#isValidMove(1, 0)) {
				this.#updateMatrix(this.player.y, this.player.x, 0)
 			 	this.#updateMatrix(this.player.y, this.player.x + 1, 2)
				this.player.x ++
				this.render()
			}
		} else if (keyCode === 38) {
            // up key
			if (this.#isValidMove(0, -1)) {
				this.#updateMatrix(this.player.y, this.player.x, 0)
 			 	this.#updateMatrix(this.player.y - 1, this.player.x, 2)
				this.player.y --
				this.render()
			}
		} else if (keyCode === 40) {
            // down key
			if (this.#isValidMove(0, 1)) {
				this.#updateMatrix(this.player.y, this.player.x, 0)
 			 	this.#updateMatrix(this.player.y + 1, this.player.x, 2)
				this.player.y ++
				this.render()
			}
		}
	}
// setting up rules for the canvas and cells
    #getCenter(w, h){
        return{
            x: window.innerWidth / 2 - w / 2 + "px",
            y: window.innerHeight / 2 - h / 2 + "px"
        }
    }

	#getContext(w, h, color = "#111", isTransparent = false) {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width = w;
        this.height = this.canvas.height = h;
        this.canvas.style.position = "absolute";
        this.canvas.style.background = color;
        if (isTransparent) {
            this.canvas.style.backgroundColor = "transparent"
        }
        const center = this.#getCenter(w, h)
        this.canvas.style.marginLeft = center.x
        this.canvas.style.marginTop = center.y
        document.body.appendChild(this.canvas);

        return this.context;
    }

    render(){
        const w = (this.cellSize + this.padding) * this.matrix[0].length - (this.padding)
        const h = (this.cellSize + this.padding) * this.matrix.length - (this.padding)
        
		this.outlineContext.canvas.width = w;
		this.outlineContext.canvas.height = h;

        const center = this.#getCenter(w, h);
		this.outlineContext.canvas.style.marginLeft = center.x
		this.outlineContext.canvas.style.marginTop = center.y;

		this.topContext.canvas.style.marginLeft = center.x
		this.topContext.canvas.style.marginTop = center.y;

        for(let row = 0; row < this.matrix.length; row++){
            for(let col = 0; col < this.matrix[row].length; col++){
                const cellVal = this.matrix[row][col];
                let color = "#8b8ff2"
                
                if (cellVal === 1) {
					color = "#8b8ff2";
				} else if (cellVal === 2) {
					color = this.player.color;
				} else if (cellVal === 3) {
                    color = this.outlineBlock.color
				} else if (cellVal === 4) {
                    color = this.questionMarkBlock.color
				} else if (cellVal === 5) {
                    color = this.structureBlock.color
				} else if (cellVal === 6) {
                    color = this.koopa.color
                } else if (cellVal === 7) {
                    color = this.mushroom.color
                } else if (cellVal === 8) {
                    color = this.brickBlock.color
                } else if (cellVal === 9) {
                    color = this.pipe.color
                } else if (cellVal === 10) {
                    color = this.coin.color
                } else if (cellVal === 11) {
                    color = this.toad.color
                }


                this.outlineContext.fillStyle = color
                this.outlineContext.fillRect(col * (this.cellSize + this.padding),
                row * (this.cellSize + this.padding),
                this.cellSize, this.cellSize);
            }
        }
// useless unles uiContext made to not be transparent
        this.uiContext.font = "20px Courier";
        this.uiContext.fillStyle = "white";
        this.uiContext.fillText("Super Mario Legal Advice", 20, 20);
        
    }
}

// const tileset = null, tilesetURL = "tileset.png", tilesetLoaded = false;

// var tileTypes = {
// 	0 : { colour:"#685b48", floor:floorTypes.solid, sprite:[{x:0,y:0,w:40,h:40}]	},
// 	1 : { colour:"#5aa457", floor:floorTypes.path,	sprite:[{x:40,y:0,w:40,h:40}]	},
// 	2 : { colour:"#e8bd7a", floor:floorTypes.path,	sprite:[{x:80,y:0,w:40,h:40}]	},
// 	3 : { colour:"#286625", floor:floorTypes.solid,	sprite:[{x:120,y:0,w:40,h:40}]	},
// 	4 : { colour:"#678fd9", floor:floorTypes.water,	sprite:[{x:160,y:0,w:40,h:40}]	}
// };

const gridMatrix = [
    // first screen
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,8,4,8,4,8,0,0,0,0,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,0,0,0,0,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,0,0,0,0,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,0,6,0,0,9,9,0,0,0,0,11,0,11,0,0,0,0,0,6,0,0,6,0,0],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],

    // second screen
    // [,
    // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0,0,0,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,9,9,0,0,0,0,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,9,9,0,0,0,0,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,9,9,0,6,0,0,9,9,0,0,0,0,11,0,11,0,0,0,0,0,6,0,0,6,0,0],
    // [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    // [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],

    // final screen
    // [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,0,0,0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,8,8,8,0,0,0,0,0,0,0,0,0,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,0,0,9,9,9,9,0,9,9,9,9,0],
    // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,0,0,0,9,9,0,0,0,9,9,0,0],
    // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,0,0,0,9,9,0,0,0,9,9,0,0],
    // [3,3,3,3,3,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    // [3,3,3,3,3,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
];

// calling upon the grid system and rendering it
const gridSystem = new GridSystem(gridMatrix, 2, 11,);
gridSystem.render();