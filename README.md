## Overview

This application is an adaptation of the final project taken from Colt Steele's React Course, which uses Class Components and prop drilling.
The application has been redesigned to exclusively use React Hooks in place of class components. It also takes advantage of Context API to manage state across most of the app, avoiding prop drilling. In some cases, the app will manage state within a component and utilize the passing of props. The choice to to use useState vs Context API was made depending on what made the best sense for that particular component.

The focus of this application is on Hooks and Context API, not styling. The styling is taken from Colt Steele's version and takes advantage of Material UI.

## Explanation of Terms Used In App

allPalettes - The entire collection of palettes that will be displayed on the homepage. Starter palette taken from seedColors.

SinglePalette - A single palette chocie that will be shown when you go to the route for that palette

colors - Custom colors that a user can pick for a custom palette