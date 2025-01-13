const sandwichIcon = document.querySelector('.sandwich-icon');
const navMenu = document.querySelector('.nav-menu');
const sandwichMenu = document.querySelector('.sandwich-menu');

sandwichIcon.addEventListener('click', () => {
    if (sandwichMenu.style.display === 'block') {
        sandwichMenu.style.display = 'none';
    } else {
        sandwichMenu.style.display = 'block';
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.style.display = 'flex';
        sandwichMenu.style.display = 'none';
        sandwichIcon.style.display = 'none';
    } else {
        navMenu.style.display = 'none';
        sandwichIcon.style.display = 'block';
    }
});
