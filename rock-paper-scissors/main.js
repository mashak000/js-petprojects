const selectionBtns = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]');
const computerScore = document.querySelector('[data-computer-score]');
const yourScore = document.querySelector('[data-your-score]')
const nameSpan = document.querySelector('.username');
const input = document.querySelector('.name');
const SELECTIONS = [
    {
        name: 'rock',
        emoji: '👊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '🖐',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌️',
        beats: 'paper'
    }
]

selectionBtns.forEach((element) => {
    element.addEventListener('click', e => {
        const name = element.dataset.selection;
        const selection = SELECTIONS.find(selection => selection.name === name);

        makeSelection(selection);
    })
})

function makeSelection(selection){
    const computerSelection = randomSelection();
    const yourWinner = isWinner(selection, computerSelection);
    const computerWinner = isWinner(computerSelection, selection);

    addResults(computerSelection, computerWinner);
    addResults(selection, yourWinner);

    if (yourWinner) addScores(yourScore);
    if (computerWinner) addScores(computerScore);

}

function isWinner(selection, opponent){
    return selection.beats === opponent.name;
}

function addResults(selection, winner){
    const div = document.createElement('div');
    div.innerText = selection.emoji;
    div.classList.add('result-selection');
    if (winner) div.classList.add('winner');
    finalColumn.after(div);
}

function addScores(scoreSpan){
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

function randomSelection(){
    const randomIndex = Math.floor(Math.random()*SELECTIONS.length);
    return SELECTIONS[randomIndex];
}

document.querySelector('.end').addEventListener('click', e =>{
    const results = document.querySelectorAll('.result-selection');
    results.forEach((element) => {
        element.remove();
    })
    computerScore.innerText = 0;
    yourScore.innerText = 0;
    
})

window.onload = (event) => {
   document.querySelector('.game').style.display = 'none';
};

document.querySelector('.submit').addEventListener('click', e => {
    document.querySelector('.game').style.display = 'block';
    document.querySelector('.get-username').style.display = 'none';
    if (input.value === '') {
        nameSpan.innerText = 'anonymus: ';
    } else{
        nameSpan.innerText = input.value + ': ';
    }
})