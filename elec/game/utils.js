export const startAnimation = (draw,raf)=>{
    if(raf == null){
         return window.requestAnimationFrame(draw)
    }
   
}

export const stopAnimation=(raf)=>{
    return window.cancelAnimationFrame(raf)
}

export const isColiding = (a, b)=>{
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y+a.h > b.y
    )
}
// p,s
export const isColidingsmall = (a, b)=>{
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y+b.h &&
        a.y+a.h > b.y
    )
}