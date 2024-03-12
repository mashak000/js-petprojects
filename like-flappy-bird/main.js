import { updateBird, setupBird, getBirdRect } from './bird.js'
import { updatePipes, setupPipes, getPassedPipe, getPipeRects } from './pipe.js';




//document.addEventListener('keypress', handleStart, { once: true });
const info = document.querySelector('[data-info]');
const subtitle = document.querySelector('[data-subtitle]');
const overlay = document.querySelector('.overlay');
const image = document.querySelector('[data-image-actor');
const form = document.querySelector('.form');
let imageLink;

let lastTime;

window.onload = (event) => {
    const link = document.querySelector('[data-link]');
    link.addEventListener('click', () => {
        const linkText = document.querySelector('input').value;
        if (linkText.length == 0) {
            const file = document.querySelector('[data-file]').files[0];
            const reader = new FileReader();
            reader.addEventListener('load', (event) => {
                image.src = event.target.result;
            });
            reader.readAsDataURL(file);
            console.log(image.src)
            handleStart();
        } else {
            image.src = linkText;
            handleStart();
        }       
    })
}


function updateLoop(time){
    if (lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(updateLoop);
        return
    }
    const delta = time - lastTime;
    updateBird(delta);
    updatePipes(delta);
    if (checkLose()) return handleLose();
    lastTime = time;
    window.requestAnimationFrame(updateLoop);
}

function checkLose(){
    const birdRect = getBirdRect();
    const outside = birdRect.top < 0 || birdRect.bottom > window.innerHeight;
    const insidePipe = getPipeRects().some(rect => isCollide(birdRect, rect));
    return outside || insidePipe;
}

function isCollide(rect1, rect2) {
    return (
        rect1.left < rect2.right && rect1.right > rect2.left && rect1.top < rect2.bottom && rect1.bottom > rect2.top
    )
}

function handleStart(){
    info.classList.add('hidden');
    overlay.classList.add('hidden');
    form.classList.add('hidden');

    setupBird();
    setupPipes();
    lastTime = null;
    window.requestAnimationFrame(updateLoop);
}

function handleLose(){
    setTimeout(() => {
        info.classList.remove('hidden');
        subtitle.classList.remove('hidden');
        overlay.classList.remove('hidden');
        subtitle.textContent = `${getPassedPipe()} pipes`;
        document.addEventListener('keypress', handleStart, { once: true });
    }, 100)
    
}