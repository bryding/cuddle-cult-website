/**
 * Components.js - Handles common UI components across the site
 * This reduces duplication by generating navigation and footer elements dynamically
 */

document.addEventListener('DOMContentLoaded', () => {
    // Insert navigation
    const navContainer = document.querySelector('header .container');
    if (navContainer) {
        renderNavigation(navContainer);
    }
    
    // Insert footer
    const footerElement = document.querySelector('footer');
    if (footerElement) {
        renderFooter(footerElement);
    }
});

/**
 * Renders the site navigation
 * @param {HTMLElement} container - Container element for the navigation
 */
function renderNavigation(container) {
    // Get current page to set the active class
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Create navigation HTML
    const navHTML = `
        <div class="logo">
            <h1>Camp Cuddle Cult</h1>
        </div>
        <nav>
            <ul>
                <li><a href="index.html" ${currentPage === 'index.html' ? 'class="active"' : ''}>Home</a></li>
                <li><a href="index.html#about">About Us</a></li>
                <li><a href="leaders.html" ${currentPage === 'leaders.html' ? 'class="active"' : ''}>Camp Leaders</a></li>
                <li><a href="gallery.html" ${currentPage === 'gallery.html' ? 'class="active"' : ''}>Gallery</a></li>
                <li><a href="events.html" ${currentPage === 'events.html' ? 'class="active"' : ''}>Events</a></li>
                <li><a href="connect.html" ${currentPage === 'connect.html' ? 'class="active"' : ''}>Connect</a></li>
            </ul>
        </nav>
        <button class="mobile-menu" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
    `;
    
    // Replace container contents with navigation
    container.innerHTML = navHTML;
    
    // Re-attach mobile menu event listener
    const mobileMenuBtn = container.querySelector('.mobile-menu');
    const nav = container.querySelector('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
}

/**
 * Renders the site footer
 * @param {HTMLElement} footerElement - Footer element to populate
 */
function renderFooter(footerElement) {
    const footerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">
                    <h3>Camp Cuddle Cult</h3>
                    <p>Burning Man • Black Rock City, NV</p>
                </div>
                <div class="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="index.html#about">About Us</a></li>
                        <li><a href="leaders.html">Camp Leaders</a></li>
                        <li><a href="gallery.html">Gallery</a></li>
                        <li><a href="events.html">Events</a></li>
                        <li><a href="connect.html">Connect</a></li>
                    </ul>
                </div>
                <div class="footer-social">
                    <h4>Connect With Us</h4>
                    <div class="social-icons">
                        <a href="#" aria-label="Instagram">📷</a>
                        <a href="#" aria-label="Facebook">👤</a>
                        <a href="#" aria-label="Twitter">🐦</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} Camp Cuddle Cult. All rights reserved.</p>
                <p>Created with ❤️ for the playa</p>
            </div>
        </div>
    `;
    
    // Set footer content
    footerElement.innerHTML = footerHTML;
}