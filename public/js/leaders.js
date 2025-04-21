/**
 * Leaders.js - Dynamically generates leader cards
 * This reduces duplication by generating leader cards from a data array
 */

document.addEventListener('DOMContentLoaded', () => {
    const leadersContainer = document.querySelector('.leaders-grid');
    
    if (leadersContainer) {
        renderLeaderCards(leadersContainer);
    }
});

/**
 * Leader data array with information for each leader
 */
const leaderData = [
    {
        name: "Ben",
        role: "Camp Lead",
        image: "public/images/ben.webp",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae risus in nisi consectetur varius. Donec semper consequat velit, at faucibus nisl volutpat ut."
    },
    {
        name: "Serena",
        role: "Cuddle Coordinator",
        image: "public/images/serenaPic.webp",
        bio: "Nullam eget venenatis felis, in scelerisque ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus convallis ipsum at augue ultrices."
    },
    {
        name: "James",
        role: "Good Vibes Manager",
        image: "public/images/james-placeholder.jpg",
        bio: "Fusce fermentum lacus vitae felis cursus, vel malesuada eros finibus. Suspendisse potenti. Proin bibendum vestibulum ex, in hendrerit dui auctor nec."
    },
    {
        name: "Brooke",
        role: "Party Animal",
        image: "public/images/brooke-placeholder.jpg",
        bio: "Integer sit amet eleifend ligula. Cras bibendum magna eu tortor elementum, vel tempor purus rutrum. Praesent varius magna vel risus accumsan, id dignissim mi fermentum."
    },
    {
        name: "Adam",
        role: "Creator of Color Dance",
        image: "public/images/adam-placeholder.jpg",
        bio: "Maecenas vel commodo ipsum. Vivamus vitae diam vel tellus ultrices egestas. Aenean consequat, purus quis lobortis hendrerit, justo urna porta tortor."
    }
];

/**
 * Renders all leader cards into the container
 * @param {HTMLElement} container - Container element for the leader cards
 */
function renderLeaderCards(container) {
    const cardsHTML = leaderData.map(leader => {
        return `
            <div class="leader-card">
                <div class="leader-image">
                    <img src="${leader.image}" alt="${leader.name}" class="placeholder-image">
                </div>
                <div class="leader-info">
                    <h2>${leader.name}</h2>
                    <h3>${leader.role}</h3>
                    <div class="leader-bio">
                        <p>${leader.bio}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = cardsHTML;
}