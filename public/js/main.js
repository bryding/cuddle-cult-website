document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle - we'll handle this with a delegated event listener
    // since the mobile menu button is dynamically created in components.js
    document.body.addEventListener('click', function(e) {
        if (e.target.closest('.mobile-menu')) {
            const mobileMenuBtn = e.target.closest('.mobile-menu');
            const nav = document.querySelector('nav');
            
            if (mobileMenuBtn && nav) {
                mobileMenuBtn.classList.toggle('active');
                nav.classList.toggle('active');
            }
        }
    });

    // Gallery Filter (if on gallery page)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Events Schedule Tabs (if on events page)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const daySchedules = document.querySelectorAll('.day-schedule');

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const day = this.getAttribute('data-day');
                
                // Hide all schedules
                daySchedules.forEach(schedule => {
                    schedule.classList.remove('active');
                });
                
                // Show selected schedule
                document.getElementById(day).classList.add('active');
            });
        });
    }

    // Form Tabs (if on connect page)
    const formTabs = document.querySelectorAll('.form-tab');
    const forms = document.querySelectorAll('.form');

    if (formTabs.length > 0) {
        formTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                formTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');
                
                const formId = this.getAttribute('data-form');
                
                // Hide all forms
                forms.forEach(form => {
                    form.classList.remove('active');
                });
                
                // Show selected form
                document.getElementById(formId).classList.add('active');
            });
        });
    }

    // FAQ Accordion (if on connect page)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const accordionContents = document.querySelectorAll('.accordion-content');

    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach((header, index) => {
            header.addEventListener('click', function() {
                this.classList.toggle('active');
                
                const content = this.nextElementSibling;
                if (content.classList.contains('active')) {
                    content.classList.remove('active');
                } else {
                    // Close all other open accordions
                    accordionContents.forEach(item => {
                        item.classList.remove('active');
                    });
                    accordionHeaders.forEach(item => {
                        item.classList.remove('active');
                    });
                    
                    // Open this accordion
                    this.classList.add('active');
                    content.classList.add('active');
                }
            });
        });
    }

    // Form Submission Handling
    const allForms = document.querySelectorAll('form');
    if (allForms.length > 0) {
        allForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formId = form.id;
                const formData = new FormData(form);
                const formEntries = Object.fromEntries(formData.entries());
                
                // Handle email forms
                if (formId === 'contact-form') {
                    sendContactFormEmail(formEntries);
                } else if (formId === 'join-form') {
                    sendJoinFormEmail(formEntries);
                } else {
                    // For other forms - show a demo message
                    alert('Thank you for your submission! This is a demo site, so data for this form has not been sent.');
                    form.reset();
                }
            });
        });
    }
    
    // Function to send contact form email
    function sendContactFormEmail(data) {
        // Format the email subject and body
        const subject = `Camp Cuddle Cult Contact: ${data.subject}`;
        
        // Create email body with nice formatting
        let emailBody = `
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}
Message:
${data.message}
        `;
        
        // Encode for mailto URL
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(emailBody);
        const emailAddress = 'ryding.ben@gmail.com';
        
        // Create mailto link
        const mailtoLink = `mailto:${emailAddress}?subject=${encodedSubject}&body=${encodedBody}`;
        
        // Show success message 
        const formContainer = document.querySelector('#contact-form');
        
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.innerHTML = `
            <h3>Thanks for reaching out!</h3>
            <p>Your email client will now open to send this message to our team.</p>
            <p><strong>Important:</strong> Please click send in your email client to complete sending your message.</p>
            <button class="btn btn-outline return-to-form">Return to Form</button>
        `;
        successMessage.style.textAlign = 'center';
        successMessage.style.padding = '20px';
        
        // Hide the form and show the success message
        formContainer.innerHTML = '';
        formContainer.appendChild(successMessage);
        
        // Add event listener to return button
        const returnButton = successMessage.querySelector('.return-to-form');
        returnButton.addEventListener('click', function() {
            location.reload();
        });
        
        // Open mailto link in a new window/tab
        window.open(mailtoLink, '_blank');
    }
    
    // Function to send join form email
    function sendJoinFormEmail(data) {
        // Format the email subject and body
        const subject = `Camp Cuddle Cult Application: ${data.name}`;
        
        // Create email body with nice formatting
        let emailBody = `
CAMP CUDDLE CULT APPLICATION

Name: ${data.name}
Email: ${data.email}
Previous Burns: ${data.burns}

Skills & Contributions:
${data.skills || 'Not specified'}

Why Camp Cuddle Cult:
${data.why}

Questions:
${data.questions || 'None'}
        `;
        
        // Encode for mailto URL
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(emailBody);
        const emailAddress = 'ryding.ben@gmail.com';
        
        // Create mailto link
        const mailtoLink = `mailto:${emailAddress}?subject=${encodedSubject}&body=${encodedBody}`;
        
        // Show success message 
        const formContainer = document.querySelector('#join-form');
        
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.innerHTML = `
            <h3>Application Submitted!</h3>
            <p>Thank you for your interest in joining Camp Cuddle Cult!</p>
            <p>Your email client will now open to send your application to our team.</p>
            <p><strong>Important:</strong> Please click send in your email client to complete your application.</p>
            <button class="btn btn-outline return-to-form">Return to Form</button>
        `;
        
        // Hide the form and show the success message
        formContainer.innerHTML = '';
        formContainer.appendChild(successMessage);
        
        // Add event listener to return button
        const returnButton = successMessage.querySelector('.return-to-form');
        returnButton.addEventListener('click', function() {
            location.reload();
        });
        
        // Open mailto link in a new window/tab
        window.open(mailtoLink, '_blank');
    }

    // Scroll Animation for Page Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update URL without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });

    // Create placeholder image fallbacks if real images aren't available
    const placeholderImages = document.querySelectorAll('.placeholder-image');
    placeholderImages.forEach(img => {
        if (img.tagName === 'IMG' && !img.getAttribute('src').includes('placeholder')) {
            img.addEventListener('error', function() {
                this.classList.add('placeholder-image');
                this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22150%22%20viewBox%3D%220%200%20300%20150%22%3E%3Crect%20fill%3D%22%23e0e0e0%22%20width%3D%22300%22%20height%3D%22150%22%2F%3E%3Ctext%20fill%3D%22%23757575%22%20font-family%3D%22sans-serif%22%20font-size%3D%2230%22%20dy%3D%22.3em%22%20text-anchor%3D%22middle%22%20x%3D%22150%22%20y%3D%2275%22%3EPlaceholder%20Image%3C%2Ftext%3E%3C%2Fsvg%3E';
            });
        }
    });
});
