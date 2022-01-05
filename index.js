// const express = require('express')
// const path = require('path')
// const app = express()

// app.use(express.json())

// app.get('/',function(req,res) {
//     res.sendFile(path.join(__dirname, '../index.html'));
//   });

// app.listen(4050, () => console.log('Server is running on port 4050'))



// setting everything up with naming and styling
let fines = 0
let jailtime = 0
let firsttimetheft = 0
let firsttimevandalism = 0
let firsttimeanimalabuse = 0
let firsttimehomocide = 0

// sound effects
var brickBlockAudio = new Audio('smb_breakblock.wav');
var getCoinAudio = new Audio('smb_coin.wav');
var stompAudio = new Audio('smb_stomp.wav');
var pipeAudio = new Audio('smb_pipe.wav');

// audio.play()


// legal advice triggers
let theftText = () => {
    if (firsttimetheft === 1){
        confirm("Ow! Its me, Mark Question! Theft is illegal in every state including the Mushroom kingdom. While scope of the punishment and penalties depends on the scope of the crime (first, second, and third degrees) you just stole a gold coin well over a kilogram in weight, meaning you get a $20,000 fine and up to 10 years in jail! You robbed me of my money, now the system will rob you of your freedom.")
    }
}
let vandalismText = () => { 
    if (firsttimevandalism === 1) {
        confirm("Watch it buddy! Its me, Brick Block Jacque! Destruction of public property and infrastructure can be charged either as a misdemeanor or a felony. Misdemeanor charges are punishable by up to 180 days jailtime and $1000, and felony charges are punishable by up to 10 years in prison and $5,000 + restitution. In this case, you will be charged with a misdemeanor. May you step on legos each step for the rest of your life.")
    }
}
let animalAbuseText = () => {
    if (firsttimeanimalabuse === 1) {
        window.confirm("Ouch! Its me, Kooper! Animal cruelty penalties differ on the state level. In States such as Vermont and California, the penalties are indescriminate about whether you overworked/neglected an animal or whether you maimed or killed an animal. Fines are up to $20,000 and 1 year of jail time. It's unfortunate for you the Mushroom Kingdom is in Vermont")
    }
}
let homocideText = () => {
    if (firsttimehomocide === 1) {
        window.confirm("Oof! Its me, toad! What do you mean 'just toad'? Its ghost toad to you now. Homocide is among the most serious of crimes. In States like Utah and Tennessee, second degree murder can land you in prison for 5-40 years, First Degree Murder without aggravation will land you life in prison. Murder in the first degree with aggravation may land you a death penalty! Even when you aren't below the streets cleaning pipes, your life is still a sewer, bub.")
    }
}
// framework for the grid system environment
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
        this.toad = {color: "white"}
       
        
        const tileset = null, tilesetURL = "tileset.png", tilesetLoaded = false;
        this.sprites = {}
        const tileTypes = {
            0 : { colour:"#685b48", sprite:[{x:0,y:0,w:40,h:40}]	},
            1 : { colour:"#5aa457", sprite:[{x:40,y:0,w:40,h:40}]	},
            2 : { colour:"#e8bd7a", sprite:[{x:80,y:0,w:40,h:40}]	},
            3 : { colour:"#286625", sprite:[{x:120,y:0,w:40,h:40}]	},
            4 : { colour:"#678fd9", sprite:[{x:160,y:0,w:40,h:40}]	}
        };

		this.matrix[playerY][playerX] = 2;

		document.addEventListener("keydown", this.#movePlayer);
	}
// player movement
	#isValidMove(x, y) {
		if (this.matrix[this.player.y + y][this.player.x + x] === 0) {
			return true;
		}else if (this.matrix[this.player.y + y][this.player.x + x] === 4){
            console.log("? block hit!")
            fines += 20000
            jailtime += 10
            theftText(firsttimetheft += 1)
            getCoinAudio.play()
            console.log(fines, jailtime, firsttimetheft)
            this.matrix[this.player.y + y][this.player.x + x] = 12
		}else if (this.matrix[this.player.y + y][this.player.x + x] === 8){
            this.render()
            console.log("brick block hit!")
            fines += 1500
            jailtime += 1
            brickBlockAudio.play()
            vandalismText(firsttimevandalism += 1)
            console.log(fines, firsttimevandalism)
            this.matrix[this.player.y + y][this.player.x + x] = 0
		}else if(this.matrix[this.player.y + y][this.player.x + x] === 6){
            console.log("Koopa Stomped!")
            fines += 20000
            jailtime += 1
            stompAudio.play()
            animalAbuseText(firsttimeanimalabuse += 1)
            console.log(fines, jailtime)
            this.matrix[this.player.y + y][this.player.x + x] = 0
        }else if (this.matrix[this.player.y + y][this.player.x + x] === 11){
            console.log("toad slain!")
            jailtime += 40
            stompAudio.play()
            homocideText(firsttimehomocide += 1)
            console.log(fines, jailtime)
            this.matrix[this.player.y + y][this.player.x + x] = 0
        }else if (this.matrix[this.player.y + y][this.player.x + x] === 25){
            pipeAudio.play()
            console.log("bad ending chosen")
            confirm(`Stop right there! Running from the law is never a good idea. Because you ran, additional charges against you have been filed and no plea deal has been offered. You have accumulated $ ${fines} in fines and ${jailtime} years in prison`)
            location.href = "score-page.html";
            
        }else if (this.matrix[this.player.y + y][this.player.x + x] === 26) {
            fines *= .8
            jailtime *= .8
            pipeAudio.play()
            console.log("less bad ending")
            confirm(`You have decided to enter into a plea deal. Because of your ability to refrain from any further unruly behavior in the courthouse, the judge has also been slightly more lenient than he would have otherwise been. You have accumulated $ ${fines} in fines and ${jailtime} years in prison.`)
            location.href = "score-page.html";

        }
        if (this.matrix[this.player.y + y][this.player.x + x] === 15){
            console.log("change screen!")
            const gridSystem2 = new GridSystem(gridMatrix2, 0, 11);
            gridSystem2.render()
            this.matrix[this.player.y + y][this.player.x + x] = 3
            this.#updateMatrix(this.player.y - 1, this.player.x + 1,  3)
            this.#updateMatrix(this.player.y - 1, this.player.x,  3)
            this.#updateMatrix(this.player.y + 1, this.player.x - 1,  3)
            this.#updateMatrix(this.player.y + 1, this.player.x,  3)
            this.#updateMatrix(this.player.y, this.player.x - 1,  3)

        }
        if (this.matrix[this.player.y + y][this.player.x + x] === 16){
            console.log("change screen!")
            const gridSystem3 = new GridSystem(gridMatrix3, 0, 11);
            gridSystem3.render()      
            this.matrix[this.player.y + y][this.player.x + x] = 3
            this.#updateMatrix(this.player.y - 1, this.player.x + 1,  3)
            this.#updateMatrix(this.player.y - 1, this.player.x,  3)
            this.#updateMatrix(this.player.y + 1, this.player.x - 1,  3)
            this.#updateMatrix(this.player.y + 1, this.player.x,  3)
            this.#updateMatrix(this.player.y, this.player.x - 1,  3)
;
        }else{
		return false;
        }
	}

	#updateMatrix(y, x, val) {
		this.matrix[y][x] = val;
	}

    // player movement (asdw)
	#movePlayer = ( { keyCode } ) => {
		if (keyCode === 65) {
            // left key
			if (this.#isValidMove(-1, 0)) {
			 this.#updateMatrix(this.player.y, this.player.x, 0)
			 this.#updateMatrix(this.player.y, this.player.x - 1, 2)
			 this.player.x --
			 this.render()
             
		 }
		} else if (keyCode === 68) {
            // right key
			if (this.#isValidMove(1, 0)) {
				this.#updateMatrix(this.player.y, this.player.x, 0)
 			 	this.#updateMatrix(this.player.y, this.player.x + 1, 2)
				this.player.x ++
				this.render()
		
                
            }
		} else if (keyCode === 87) {
            // up key
			if (this.#isValidMove(0, -1)) {
				this.#updateMatrix(this.player.y, this.player.x, 0)
 			 	this.#updateMatrix(this.player.y - 1, this.player.x, 2)
				this.player.y --
				this.render()
			}
		} else if (keyCode === 83) {
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
                
                if (cellVal === 15) {
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
                } else if (cellVal === 16) {
                    color = "#8b8ff2"
                } else if (cellVal === 12) {
                    color = "#DCEAB2"
                }else if (cellVal === 25) {
                    color = this.pipe.color
                }else if (cellVal === 26) {
                    color = this.pipe.color
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




const gridMatrix = [
    // first screen
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15],
    [3,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,15],
    [3,0,0,0,0,0,0,8,4,8,4,8,0,0,0,9,9,9,9,0,0,0,0,0,0,0,0,0,0,0,0,15],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,15],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,0,0,0,6,0,0,0,0,0,0,11,0,0,15],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,3,3,3,3,3,3],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,3,3,3,3,3,3],
];
    
const gridMatrix2 = [
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,8,8,8,0,0,0,0,0,16],
    [0,0,0,0,0,0,0,0,0,0,0,0,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16],
    [0,0,0,0,0,0,9,9,0,0,0,0,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16],
    [0,0,0,0,0,0,9,9,0,0,0,0,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16],
    [0,0,0,0,0,0,9,9,0,6,0,0,9,9,0,0,0,0,11,0,11,0,0,0,0,0,6,0,0,6,0,16],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
];
const gridMatrix3 = [
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [0,0,0,0,0,8,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [0,0,0,0,0,0,0,0,0,0,0,8,8,8,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,3],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,0,0,0,0,0,0,0,0,0,0,0,3],
    [0,0,0,0,0,8,8,8,0,0,0,0,0,0,0,0,0,5,5,5,0,0,0,0,0,0,0,0,0,0,0,3],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,0,0,9,25,25,9,0,9,26,26,9,3],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,0,0,0,9,9,0,0,0,9,9,0,3],
    [0,0,0,0,0,0,0,0,0,11,0,0,6,0,5,5,5,5,5,5,0,0,0,9,9,0,0,0,9,9,0,3],
    [3,3,3,3,3,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [3,3,3,3,3,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
];

// calling upon the grid system and rendering it
const gridSystem = new GridSystem(gridMatrix, 2, 11,);


gridSystem.render();
// 31 across