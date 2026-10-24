# 📚 WORDMe

**WORDMe** is a sleek, responsive Single Page Application (SPA) dictionary web app built with JavaScript. It allows users to search for word definitions, explore phonetic pronunciations, listen to audio output, track recent search history, and maintain a personal collection of favorite words.

## 🚀 Features

- **Real-Time Dictionary Lookup:** Fetches definitions, parts of speech, phonetic transcriptions, synonyms, and contextual example sentences using the Free Dictionary API.
- **Smart Input Handling:** Automatically cleans user input by trimming spaces, removing accidental internal spaces, and handling capitalization seamlessly.
- **Text-to-Speech Pronunciation:** Uses the browser's native Web Speech API so users can listen to word pronunciations aloud.
- **Recent Searches History:** Tracks searched words and saves them.
- **Favorites Collection:** Allows users to save and manage their favorite words in a dedicated collection.
- **Light & Dark Mode:** Includes a theme switcher for a clean light theme and an eye-friendly dark theme.
- **Responsive Layout:** Uses CSS Grid and Flexbox to adapt the interface to mobile, tablet, and desktop screen sizes.

## 🛠️ Tech Stack

- **HTML5:** Semantic document structure.
- **CSS3:** Custom styling, CSS Grid, Flexbox, responsive design, and dynamic dark-mode states.
- **Vanilla JavaScript (ES6+):** DOM manipulation, asynchronous `fetch` API handling, event listeners, and application state management.
- **APIs & Web APIs:**
  - [Free Dictionary API](https://freedictionaryapi.com/) — provides word data.
  - Browser `SpeechSynthesis` API — provides text-to-speech pronunciation.

## 📁 Project Structure

```text
wordme/
│
├── index.html    # Main HTML structure and markup
├── style.css     # Application styles, layouts, and dark-mode themes
└── index.js      # Application logic, API calls, event listeners, and DOM rendering
```

## ⚙️ Getting Started & Local Setup

To run this project locally:

1. Clone or download this repository to your computer.
2. Ensure that `index.html`, `style.css`, and `index.js` are in the same directory.
3. Open `index.html` in a modern web browser such as Chrome, Firefox, Edge, or Safari.

### 💡 Recommended Development Setup

If you are using Visual Studio Code, you can right-click `index.html` and select **Open with Live Server**.

## 💡 How to Use

### 1. Search for a Word

Type an English word into the search bar and click **Search** or press **Enter**.

WORDMe automatically handles capitalization and leading/trailing spaces.

### 2. Explore Meanings

View the word's:

- Part of speech
- Definition
- Pronunciation
- Synonyms
- Example sentence

### 3. Listen to Pronunciation

Click the **🔊 Listen** button next to the phonetic pronunciation to hear the word spoken using your browser's built-in speech synthesis.

### 4. Save Favorites

Click **Save Word** to add the current word to your **Favorites** collection.

### 5. Revisit Recent Searches

Use the **Recent Searches** section to view words you have previously searched.

### 6. Toggle Theme

Click the **🌙 Dark / ☀️ Light** button in the top-right corner to switch between light and dark themes.

## 📌 Project Goals

WORDMe was built as a Single Page Application to practice:

- Working with APIs
- Using `fetch()` and asynchronous JavaScript
- DOM manipulation
- Event handling
- Dynamic content rendering
- Managing application state
- Responsive CSS design
- Implementing light and dark themes
- Working with browser Web APIs

## 👩‍💻 Developer

Wendy Wahome

---

**Built with HTML, CSS, and Vanilla JavaScript.** 💚