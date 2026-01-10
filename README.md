# ChatGPT-like Web Application

A complete ChatGPT-like web application built with React JS featuring a modern dark theme UI with the following modules:

## Features

### 1. Initial Home Screen
- Centered card with "Ask Anything" text
- On clicking, reveals three interactive cards: Ask Anything, Make Design, Rebuild Anything
- Clean animations and premium AI-style layout

### 2. Ask Anything Module
- ChatGPT-style chat interface
- User questions and AI answers in chat bubbles
- Message alignment similar to ChatGPT
- Input bar with text prompt field and "+" icon for file uploads
- Uploaded images/files appear inline in chat
- Fullscreen view option for each question/answer block
- Editable title and subject in fullscreen mode
- Save/update functionality

### 3. Make Design Module
- ChatGPT-like prompt interface focused on design generation
- Allows designing images, posters, social media creatives, flyers, banners
- Real-time design preview
- Editing options for title, subject, images, colors, background, text style
- Export options: PDF, PPT, PNG formats
- Custom size selection (width × height)
- Print functionality

### 4. Rebuild Anything Module
- Allows uploading existing designs (images, PDF, PPT, etc.)
- Edit and redesign functionality
- Same editing and export features as Make Design
- Version control and update capabilities
- Re-download functionality

## Tech Stack

- React JS
- Vite
- Framer Motion (animations)
- React Icons
- React Router DOM
- @fontsource/inter (Inter font)

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Folder Structure

```
src/
├── components/           # Reusable UI components
├── contexts/            # React context providers
├── pages/               # Main page components
├── styles/              # CSS stylesheets
├── utils/               # Utility functions
├── App.jsx              # Main application component
└── main.jsx             # Entry point
```

## Responsive Design

The application is fully responsive and works on desktop, tablet, and mobile devices.

## Dark Theme

The application features a modern dark theme similar to ChatGPT with carefully chosen color palette for optimal readability and aesthetics.