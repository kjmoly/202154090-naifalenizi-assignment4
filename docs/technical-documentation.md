# Technical Documentation

## Project Overview

This project is the final polished version of my personal portfolio web application developed using HTML, CSS, and JavaScript.

It brings together the concepts and features implemented throughout the previous assignments into one complete application with a more professional structure, improved design, stronger usability, and presentation-ready organization.

## Project Structure

The project is organized as follows:

- `index.html` → main webpage structure
- `css/styles.css` → styling, layout, responsive design, and theme support
- `js/script.js` → JavaScript logic for greeting, tabs, theme toggle, visitor name, timer, GitHub API, repository search, filtering, sorting, and form validation
- `docs/technical-documentation.md` → technical explanation of the project
- `docs/ai-usage-report.md` → explanation of how AI tools were used
- `presentation/slides.pdf` → final presentation slides
- `presentation/demo-video.mp4` → project demonstration video

## Complete Application Design

The website is designed as a complete portfolio-style application with multiple sections:

- About
- Skills
- Projects
- GitHub
- Contact

This structure makes the final application more professional and easier to present compared to the earlier assignments.

## API Integration

The application uses the GitHub API to load public repositories dynamically.

The website sends a request to the GitHub API, receives repository data, and displays it in the GitHub section.

This data is then used in several ways:
- displaying repository cards
- filtering repositories by language
- sorting repositories by name, stars, or update date
- calculating quick GitHub statistics

The application also provides user-friendly feedback while the repositories are loading or if the API request fails.

## Application Logic

This project includes multiple layers of application logic.

The GitHub section supports:
- searching repositories by name or description
- filtering by programming language
- sorting by update date, name, or stars

The contact form uses step-by-step validation. It checks:
- if fields are empty
- if the name is long enough
- if the email format is valid
- if the message meets the minimum length

The application only shows success after all checks pass.

## State Management

The project uses `localStorage` to preserve key user preferences and interactions.

The following values are stored:
- selected theme
- saved visitor name
- selected GitHub language filter
- selected sorting option
- repository search term
- active tab

This helps the website feel more consistent and interactive when the page is refreshed.

## User Experience Features

Several features were added to improve the experience of using the application:

- navigation tabs for section switching
- saved dark/light theme
- visitor welcome message
- time-on-site counter
- statistics cards
- repository search, filtering, and sorting
- loading, empty-state, success, and error messages
- quick links in the contact section

These features help make the website feel more complete and presentation-ready.

## Performance Considerations

The project was kept lightweight and efficient by:
- using plain HTML, CSS, and JavaScript
- avoiding unnecessary libraries
- keeping files organized and simple
- reusing functions instead of repeating code
- using one local image for the profile section
- keeping the design clean and manageable

These choices improve load speed and make the project easier to maintain.

## Responsiveness and Compatibility

The layout uses responsive CSS with flexible grids and stacked layouts for smaller screens.

The website is designed to work clearly across desktop and mobile screens and to remain readable in both light and dark mode.

## Professional Presentation Readiness

This final version was designed not only to work as a website, but also to be suitable for demonstration and presentation.

The structure supports:
- clear explanation of features
- smooth navigation during a live demo
- visible technical highlights
- easy reference to repository and live deployment links

## Summary

This project demonstrates a complete personal web application that combines interface design, front-end programming, API integration, application logic, state management, validation, responsiveness, and professional presentation quality in one final portfolio website.
