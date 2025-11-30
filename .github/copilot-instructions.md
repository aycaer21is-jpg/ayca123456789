# Copilot Instructions

## Project Overview

This repository contains an interactive web application that displays a map of Iceland at admin level 6 using D3.js and TopoJSON. The application is a client-side only web visualization with no server-side components.

## Technologies Used

- **HTML5**: Page structure (`index_Version21.html`)
- **CSS3**: Styling (`styles_Version2.css`)
- **JavaScript (ES6+)**: Application logic (`main_Version2.js`)
- **D3.js v7**: Data visualization and map rendering
- **TopoJSON**: Geographic data format for the Iceland map

## Project Structure

- `index_Version21.html` - Main HTML entry point
- `main_Version2.js` - JavaScript application logic for D3 map rendering
- `styles_Version2.css` - CSS styling for the application
- `data_Iceland_admin_level_6_Version2.topojson` - Geographic data file
- `README.md` - Project documentation

### File Reference Setup

The HTML file expects the following file structure to run correctly:
- `styles.css` - Create by copying or renaming `styles_Version2.css`
- `main.js` - Create by copying or renaming `main_Version2.js`
- `data/Iceland_admin_level_6.topojson` - Create a `data/` folder and copy or rename the TopoJSON file

## Development Guidelines

### Code Style

- Use ES6+ JavaScript features (const/let, arrow functions, template literals)
- Follow consistent indentation (2 spaces)
- Use meaningful variable and function names
- Keep functions small and focused on a single responsibility

### File Naming

- Use descriptive file names with version suffixes where applicable
- Data files should be placed in appropriate locations and referenced correctly

### Making Changes

1. Test changes in a modern web browser (Chrome, Firefox, Edge, Safari)
2. Ensure the map renders correctly and all interactive features work
3. Verify hover tooltips, click-to-zoom, and color mode switching functionality
4. Check browser console for any JavaScript errors

### Testing

1. Set up file references (see "File Reference Setup" above)
2. Open `index_Version21.html` in a browser to test the application
3. Verify map loads correctly from the TopoJSON data
4. Test interactive features: hover info, click zoom, reset zoom, fill mode toggle
5. Check responsive behavior and styling consistency

## Key Features to Maintain

- Map rendering with proper projection fitting
- Hover tooltips showing feature information
- Click-to-zoom functionality on regions
- Reset zoom button
- Fill mode selector (by ID or random colors)
- Smooth transitions and animations
