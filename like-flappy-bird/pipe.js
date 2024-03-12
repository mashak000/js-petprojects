const HOLE_HEIGHT = 200;
const PIPE_WIDTH = 120;
let pipes = [];
const PIPE_INTERVAL = 1500;
let timeSinceLastPipe;
const PIPE_SPEED = 0.3;
let passedPipe; 

export function setupPipes(){
    document.documentElement.style.setProperty('--pipe-width', PIPE_WIDTH);
    document.documentElement.style.setProperty('--hole-height', HOLE_HEIGHT);
    pipes.forEach(pipe => pipe.remove());

    timeSinceLastPipe = PIPE_INTERVAL;
    passedPipe = 0;
}

export function updatePipes(delta){
    timeSinceLastPipe += delta;

    if (timeSinceLastPipe > PIPE_INTERVAL){
        timeSinceLastPipe -= PIPE_INTERVAL;
        createPipe();
    }
    pipes.forEach(pipe => {
        if (pipe.left + PIPE_WIDTH < 0){
            passedPipe++;
            return pipe.remove();
        }
        pipe.left = pipe.left - delta * PIPE_SPEED;
    })
}

export function getPassedPipe(){
    return passedPipe;
}

export function getPipeRects(){
    return pipes.flatMap(pipe => pipe.rects());
}

function createPipe(){
    const pipeElem = document.createElement('div');
    const topSeg = createPipeSegment('top');
    const bottomSeg = createPipeSegment('bottom');
    pipeElem.append(topSeg);
    pipeElem.append(bottomSeg);
    pipeElem.classList.add('pipe');
    pipeElem.style.setProperty('--hole-top', randomNumberBetween(HOLE_HEIGHT * 1.5, window.innerHeight - HOLE_HEIGHT * .5));

    const pipe = {
        get left(){
            return parseFloat(getComputedStyle(pipeElem).getPropertyValue('--pipe-left'));
        }, 
        set left(value){
            pipeElem.style.setProperty('--pipe-left', value)
        },
        remove() {
            pipes = pipes.filter(p => p !== pipe);
            pipeElem.remove();
        },
        rects(){
            return [
                topSeg.getBoundingClientRect(),
                bottomSeg.getBoundingClientRect()
            ]
        }
    }
    pipe.left = window.innerWidth;
    document.body.append(pipeElem);
    pipes.push(pipe);

}

function createPipeSegment(position){
    const segment = document.createElement('div');
    segment.classList.add('segment', position);
    return segment;
}

function randomNumberBetween(min, max){
    return Math.floor(Math.random()*(max - min + 1) + min)
}