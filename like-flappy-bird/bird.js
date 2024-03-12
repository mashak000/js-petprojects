const birdElem = document.querySelector('[data-actor]');
const BIRD_SPEED = 0.4;
const JUMP_DURATION = 170;
let timeSinceLastJump = Number.POSITIVE_INFINITY;

export function setupBird(){
    setTop(window.innerHeight / 2);
    document.removeEventListener('keydown', hadleJump);
    document.addEventListener('keydown', hadleJump);

}

export function updateBird(delta){
    if (timeSinceLastJump < JUMP_DURATION) {
        setTop(getTop() - (BIRD_SPEED*delta));
    } else {
        setTop(getTop() + BIRD_SPEED*delta);
    }
    timeSinceLastJump += delta;
    console.log(getTop());
}

function setTop(top){
    birdElem.style.setProperty('--bird-top', top)
}

function getTop(){
    return parseFloat(getComputedStyle(birdElem).getPropertyValue('--bird-top'));
}

function hadleJump(e){
    if (e.code !== "Space") return ;

    timeSinceLastJump = 0;
}

export function getBirdRect(){
    return birdElem.getBoundingClientRect();
}