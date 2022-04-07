
const iterations = 800000;
const canvXSize = 500;
const canvYSize = 500;
let xPlus=0.12;
let yPlus=0.221;
let rPlus=1;
let gPlus=1.01;
let bPlus=1.02;
let thickness=2;
const $body = $('body');
$body.prepend(`<canvas width="${canvXSize}" height="${canvYSize}"></canvas>`);
const $canvas = $('canvas')[0];
const $inputs ={
    x:$('input')[0],
    y:$('input')[1],
    r:$('input')[2],
    g:$('input')[3],
    b:$('input')[4],
    thic:$('input')[5],
}
const exampleImages=[
    'gallery/index.png',
    'gallery/index1.png',
    'gallery/index2.png',
    'gallery/index3.png',
    'gallery/index4.png',
    'gallery/index5.png',
    'gallery/index6.png',
    'gallery/index7.png',
    'gallery/index8.png',
    'gallery/index9.png',
    'gallery/index10.png',
    'gallery/index11.png',
];
const $gallery=$('#gallery');
for(i=0;i<exampleImages.length;i++){
    $gallery.append(`<img src =${exampleImages[i]}>`);
}
function random(){
    $inputs.x.value=randomInt(299);
    $inputs.y.value=randomInt(299);
    $inputs.r.value=Math.max(0, (randomInt(20)-10)/10);
    $inputs.g.value=Math.max(0, (randomInt(20)-10)/10);
    $inputs.b.value=Math.max(0, (randomInt(20)-10)/10);
    $inputs.thic.value=randomInt(3)+1;
    draw()
}
function draw() {
        if ($canvas.getContext) {
        const ctx = $canvas.getContext('2d');
        xPlus=parseFloat($inputs.x.value)/100;
        yPlus=parseFloat($inputs.y.value)/100;
        rPlus=parseFloat($inputs.r.value);
        gPlus=parseFloat($inputs.g.value);
        bPlus=parseFloat($inputs.b.value);
        thickness=parseFloat($inputs.thic.value);
        console.log(parseFloat($inputs.x.value));
        let x = 0;
        let y = 0;
        let r = 0;
        let g = 0;
        let b = 0;
        for (i=0;i<iterations;i++){
            ctx.fillStyle = "rgba("+r+","+g+","+b+","+(255)+")";
            ctx.fillRect( x, y, thickness, thickness );
            x+=xPlus;
            y+=yPlus;
            r+=rPlus;
            g+=gPlus;
            b+=bPlus;
            //detect edge collision
            if(x>canvXSize){
                x=canvXSize;
                xPlus=-xPlus;
            }
            if(y>canvYSize){
                y=canvYSize;
                yPlus=-yPlus;
            }
            if(x<0){
                x=0;
                xPlus=-xPlus;
            }
            if(y<0){
                y=0;
                yPlus=-yPlus;
            }
            if(r>255){
                r=0;
            }
            if(g>255){
                g=0;
            }
            if(b>255){
                b=0;
            }
            //break pattern
            if(x===canvXSize && y===canvYSize){
                break;
            }
        }
    }
    console.log("done");
}
draw();
//SECTION utility functions
function randomInt(max) {
    return Math.floor(Math.random() * max);
  }

function randomColor() {
    return `rgb(${randomInt(256)}, ${randomInt(256)}, ${randomInt(256)})`
}
$('#go').on('click', draw);
$('#random').on('click', random);    