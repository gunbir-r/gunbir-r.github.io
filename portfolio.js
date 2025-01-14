const sandwichIcon = document.querySelector('.sandwich-icon');
const navMenu = document.querySelector('.nav-menu');
const sandwichMenu = document.querySelector('.sandwich-menu');

sandwichIcon.addEventListener('click', () => {
    if (sandwichMenu.style.maxHeight && sandwichMenu.style.maxHeight !== '0px') {
        // Close the menu
        sandwichMenu.style.maxHeight = '0px';
    } else {
        // Open the menu
        sandwichMenu.style.maxHeight = sandwichMenu.scrollHeight + 'px';
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.style.display = 'flex';
        sandwichMenu.style.maxHeight = '0px';
        sandwichIcon.style.display = 'none';
    } else {
        navMenu.style.display = 'none';
        sandwichIcon.style.display = 'block';
    }
});
