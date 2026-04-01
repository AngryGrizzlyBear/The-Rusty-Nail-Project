// The Rusty Nail - Scripts 
const hamburger = document.querySelector('#hamburger');
const nav = document.querySelector('nav ul');
const navLinks = document.querySelectorAll('nav a');
const currentFilename = window.location.pathname.split('/').pop() || 'index.html';


hamburger.addEventListener("click", () => {
    hamburger.classList.toggle('open')
    nav.classList.toggle('open')
    const isExpanded = hamburger.getAttribute('aria-expanded')
    hamburger.setAttribute('aria-expanded', isExpanded === 'true' ? 'false' : 'true');
})

navLinks.forEach(link => {
    const linkedHref = link.getAttribute('href');

    if (linkedHref === currentFilename) {
        link.classList.add('active');
    }
});
