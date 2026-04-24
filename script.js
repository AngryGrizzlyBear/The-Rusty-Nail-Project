// The Rusty Nail - Scripts +
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
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px" 
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
            <div class="date"><p>${event.day} ${event.month}</p> </div>
            <div class="event-info"> <h3>${event.artist}</h3> <p class="genre">${event.genre}</p> ${supportLine} </div>
            <div class="event-action">   <p class="price">$${event.price}</p> ${ticketButton}</div>
            </div>
                `;
    }).join('');

    eventsList.innerHTML = eventsHTML;
}
let allEventsData = [];

async function loadEvents() {
    const eventsList = document.querySelector('#events-list');

    if (!eventsList) return;

    eventsList.innerHTML = '<p>Loading shows...</p>';

    try {
        const response = await fetch('data/events.json');
        allEventsData = await response.json();
        renderEvents(allEventsData, eventsList);

        initFilters(eventsList);
    } catch (error) {
        console.error('Error loading events:', error);
        eventsList.innerHTML = '<p>Unable to load events at this time</p>'
    }
}


function initFilters(eventsList) {
    const buttons = document.querySelectorAll('.filter-buttons button');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedGenre = btn.getAttribute('data-genre');
            const filtered = (selectedGenre === 'all')
                ? allEventsData
                : allEventsData.filter(event => event.genre.toLowerCase() === selectedGenre.toLowerCase());

            filtered.length === 0
                ? eventsList.innerHTML = '<p>No shows found</p>'
                : renderEvents(filtered, eventsList);

        });
    });
}



loadEvents();
