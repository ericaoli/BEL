
// variables
const menuBtn = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.navbar');
const showNavLinks = document.querySelector('.navlinks-container');
const menuClick = document.getElementById('menu_click');
const menuBackDrop = document.querySelector('.menu_backdrop');
const menuNav = document.querySelectorAll('.menu');


// NAVBAR - hamburger menu
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('is-active');
    mobileMenu.classList.toggle('is-active');
    showNavLinks.classList.toggle('show-links');
});

// NAVBAR menu_backdrop - nos lectures
menuClick.addEventListener('click', () => {
    menuBackDrop.classList.toggle('show-links');
});


//NAVBAR - supprimer le menu déroulant si le user clic en dehors
  document.addEventListener('click', (event) => {
    if (!menuClick.contains(event.target) && !menuBackDrop.contains(event.target)) {
      menuBackDrop.classList.remove('show-links');
    }
  });

  //NAVBAR - options du menu déroulant
  // let title = document.querySelector('.readings');


