import {flagProp, obstacleProp, playerProp} from "./player.js";
import { isColiding, startAnimation, stopAnimation } from "./utils.js";


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let raf = null;

// players goes here
const player = {
    ...playerProp,
    draw(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = this.color;
        ctx.fill()
    }
}

const obstacle = {
    ...obstacleProp,
    draw(){
        ctx.beginPath();
        ctx.rect(this.x, canvas.height-this.h, this.w, this.h);
        ctx.fillStyle = this.color;
        ctx.fill()
    }
}

const flag = {
    ...flagProp,
        draw(){
        ctx.beginPath();
        ctx.rect(this.x, canvas.height-this.h, this.w, this.h);
        ctx.fillStyle = this.color;
        ctx.fill()
    }
}


// draw
function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    // move vertical
    player.vy += player.gravity;
    player.y += player.vy;
    //touch the floor
    if (player.y + player.h >= canvas.height){
        player.y = canvas.height - player.h;
        player.vy = 0;
        player.grounded = true;
    }else{
        player.grounded = false;
    }
    //vertical colliding
    if (isColiding(player, obstacle)){
        if(player.vy > 0){
            player.y = obstacle.y - player.h;
            player.vy = 0
            player.grounded = true;
        }else if(player.vy < 0){
            player.y = obstacle.y + obstacle.h;
            player.vy = 0
    }
}
    if (isColiding(player, flag)){
        document.querySelector('.container').innerHTML = 'FLAG FOUND fake_flag<br><a href="./level2.html">Go to next stage</a>'
       stopAnimation(raf)
}
    // move horizontal
    player.x += player.vx;
    if (isColiding(player, obstacle)){
        if(player.vx > 0){
            if(window.pos?.amount){
                console.log(123123)
                window.pos=10
                player.x = obstacle.x - player.w + window.pos;
            }else{
                player.x = obstacle.x - player.w;
            }
            
            player.vx = 0
        }else if(player.vx <0){
            player.x = obstacle.x + obstacle.w
        }
        player.vx = 0
    }

    
    // keep inside of the canvas
    player.x = Math.max(0, Math.min(canvas.width-player.w,player.x))
    
    player.draw();
    obstacle.draw();
    flag.draw();
    //stop animation if the hero is in groud or the velocity is zero
    if(player.grounded && player.vx == 0 && player.vy == 0){
        raf = stopAnimation(raf);
        return
    }
    raf = window.requestAnimationFrame(draw);
}

window.addEventListener('keydown',(e)=>{
    const key = e.key;
    switch(key){
        case 'a':
            player.vx = -player.speed
            raf = startAnimation(draw, raf)
            break
        case 's':
            break
        case 'd':
            player.vx = player.speed
            raf = startAnimation(draw, raf)
            break
        case 'w':
            if(player.grounded){
                player.vy = player.jumpStrength;
                player.grounded = false;
                startAnimation(draw, raf)
            }
            break
    }
    
})

window.addEventListener('keyup',(e)=>{
    player.vx = 0;
    raf = window.cancelAnimationFrame(draw)
})

player.draw()
obstacle.draw()
flag.draw()
