const openBtn = document.querySelectorAll('[data-modal-target');
const closeBtn = document.querySelectorAll('[data-close]');

const overlay = document.querySelector('#overlay');

openBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = document.querySelector(btn.dataset.modalTarget);
        openModal(modal);
    })
})

closeBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal')
        closeModal(modal);
    })
})

overlay.addEventListener('click', () =>{
    const modal = document.querySelector('.modal.active');
    closeModal(modal);
})


function openModal(modal) {
    if (modal === null) return 
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal) {
    if (modal === null) return 
    modal.classList.remove('active');
    overlay.classList.remove('active');
}