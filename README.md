# Bible Study & Quiz PWA

A Progressive Web App for Bible reading, searching, bookmarking, note-taking, and trivia quizzes. Works offline!

## Features
- *Reader*: Browse any book/chapter (KJV).
- *Search*: Find verses by keyword.
- *Bookmarks & Notes*: Save & annotate verses.
- *Quiz Game*: 50+ multiple-choice questions with scoring.
- *PWA*: Installable, offline, dark mode.
- *Responsive*: Mobile-first.

## Setup

2. Open index.html in a browser (or host on GitHub Pages).
3. For PWA: Serve over HTTPS (GitHub Pages auto-does this).
4. Offline Test: Load once, go offline, refresh.

## Tech
- Vanilla JS/HTML/CSS.
- Local Storage for bookmarks.
- Service Worker for caching.
- KJV data from public domain [aruljohn/Bible-kjv](https://github.com/aruljohn/Bible-kjv).

## Customize
- Add quiz questions in quiz.js.
- Extend with IndexedDB for more data.
- API Integration: Swap KJV JSON with Bible API for other versions.

## License
MIT – Free to use/modify.