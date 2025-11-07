// --- 1. DOM ELEMENTS & APP STATE ---
const app = document.getElementById('app');
const navButtons = document.querySelectorAll('nav button');
const themeToggle = document.getElementById('themeToggle');

let bibleData = {};
let books = [];

// Quiz State
const quizState = {
  currentQ: 0,
  score: 0
};

// Quiz Questions (Expanded for a better experience)
const quizQuestions = [
  { question: "Who was swallowed by a great fish?", options: ["Moses", "Jonah", "David", "Paul"], answer: 1 },
  { question: "How many disciples did Jesus have?", options: ["10", "12", "15", "7"], answer: 1 },
  { question: "What is the first book of the Bible?", options: ["Exodus", "Genesis", "Matthew", "Psalms"], answer: 1 },
  { question: "Who built the ark?", options: ["Noah", "Abraham", "Moses", "David"], answer: 0 },
  { question: "What was Jesus' first miracle?", options: ["Healing a blind man", "Turning water into wine", "Feeding 5000", "Walking on water"], answer: 1 },
  { question: "Who betrayed Jesus?", options: ["Peter", "Judas", "John", "Thomas"], answer: 1 },
  { question: "How many plagues in Egypt?", options: ["7", "10", "12", "40"], answer: 1 },
  { question: "Where was Jesus born?", options: ["Nazareth", "Jerusalem", "Bethlehem", "Galilee"], answer: 2 },
  { question: "Who led the Israelites out of Egypt?", options: ["Abraham", "Moses", "Joshua", "Samuel"], answer: 1 },
  { question: "What is the longest book in the Bible?", options: ["Genesis", "Psalms", "Isaiah", "Jeremiah"], answer: 1 },
  { question: "Who was the mother of Samuel?", options: ["Ruth", "Esther", "Hannah", "Mary"], answer: 2 },
  { question: "What garden did Jesus pray in before his arrest?", options: ["Eden", "Gethsemane", "Babylon", "Zion"], answer: 1 },
  { question: "Which mountain did Moses receive the Ten Commandments on?", options: ["Mount of Olives", "Mount Carmel", "Mount Horeb (Sinai)", "Mount Hermon"], answer: 2 },
  { question: "What was Saul's name changed to?", options: ["Stephen", "Peter", "John", "Paul"], answer: 3 },
  { question: "Who wrestled with God and had his name changed to Israel?", options: ["Abraham", "Isaac", "Jacob", "Joseph"], answer: 2 },
  { question: "Which biblical figure killed the giant Goliath?", options: ["Saul", "Samson", "David", "Joshua"], answer: 2 },
  { question: "How many days did Jesus fast in the wilderness?", options: ["7", "40", "12", "30"], answer: 1 },
  { question: "Which book follows the Gospels (Matthew, Mark, Luke, John)?", options: ["Romans", "Acts", "Hebrews", "Revelation"], answer: 1 },
  { question: "What type of tree did Zacchaeus climb to see Jesus?", options: ["Oak", "Fig", "Sycamore", "Olive"], answer: 2 },
  { question: "Who was the first person to see the resurrected Jesus, according to John 20?", options: ["Peter", "Mary Magdalene", "Thomas", "John"], answer: 1 },
  { question: "How many stones did David take with him to fight Goliath?", options: ["One", "Three", "Five", "Ten"], answer: 2 },
  { question: "Which river was Jesus baptized in?", options: ["Tigris", "Euphrates", "Jordan", "Nile"], answer: 2 },
  { question: "What was the name of the garden where Adam and Eve lived?", options: ["Gethsemane", "Eden", "Canaan", "Paradise"], answer: 1 },
  { question: "Which Apostle denied Jesus three times?", options: ["Andrew", "Philip", "Thomas", "Peter"], answer: 3 },
  { question: "Who was Abraham's son promised by God?", options: ["Ishmael", "Lot", "Isaac", "Esau"], answer: 2 },
  { question: "Which prophet was thrown into a lion's den?", options: ["Elijah", "Jeremiah", "Daniel", "Ezekiel"], answer: 2 },
  { question: "What city's walls fell after the Israelites marched around it?", options: ["Jerusalem", "Babylon", "Jericho", "Samaria"], answer: 2 },
  { question: "Who was the queen that visited King Solomon?", options: ["Queen Esther", "Queen of Sheba", "Queen Jezebel", "Queen Vashti"], answer: 1 },
  { question: "What did Jesus feed the 5,000 people with?", options: ["Wine and bread", "Manna and water", "Loaves and fish", "Grapes and dates"], answer: 2 },
  { question: "Which book contains the story of the fiery furnace and three friends?", options: ["Esther", "Daniel", "Nehemiah", "Haggai"], answer: 1 },
  { question: "Who wrote the majority of the book of Psalms?", options: ["Solomon", "Moses", "David", "Asaph"], answer: 2 },
  { question: "In the New Testament, what trade was Jesus' earthly father, Joseph?", options: ["Fisherman", "Tax collector", "Carpenter", "Shepherd"], answer: 2 },
  { question: "What was the first plague God inflicted upon Egypt?", options: ["Frogs", "Darkness", "Water turned to blood", "Lice"], answer: 2 },
  { question: "How many books are there in the New Testament?", options: ["39", "27", "66", "45"], answer: 1 },
  { question: "What were the names of Adam and Eve's first two sons?", options: ["Seth and Abel", "Cain and Abel", "Shem and Ham", "Jacob and Esau"], answer: 1 },
  { question: "What was the name of the prophet who anointed Saul and David as kings?", options: ["Elijah", "Isaiah", "Jeremiah", "Samuel"], answer: 3 },
  { question: "In which city did the Apostle Paul have his vision and conversion experience?", options: ["Jerusalem", "Damascus", "Antioch", "Rome"], answer: 1 },
  { question: "What is the collective name for the first five books of the Bible?", options: ["Prophets", "Gospels", "Pentateuch (Torah)", "Apocrypha"], answer: 2 },
  { question: "What did Esau sell to Jacob for a bowl of stew?", options: ["His inheritance", "His cloak", "His birthright", "His field"], answer: 2 },
  { question: "What object did Moses use to turn the bitter water sweet at Marah?", options: ["His staff", "A stone", "A piece of wood", "Salt"], answer: 2 },
  { question: "How old was Noah when the flood began?", options: ["120", "450", "600", "950"], answer: 2 },
  { question: "Who denied having known Jesus while warming himself by a fire?", options: ["John", "Judas", "Peter", "Thomas"], answer: 2 },
  { question: "What did the wise men (Magi) follow to find Jesus?", options: ["An angel", "A bright cloud", "A star", "A vision"], answer: 2 },
  { question: "Which Old Testament book contains the 'Shema' ('Hear, O Israel')?", options: ["Exodus", "Leviticus", "Numbers", "Deuteronomy"], answer: 3 },
  { question: "What did Samson lose that caused him to lose his great strength?", options: ["His shield", "His eyesight", "His hair", "His temper"], answer: 2 },
  { question: "The book of Revelation was written by which Apostle?", options: ["Paul", "Peter", "John", "Matthew"], answer: 2 },
  { question: "What did the prodigal son ask his father for before he left home?", options: ["A blessing", "His inheritance", "A new cloak", "A servant"], answer: 1 },
  { question: "Who was the Roman governor who presided over the trial of Jesus?", options: ["Herod", "Caesar Augustus", "Pontius Pilate", "Felix"], answer: 2 },
  { question: "What was the name of the city Jesus grew up in?", options: ["Bethlehem", "Nazareth", "Jerusalem", "Capernaum"], answer: 1 },
  { question: "In the parable of the sower, what represents those who receive the word but are distracted by worldly cares?", options: ["Rocky ground", "Path", "Thorns", "Good soil"], answer: 2 }
];


// --- 2. INITIALIZATION & THEME LOGIC ---

// Load theme from localStorage on startup
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

// Handle theme toggle clicks
if (themeToggle) {
    themeToggle.onclick = () => {
      document.body.classList.toggle('dark');
      const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem('theme', currentTheme);
    };
}


// --- 3. NAVIGATION LOGIC ---

navButtons.forEach(btn => {
  btn.onclick = () => {
    // Update active button state
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Load the correct view
    const view = btn.dataset.view;
    if (view === 'quiz') loadQuizView(); // Now calls the new function
    else if (view === 'reader') loadReader();
    else if (view === 'search') loadSearch();
    else if (view === 'bookmarks') loadBookmarks();
  };
});

// --- 4. DATA LOADING ---

async function loadData() {
  try {
    const [booksResponse, dataResponse] = await Promise.all([
      fetch('data/books.json'),
      fetch('data/kjv.json')
    ]);

    if (!booksResponse.ok || !dataResponse.ok) {
      throw new Error('Failed to fetch app data');
    }

    books = await booksResponse.json();
    bibleData = await dataResponse.json();

  } catch (error) {
    console.error(error);
    app.innerHTML = `<p class="error">Error loading Bible data. Please check your 'data' folder and network connection.</p>`;
  }
}

// --- 5. QUIZ VIEW FUNCTIONS ---

function loadQuizView() {
  // Reset state and render the first question
  quizState.currentQ = 0;
  quizState.score = 0;
  renderQuiz();
}

function renderQuiz() {
  // Check if quiz is over
  if (quizState.currentQ >= quizQuestions.length) {
    renderQuizEndScreen();
    return;
  }
  
  // Get current question data
  const q = quizQuestions[quizState.currentQ];
  
  // Generate HTML for options
  const optionsHtml = q.options.map((opt, i) => `
    <button class="option quiz-option" data-index="${i}">${opt}</button>
  `).join('');

  // Set the HTML for the app
  app.innerHTML = `
    <div class="quiz">
      <h3>Question ${quizState.currentQ + 1} of ${quizQuestions.length}: ${q.question}</h3>
      <div class="options-container">
        ${optionsHtml}
      </div>
      <p class="mt-4 text-sm text-center">Current Score: ${quizState.score}</p>
    </div>
  `;
}

function renderQuizEndScreen() {
  const percentage = Math.round((quizState.score / quizQuestions.length) * 100);
  app.innerHTML = `
    <div class="quiz-end-screen text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
      <h2 class="text-3xl font-bold mb-4">Quiz Complete!</h2>
      <p class="text-xl mb-6">You answered ${quizState.score} out of ${quizQuestions.length} questions correctly.</p>
      <p class="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-8">Score: ${percentage}%</p>
      <button id="quiz-restart-btn" class="text-lg px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition">Restart Quiz</button>
    </div>
  `;
}

function handleQuizAnswer(button) {
  const selected = parseInt(button.dataset.index);
  const q = quizQuestions[quizState.currentQ];
  const correctAnswerIndex = q.answer;

  // Disable all option buttons
  const allOptions = app.querySelectorAll('.quiz-option');
  allOptions.forEach(btn => btn.disabled = true);

  // Check if correct and apply classes
  if (selected === correctAnswerIndex) {
    quizState.score++;
    button.classList.add('correct');
  } else {
    button.classList.add('incorrect');
    // Highlight the correct answer
    allOptions[correctAnswerIndex].classList.add('correct');
  }

  // Go to the next question after a delay
  setTimeout(() => {
    quizState.currentQ++;
    renderQuiz();
  }, 1500);
}


// --- 6. READER VIEW FUNCTIONS ---

function loadReader() {
  const selectHTML = books.map(b => `<option value="${b.abbrev}">${b.name}</option>`).join('');
  
  app.innerHTML = `
  
    
      <div class="reader-controls">
        <select id="bookSelect">${selectHTML}</select>
        <input type="number" id="chapter" min="1" max="150" value="1">
        <button id="loadChapter">Load Chapter</button>
      </div>
      <div id="verseList"></div>
    </div>
  `;
  
}

function loadChapter() {
  const bookSelect = document.getElementById('bookSelect');
  const chapterInput = document.getElementById('chapter');
  const verseList = document.getElementById('verseList');

  if (!bookSelect || !chapterInput || !verseList) return;

  const book = bookSelect.value;
  const ch = parseInt(chapterInput.value);
  const chapter = bibleData[book]?.[ch] || [];

  const versesHTML = chapter.map((verse, i) => `
    <div class="verse">
      <span class="verse-num">${i + 1}</span> ${verse.text}
      <button class="bookmark-btn" data-ref="${book} ${ch}:${i+1}" data-text="${verse.text}">⭐</button>
    </div>
  `).join('');
  
  verseList.innerHTML = versesHTML || '<p>Chapter not found.</p>';
}

// --- 7. SEARCH VIEW FUNCTIONS ---

function loadSearch() {
  app.innerHTML = `
    <div class="search-view">
      <input type="text" id="searchInput" placeholder="Search verses...">
      <button id="searchBtn">Search</button>
      <div id="searchResults"><p>Enter a term and click search.</p></div>
    </div>
  `;
}

function runSearch(query) {
  const results = [];
  if (!query || query.length < 2) return [];

  const lowerQuery = query.toLowerCase();

  for (const book in bibleData) {
    for (const ch in bibleData[book]) {
      bibleData[book][ch].forEach((verse, v) => {
        if (verse.text.toLowerCase().includes(lowerQuery)) {
          results.push({ ref: `${book} ${ch}:${v+1}`, text: verse.text });
        }
      });
    }
  }
  return results;
}

// --- 8. BOOKMARK FUNCTIONS ---

function saveBookmark(ref, text) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  
  if (!bookmarks.some(b => b.ref === ref)) {
    bookmarks.push({ ref, text, date: new Date().toISOString() });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    return true; 
  }
  return false; 
}

function loadBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  
  const html = bookmarks.map(b => `
    <div class="bookmark">
      <p><strong>${b.ref}</strong></p>
      <p>${b.text}</p>
      <small>${new Date(b.date).toLocaleDateString()}</small>
    </div>
  `).join('') || '<p>No bookmarks.</p>';

  app.innerHTML = `<div class="bookmarks-list">${html}</div>`;
}

// --- 9. EVENT DELEGATION (MAIN HANDLER) ---

async function handleAppClick(event) {
  const target = event.target;

  // Case 1: Clicked "Load Chapter" button
  if (target.id === 'loadChapter') {
    loadChapter();
  }

  // Case 2: Clicked "Search" button
  if (target.id === 'searchBtn') {
    const input = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('searchResults');
    
    resultsContainer.innerHTML = '<p>Searching...</p>';
    await new Promise(resolve => setTimeout(resolve, 0)); // Allows UI update
    
    const results = runSearch(input.value);

    if (results.length === 0) {
      resultsContainer.innerHTML = '<p>No results found.</p>';
    } else {
      const html = results.slice(0, 100)
        .map(r => `<p><strong>${r.ref}</strong>: ${r.text}</p>`).join('');
      resultsContainer.innerHTML = html;
    }
  }
  
  // Case 3: Clicked a bookmark button
  const bookmarkBtn = target.closest('.bookmark-btn');
  if (bookmarkBtn) {
    const { ref, text } = bookmarkBtn.dataset;
    if (saveBookmark(ref, text)) {
      bookmarkBtn.textContent = '💾';
      bookmarkBtn.disabled = true;
    } else {
      bookmarkBtn.textContent = '✅';
    }
  }

  // Case 4: Clicked a quiz option button
  if (target.classList.contains('quiz-option')) {
    handleQuizAnswer(target);
  }

  // Case 5: Clicked quiz restart button
  if (target.id === 'quiz-restart-btn') {
    loadQuizView(); // Calls the function to reset state and render first Q
  }
}

// --- 10. APP STARTUP ---

async function initializeApp() {
  if (app) {
      // 1. Set up the single event listener
      app.addEventListener('click', handleAppClick);

      // 2. Wait for data to load
      await loadData();

      // 3. Load the default view (Reader)
      loadReader();
      
      // 4. Set the 'reader' nav button as active
      navButtons.forEach(btn => {
        if (btn.dataset.view === 'reader') {
          btn.classList.add('active');
        }
      });
  }
}


// Run the app!

initializeApp();
