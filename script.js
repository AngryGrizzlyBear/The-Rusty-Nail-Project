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

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

const fadeUpElements = document.querySelectorAll('.fade-up');
fadeUpElements.forEach((el) => observer.observe(el));

function renderEvents(events, eventsList) {
    const eventsHTML = events.map(event => {
        const ticketButton = event.soldOut
            ? `<p class="sold-out"> SOLD OUT </p>`
            : `<button class="btn-tickets">Tickets</button>`

        const supportLine = event.support
            ? `<p class="support"> Support: ${event.support}</p>`
            : ``;

        return `
            <div class="event-card">
            <h3>${event.artist}</h3>
            <p class="date">${event.day} ${event.month}</p>
            ${supportLine}
            ${ticketButton}
            </div>
                `;
    }).join('');

    eventsList.innerHTML = eventsHTML;
}

async function loadEvents() {
    const eventsList = document.querySelector('#events-list');

    if (!eventsList) return;

    try {
        const response = await fetch('data/events.json');
        const data = await response.json();

        renderEvents(data, eventsList);
    } catch (error) {
        console.error('Error loading events:', error);
        eventsList.innerHTML = '<p>Unable to load events at this time</p>'
    }
}

loadEvents();
