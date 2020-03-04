const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const img = document.getElementById('Image');

//--------------------------------------
function getMousePosition(event) {
    let rect = canvas.getBoundingClientRect(); 
    let xn = event.clientX - rect.left; 
    let yn = event.clientY - rect.top;
    return [xn, yn];
}

const pos = canvas.addEventListener("mousedown", event => {
    boxs[0].movingRect(event);
});
//--------------------------------------

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}


class Ball {
    constructor(x, y,velX, velY, color) {
        this.x = 580;
        this.y = 250;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.width = 150;
        this.height = 150;
    }
    
    collisionDetect() {
        let sizeN = this.width * this.height;
        for (let j = 0; j < alls.length; j++) {
            if (!(this === alls[j])) {
                const dx = this.x - alls[j].x;
                const dy = this.y - alls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < sizeN + alls[j].sizeN) {
                    this.velX = 0;
                    this.velY = 0;
                }
            }
        }
    }
    
    update() {
        if ((this.x + this.width) >= width) {
            this.velX = -(this.velX);
        }
        if ((this.x) <= 0) {
            this.velX = -(this.velX);
        }
    
        if ((this.y + this.height) >= height) {
            this.velY = -(this.velY);
        }
        if ((this.y) <= 0) {
            this.velY = -(this.velY);
        }
        

        this.x += this.velX;
        this.y += this.velY;
    }
    
    draw() {
        ctx.drawImage(img, this.x, this.y,this.width,this.height);
        img.src = 'https://tskoli.is/wp-content/uploads/2017/11/Gunnar-Thorunnarson-150x150.jpg';
    }
}

class Box {
    constructor(x, y,velX, velY, color) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.width = 150;
        this.height = 150;
    }
    
    collisionDetect() {
        let sizeN = this.width * this.height;
        for (let j = 0; j < boxs.length; j++) {
            if (!(this === boxs[j])) {
                const dy = this.y - boxs[j].y;
                const dx = this.x - boxs[j].x;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < sizeN + boxs[j].sizeN) {
                    this.velX = 0;
                    this.velY = 0;
                }
            }
        }
    }
    
    drawRect() {
        ctx.beginPath();
        ctx.fillStyle = 'rgba('+ random(0,255) +','+ random(0,255) +','+ random(0,255) +','+ random(0,255) +')';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    movingRect(event){
        let [x, y] = getMousePosition(event);
        this.x = x;
        this.y = y;
        console.log(x,y);
    }
}

let alls = [];
let boxs = [];

while (alls.length < 25) {
    let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0,height),
        random(0,width),
        random(-7,7),
        random(-7,7),
        'rgba(' + random(0, 3) + ',' + random(0, 3) + ',' + random(0, 3) + ', 0.2)'
    );

    alls.push(ball);
}

while (boxs.length < 1) {
    let box = new Box(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0,height),
        random(0,width),
        random(-7,7),
        random(-7,7),
        'rgba(' + random(0, 3) + ',' + random(0, 3) + ',' + random(0, 3) + ', 0.2)'
    );
    
    boxs.push(box);
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
    
    for (let i = 0; i < alls.length; i++) {
        alls[i].draw();
        alls[i].update();
        alls[i].collisionDetect();
    }
    
    for (let i = 0; i < boxs.length; i++) {
        boxs[i].drawRect();
        boxs[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}

loop();