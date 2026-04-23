# Technical Documentation

## Project Overview

This project is an advanced version of my personal portfolio website developed using HTML, CSS, and JavaScript.

It builds on Assignments 1 and 2 by adding external API integration, stronger application logic, state management, and improved user interaction.

## Project Structure

The project is organized as follows:

- `index.html` → main webpage structure
- `css/styles.css` → styling, layout, transitions, dark mode, and responsive design
- `js/script.js` → JavaScript logic for greeting, tabs, theme toggle, visitor name, site timer, GitHub API, filtering, sorting, and form validation
- `docs/technical-documentation.md` → technical explanation of the project
- `docs/ai-usage-report.md` → explanation of how AI tools were used

## API Integration

The website integrates with the GitHub API to fetch public repositories dynamically.

The application sends a request to the GitHub API, receives repository data, and displays it inside the portfolio website.

The repository section also handles loading states and error messages so the user receives clear feedback if the API request fails.

## Complex Logic

This project includes more advanced logic than the previous assignment.

The GitHub repositories can be filtered by language and sorted by:
- last updated date
- repository name
- number of stars

This means the application applies multiple steps to the same data before displaying it.

The contact form also uses multi-step validation. It checks:
- if fields are empty
- if the name is long enough
- if the email format is valid
- if the message meets the minimum length

Only after all conditions are satisfied does the form show a success message.

## State Management

The project uses `localStorage` to store and restore user preferences.

The following states are managed:
- selected theme
- selected repository filter
- selected sorting option
- saved visitor name

This helps the website remain consistent when the page is refreshed.

## User Interaction Features

Several interactive features were added to improve usability:

- navigation tabs for switching sections
- dark mode and light mode toggle
- visitor name saving and display
- time-on-site counter
- repository refresh button
- live character counter for the contact form

These features make the website more dynamic and responsive to the user.

## Error Handling and Feedback

The application provides feedback in several areas.

For the GitHub API section:
- a loading message is shown while data is being fetched
- a success message is shown when repositories load correctly
- an error message is shown if the API request fails
- an empty-state message is shown if no repositories match the selected filter

For the contact form:
- clear validation messages are displayed when input is invalid
- a success message is shown when the form is completed correctly

## Performance Considerations

The project was kept lightweight and simple to improve performance.

The following steps were considered:
- using a simple file structure
- avoiding unnecessary libraries
- keeping CSS and JavaScript organized
- reusing functions instead of repeating code
- using a small local image for the profile section

These choices help the site load quickly and remain easy to maintain.

## Responsiveness

The layout uses responsive CSS so the website works on different screen sizes.

Grids and flexible layouts were used for the projects and repository cards.

The design remains readable and usable on desktop and mobile screens.

## Summary

This project demonstrates advanced front-end functionality by combining API integration, application logic, state management, validation, and user feedback in one portfolio website.
