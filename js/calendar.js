/**
 * Google Calendar Integration for Camp Cuddle Cult
 * This script fetches and displays events from a Google Calendar using the Google Calendar API
 */

// Configuration - Replace with your Google Calendar ID and API Key
const CONFIG = {
    calendarId: 'YOUR_CALENDAR_ID@group.calendar.google.com', // Replace with your calendar ID
    apiKey: 'YOUR_API_KEY',  // Replace with your API key
    dateFormat: { weekday: 'long', month: 'long', day: 'numeric' },
    timeFormat: { hour: '2-digit', minute: '2-digit' }
};

// Days of the week for tab navigation
const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

/**
 * Initialize the calendar once the DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    const calendarElement = document.getElementById('calendar-events');
    if (!calendarElement) return; // Only run on pages with the calendar element
    
    loadGoogleCalendarAPI();
});

/**
 * Dynamically load the Google Calendar API script
 */
function loadGoogleCalendarAPI() {
    const script = document.createElement('script');
    script.src = `https://apis.google.com/js/api.js`;
    script.onload = initializeCalendar;
    document.body.appendChild(script);
}

/**
 * Initialize the Google Calendar API and fetch events
 */
function initializeCalendar() {
    gapi.load('client', () => {
        gapi.client.init({
            apiKey: CONFIG.apiKey,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
        }).then(() => {
            fetchEvents();
        }).catch(error => {
            console.error('Error initializing the Google Calendar API:', error);
            displayCalendarError('Could not load the Google Calendar API. Please check your internet connection and try again.');
        });
    });
}

/**
 * Fetch events from Google Calendar
 */
function fetchEvents() {
    // Calculate time range (1 week)
    const now = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(now.getDate() + 7);
    
    // Format dates for API request
    const timeMin = now.toISOString();
    const timeMax = oneWeekLater.toISOString();
    
    // Make the API request
    gapi.client.calendar.events.list({
        'calendarId': CONFIG.calendarId,
        'timeMin': timeMin,
        'timeMax': timeMax,
        'singleEvents': true,
        'orderBy': 'startTime'
    }).then(response => {
        const events = response.result.items;
        if (events.length > 0) {
            displayEvents(events);
        } else {
            displayCalendarError('No upcoming events found.');
        }
    }).catch(error => {
        console.error('Error fetching calendar events:', error);
        displayCalendarError('Could not load events from the calendar. Please check your calendar ID and API key.');
    });
}

/**
 * Group events by day of the week
 * @param {Array} events - Array of events from Google Calendar
 * @returns {Object} - Events grouped by day
 */
function groupEventsByDay(events) {
    const groupedEvents = {};
    
    // Initialize each day with an empty array
    DAYS.forEach(day => {
        groupedEvents[day] = [];
    });
    
    // Assign events to their respective days
    events.forEach(event => {
        const start = new Date(event.start.dateTime || event.start.date);
        const dayName = start.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        
        if (groupedEvents[dayName]) {
            groupedEvents[dayName].push(event);
        }
    });
    
    return groupedEvents;
}

/**
 * Display events in the calendar interface
 * @param {Array} events - Array of events from Google Calendar
 */
function displayEvents(events) {
    const eventsByDay = groupEventsByDay(events);
    
    // First, ensure our tab structure exists
    updateTabInterface(eventsByDay);
    
    // Then update each day's content
    for (const [day, dayEvents] of Object.entries(eventsByDay)) {
        const dayElement = document.getElementById(day);
        if (!dayElement) continue;
        
        // Clear existing content except the heading
        const heading = dayElement.querySelector('h2');
        dayElement.innerHTML = '';
        if (heading) dayElement.appendChild(heading);
        
        // Create events list container
        const eventsListElement = document.createElement('div');
        eventsListElement.className = 'events-list';
        
        if (dayEvents.length === 0) {
            // No events for this day
            const placeholderText = document.createElement('p');
            placeholderText.className = 'placeholder-text';
            placeholderText.textContent = 'No events scheduled for this day.';
            eventsListElement.appendChild(placeholderText);
        } else {
            // Create event items
            dayEvents.forEach(event => {
                const eventElement = createEventElement(event);
                eventsListElement.appendChild(eventElement);
            });
        }
        
        dayElement.appendChild(eventsListElement);
    }
    
    // Make sure first day is active by default
    const firstDay = document.querySelector('.day-schedule');
    if (firstDay) {
        firstDay.classList.add('active');
        
        // Also make its tab active
        const firstDayId = firstDay.id;
        const firstDayTab = document.querySelector(`.tab-btn[data-day="${firstDayId}"]`);
        if (firstDayTab) {
            firstDayTab.classList.add('active');
        }
    }
}

/**
 * Ensure the tab interface exists and is up to date
 * @param {Object} eventsByDay - Events grouped by day
 */
function updateTabInterface(eventsByDay) {
    const scheduleContent = document.querySelector('.schedule-content');
    const tabsContainer = document.querySelector('.schedule-tabs');
    
    if (!scheduleContent || !tabsContainer) {
        console.error('Required calendar DOM elements not found');
        return;
    }
    
    // Create or update tabs for each day
    DAYS.forEach(day => {
        // Create tab button if it doesn't exist
        let tabButton = tabsContainer.querySelector(`.tab-btn[data-day="${day}"]`);
        if (!tabButton) {
            tabButton = document.createElement('button');
            tabButton.className = 'tab-btn';
            tabButton.setAttribute('data-day', day);
            tabButton.textContent = day.charAt(0).toUpperCase() + day.slice(1);
            
            // Add event listener
            tabButton.addEventListener('click', function() {
                document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.day-schedule').forEach(schedule => schedule.classList.remove('active'));
                
                this.classList.add('active');
                document.getElementById(day).classList.add('active');
            });
            
            tabsContainer.appendChild(tabButton);
        }
        
        // Create day schedule container if it doesn't exist
        let daySchedule = scheduleContent.querySelector(`#${day}`);
        if (!daySchedule) {
            daySchedule = document.createElement('div');
            daySchedule.className = 'day-schedule';
            daySchedule.id = day;
            
            const heading = document.createElement('h2');
            heading.textContent = `${day.charAt(0).toUpperCase() + day.slice(1)} Events`;
            daySchedule.appendChild(heading);
            
            scheduleContent.appendChild(daySchedule);
        }
    });
}

/**
 * Create an event element from a calendar event
 * @param {Object} event - A Google Calendar event
 * @returns {HTMLElement} - DOM element for the event
 */
function createEventElement(event) {
    const start = new Date(event.start.dateTime || event.start.date);
    const end = event.end ? new Date(event.end.dateTime || event.end.date) : null;
    
    // Format time string (e.g. "7:00 AM - 8:30 AM")
    let timeString = start.toLocaleTimeString('en-US', CONFIG.timeFormat);
    if (end) {
        timeString += ` - ${end.toLocaleTimeString('en-US', CONFIG.timeFormat)}`;
    }
    
    // Create event item container
    const eventItem = document.createElement('div');
    eventItem.className = 'event-item';
    
    // Create time element
    const timeElement = document.createElement('div');
    timeElement.className = 'event-time';
    timeElement.textContent = timeString;
    eventItem.appendChild(timeElement);
    
    // Create details container
    const detailsElement = document.createElement('div');
    detailsElement.className = 'event-details';
    
    // Event title
    const titleElement = document.createElement('h3');
    titleElement.textContent = event.summary || 'Untitled Event';
    detailsElement.appendChild(titleElement);
    
    // Event description
    if (event.description) {
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = event.description;
        detailsElement.appendChild(descriptionElement);
    }
    
    // Event location
    if (event.location) {
        const locationElement = document.createElement('p');
        locationElement.innerHTML = `<strong>Location:</strong> ${event.location}`;
        detailsElement.appendChild(locationElement);
    }
    
    // Organizer (from extended properties if available)
    if (event.extendedProperties && event.extendedProperties.private && event.extendedProperties.private.organizer) {
        const organizerElement = document.createElement('p');
        organizerElement.innerHTML = `<strong>Facilitator:</strong> ${event.extendedProperties.private.organizer}`;
        detailsElement.appendChild(organizerElement);
    } else if (event.creator && event.creator.displayName) {
        const organizerElement = document.createElement('p');
        organizerElement.innerHTML = `<strong>Facilitator:</strong> ${event.creator.displayName}`;
        detailsElement.appendChild(organizerElement);
    }
    
    eventItem.appendChild(detailsElement);
    return eventItem;
}

/**
 * Display an error message in the calendar container
 * @param {string} message - Error message to display
 */
function displayCalendarError(message) {
    const scheduleContent = document.querySelector('.schedule-content');
    if (!scheduleContent) return;
    
    scheduleContent.innerHTML = `
        <div class="calendar-error">
            <p>${message}</p>
            <p>To set up calendar integration:</p>
            <ol>
                <li>Edit js/calendar.js</li>
                <li>Replace YOUR_CALENDAR_ID with your Google Calendar ID</li>
                <li>Replace YOUR_API_KEY with your Google API Key</li>
            </ol>
            <a href="https://developers.google.com/calendar/api/quickstart/js" target="_blank" class="btn btn-outline">
                How to Setup Google Calendar API
            </a>
        </div>
    `;
}