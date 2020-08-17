## reactcolorpicker
## Overview

This application is an adaptation of the final project taken from Colt Steele's React Course, which uses Class Components and prop drilling.
The application has been redesigned to exclusively use React Hooks in place of class components, Context API to manage state, and reducers to handle state updates.

The focus of this application is on Hooks and Context API, not styling. The styling is taken from Colt Steele's version and takes advantage of Material UI.

## Project Screenshots

Homepage Screenshot
![Homepage image] (../public/readme_images/Homepage.jpg)

The user has the ability to create their own palette of colors, with drag-and-drop functionality added to palette ordering
![Ability to create own palette of colors image] (../public/readme_images/createPalette.jpg)

View of a custom palette with the ability to change the color intensity level of the palette
![View of a color palette] (public/readme_images/paletteView.jpg)

A user can select a color from a palette and see nine different variations of that particular color
![Variations of a single color] (public/readme_images/colorView.jpg)

Example of responsive design
![Example of responsive design] (public/readme_images/responsiveDesign.jpg)

## View The Project

To see this repository, please visit this webpage (https://jb-reactcolorpicker.netlify.app/)

## Reflection

The goal of this project was to get more experience using React hooks and gain practice managing state. Although this project was taken from Colt Steele's React course, I made the project my own by implementing the project solely using Hooks, Context API and reducers. This provided the opportunity to gain experience reading React documentation, blog articles on Context API and implementing my own solution to the problems presented in the app.

One key takeaway I have learned from this project is the unexpected performance implications of usings Context API and the useReducer function from React. I found myself having to go back and refactor some contexts I had created and separate others to better performance. This lead me to spending a few days researching performance optimizations for React Hooks and understanding how to better architect a project in the future.
