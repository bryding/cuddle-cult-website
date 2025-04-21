# Camp Cuddle Cult - Burning Man Camp Website

This is a responsive website for "Camp Cuddle Cult" at Burning Man, built with plain HTML, CSS, and JavaScript.

## Features

- Responsive design that works on mobile, tablet, and desktop
- Information about the camp, its values, and features
- Profiles of camp leaders
- Event schedule with Google Calendar integration
- Photo gallery with filtering options
- Contact and application forms
- Social media links

## Google Calendar Integration

The events page includes Google Calendar integration. To set it up:

1. Create a Google Calendar for your camp events
2. Get your Calendar ID from Google Calendar Settings:
   - Open Google Calendar
   - Click the three dots next to your calendar and select "Settings and sharing"
   - Scroll down to "Integrate calendar" section
   - Copy the Calendar ID

3. Create a Google API Key:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable the Google Calendar API
   - Create an API key with appropriate restrictions

4. Update the configuration in `js/calendar.js`:
   ```javascript
   const CONFIG = {
       calendarId: 'YOUR_CALENDAR_ID@group.calendar.google.com', // Replace with your calendar ID
       apiKey: 'YOUR_API_KEY',  // Replace with your API key
       dateFormat: { weekday: 'long', month: 'long', day: 'numeric' },
       timeFormat: { hour: '2-digit', minute: '2-digit' }
   };
   ```

## File Structure

- `index.html` - Home page with camp introduction
- `about.html` - About the camp, its history, and principles
- `leaders.html` - Profiles of camp leaders
- `gallery.html` - Photo gallery with filtering
- `events.html` - Event schedule with Google Calendar integration
- `connect.html` - Forms to connect, join, or contact
- `css/styles.css` - All styles for the site
- `js/main.js` - Main JavaScript functionality
- `js/calendar.js` - Google Calendar integration
- `images/` - Directory for images (placeholder images only)

## Customization

### Adding Real Images

Replace the placeholder images in the `images/` directory with your actual images:
- `hero-bg.jpg` - Background image for the hero section
- `camp-placeholder.jpg` - Image of your camp
- `ben-placeholder.jpg` - Photo of Ben Ryding
- `serena-placeholder.jpg` - Photo of Serena Lipari
- `james-placeholder.jpg` - Photo of James Jenkins
- `brooke-placeholder.jpg` - Photo of Brooke Downer
- `gallery-placeholder-1.jpg` through `gallery-placeholder-12.jpg` - Gallery images
- `event-placeholder-1.jpg` through `event-placeholder-3.jpg` - Event images
- `icon-join.svg`, `icon-newsletter.svg`, `icon-social.svg`, `icon-contribute.svg` - Icons for connect page

### Colors and Branding

The site uses a color scheme inspired by Burning Man:
- Primary: `#ff6d10` (Burning orange)
- Secondary: `#9c27b0` (Purple for creative energy)
- Accent: `#ffc107` (Warm gold)

To change the color scheme, edit the CSS variables at the top of `css/styles.css`.

## Deployment

This is a static website that can be deployed on any web hosting service. Simply upload all files to your web server.

## License

This project is provided as-is. Feel free to use and modify as needed for your Burning Man camp.