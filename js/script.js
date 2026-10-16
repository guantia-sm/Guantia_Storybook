// ---------- Footer: always full width, directly inside <body> ----------
var pageFooter = document.querySelector("footer");
if (pageFooter && pageFooter.parentElement !== document.body) {
  document.body.appendChild(pageFooter);
}

// ---------- Light / dark mode ----------
var savedTheme = localStorage.getItem("theme");
var theme = savedTheme || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
document.documentElement.setAttribute("data-theme", theme);

var navList = document.querySelector("header nav ul");
if (navList) {
  var themeItem = document.createElement("li");
  var themeBtn = document.createElement("button");
  themeBtn.className = "theme-btn";
  themeBtn.type = "button";
  themeItem.appendChild(themeBtn);
  navList.appendChild(themeItem);

  function updateThemeButton() {
    themeBtn.textContent = (theme === "dark") ? "\u2600 Light mode" : "\u263E Dark mode";
  }

  themeBtn.addEventListener("click", function () {
    theme = (theme === "dark") ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateThemeButton();
  });

  updateThemeButton();
}

// ---------- Story order (used for the side panel) ----------
// Each line: [file name without .html, title, cover image file]
var stories = [
  ["the-hobbit", "The Hobbit", "the-hobbit.jpg"],
  ["smaller-and-smaller-circles", "Smaller and Smaller Circles", "smaller-and-smaller-circles.jpg"],
  ["project-hail-mary", "Project Hail Mary", "project-hail-mary.png"],
  ["the-notebook", "The Notebook", "the-notebook.jpg"],
  ["the-fault-in-our-stars", "The Fault in Our Stars", "the-fault-in-our-stars.jpg"],
  ["violet-evergarden", "Violet Evergarden", "violet-evergarden.png"],
  ["the-girl-on-the-train", "The Girl on the Train", "the-girl-on-the-train.jpg"],
  ["the-haunting-of-hill-house", "The Haunting of Hill House", "the-haunting-of-hill-house.jpg"],
  ["to-kill-a-mockingbird", "To Kill a Mockingbird", "to-kill-a-mockingbird.png"],
  ["sword-art-online", "Sword Art Online", "sword-art-online.jpeg"],
  ["the-apothecary-diaries", "The Apothecary Diaries", "the-apothecary-diaries.jpg"],
  ["the-hunger-games", "The Hunger Games", "the-hunger-games.jpg"],
  ["if-cats-disappeared-from-the-world", "If Cats Disappeared from the World", "if-cats-disappeared-from-the-world.jpg"],
  ["that-time-i-got-reincarnated-as-a-slime", "That Time I Got Reincarnated as a Slime", "that-time-i-got-reincarnated-as-a-slime.jpg"],
  ["the-lightning-thief", "Percy Jackson and the Lightning Thief", "the-lightning-thief.jpg"],
  ["cinderella", "Cinderella", "cinderella.jpg"],
  ["snow-white", "Snow White", "snow-white.jpeg"],
  ["how-to-train-your-dragon", "How to Train Your Dragon", "how-to-train-your-dragon.jpg"],
  ["harry-potter-philosophers-stone", "Harry Potter and the Philosopher's Stone", "harry-potter-philosophers-stone.jpeg"],
  ["the-day-the-crayons-quit", "The Day the Crayons Quit", "the-day-the-crayons-quit.png"],
  ["winnie-the-pooh", "Winnie-the-Pooh", "winnie-the-pooh.png"],
  ["shutter-island", "Shutter Island", "shutter-island.jpg"],
  ["pet-sematary", "Pet Sematary", "pet-sematary.jpg"],
  ["a-little-princess", "A Little Princess", "a-little-princess.png"],
  ["number-the-stars", "Number the Stars", "number-the-stars.jpg"],
  ["it", "It", "it.jpg"],
  ["the-wonderful-wizard-of-oz", "The Wonderful Wizard of Oz", "the-wonderful-wizard-of-oz.jpg"],
  ["what-do-you-do-with-an-idea", "What Do You Do with an Idea?", "what-do-you-do-with-an-idea.png"],
  ["the-rabbit-listened", "The Rabbit Listened", "the-rabbit-listened.png"],
  ["scary-stories-to-tell-in-the-dark", "Scary Stories to Tell in the Dark", "scary-stories-to-tell-in-the-dark.jpeg"]
];

// ---------- Update the story page layout (works on every story page) ----------
var storyArticle = document.querySelector("main article");

if (storyArticle && document.getElementById("story-text")) {
  // undo the older layout if the page still has it
  var oldLayout = document.querySelector("main > .story-layout");
  if (oldLayout) {
    oldLayout.parentNode.insertBefore(storyArticle, oldLayout);
    oldLayout.remove();
    storyArticle.classList.remove("story-content");
  }

  // remove the old Previous / Back to Library / Next buttons
  var oldPager = storyArticle.querySelector(".pager");
  if (oldPager) { oldPager.remove(); }

  // move the genres under the title
  var genreBadges = storyArticle.querySelector(".story-top .badges");
  var titleRow = storyArticle.querySelector(".title-row");
  if (genreBadges && titleRow && titleRow.nextElementSibling !== genreBadges) {
    titleRow.after(genreBadges);
  }

  // put the side panel at the right, level with the story text
  var readingArea = storyArticle.querySelector(".reading-area");
  if (readingArea) {
    var layout = document.createElement("div");
    layout.className = "story-layout";

    var sidePanel = document.createElement("aside");
    sidePanel.className = "story-nav";
    sidePanel.id = "story-nav";

    // Back to Library button, right above the top border of the story box
    var backRow = document.createElement("div");
    backRow.className = "back-row";
    backRow.innerHTML = '<a class="btn btn-outline" href="../library.html">Back to Library</a>';

    readingArea.parentNode.insertBefore(backRow, readingArea);
    backRow.after(layout);
    layout.appendChild(readingArea);
    layout.appendChild(sidePanel);
  }
}

var storyNav = document.getElementById("story-nav");

if (storyNav) {
  var thisFile = window.location.pathname.split("/").pop().replace(".html", "");
  var here = -1;

  for (var i = 0; i < stories.length; i++) {
    if (stories[i][0] === thisFile) { here = i; }
  }

  function bookLink(story, extraClass, label) {
    return '<a class="nav-book ' + extraClass + '" href="' + story[0] + '.html" title="' + label + '">' +
           '<img src="../images/covers/' + story[2] + '" alt="Cover of ' + story[1] + '">' +
           story[1] + '</a>';
  }

  var html = "";

  // the story before this one (at the top)
  if (here > 0) {
    html += bookLink(stories[here - 1], "", "Previous story");
  }
  // the story you are reading now
  if (here !== -1) {
    html += bookLink(stories[here], "current", "Currently reading");
  }
  // the next 3 stories
  for (var n = here + 1; here !== -1 && n <= here + 3 && n < stories.length; n++) {
    html += bookLink(stories[n], "", "Next story");
  }

  storyNav.innerHTML = '<div class="nav-inner">' + html + '</div>';
}

function getList(key) {
  var saved = localStorage.getItem(key);
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
}

function addToList(key, item) {
  var list = getList(key);
  if (list.indexOf(item) === -1) {
    list.push(item);
    localStorage.setItem(key, JSON.stringify(list));
  }
}

function showToggle(button, active, icon, offText, onText) {
  var image = button.querySelector("img");
  var label = button.querySelector("span");

  if (active) {
    if (image) { image.src = image.src.replace(icon + "-outline", icon + "-filled"); }
    if (label) { label.textContent = onText; }
    button.classList.add("liked");
  } else {
    if (image) { image.src = image.src.replace(icon + "-filled", icon + "-outline"); }
    if (label) { label.textContent = offText; }
    button.classList.remove("liked");
  }
}
function setupToggle(selector, key, icon, offText, onText) {
  var buttons = document.querySelectorAll(selector);

  for (var i = 0; i < buttons.length; i++) {
    connect(buttons[i]);
  }

  function connect(button) {
    if (getList(key).indexOf(button.dataset.id) !== -1) {
      showToggle(button, true, icon, offText, onText);
    }

    button.addEventListener("click", function () {
      var list = getList(key);
      var position = list.indexOf(button.dataset.id);

      if (position === -1) {
        list.push(button.dataset.id);
        showToggle(button, true, icon, offText, onText);
      } else {
        list.splice(position, 1);
        showToggle(button, false, icon, offText, onText);
      }

      localStorage.setItem(key, JSON.stringify(list));
    });
  }
}

setupToggle(".like-btn", "likes", "heart", "Like", "Liked");
setupToggle(".bookmark-btn", "bookmarks", "bookmark", "Bookmark", "Bookmarked");

if (document.getElementById("story-text")) {
  addToList("read", window.location.pathname.split("/").pop());
}
var readButtons = document.querySelectorAll(".read-btn");

for (var r = 0; r < readButtons.length; r++) {
  var readButton = readButtons[r];
  var fileName = readButton.getAttribute("href").split("/").pop();

  if (getList("read").indexOf(fileName) !== -1) {
    readButton.classList.add("read-done");
    readButton.textContent = "Read Again";
  }

  readButton.addEventListener("click", function () {
    addToList("read", this.getAttribute("href").split("/").pop());
  });
}

var synopsisButtons = document.querySelectorAll(".synopsis-btn");

for (var s = 0; s < synopsisButtons.length; s++) {
  synopsisButtons[s].addEventListener("click", function () {
    var text = this.parentElement.parentElement.querySelector(".synopsis");
    text.hidden = !text.hidden;
    this.textContent = text.hidden ? "Synopsis" : "Hide";
  });
}

var searchBox = document.getElementById("search");

if (searchBox) {
  var cards = document.querySelectorAll("#grid .card");
  var genreButtons = document.querySelectorAll(".genre-buttons button");
  var countText = document.getElementById("count");
  var selectedGenre = "All";

  function updateLibrary() {
    var word = searchBox.value.toLowerCase();
    var shown = 0;

    for (var c = 0; c < cards.length; c++) {
      var card = cards[c];
      var genreList = card.dataset.genres.split(",");
      var matchesGenre = (selectedGenre === "All" || genreList.indexOf(selectedGenre) !== -1);
      var matchesWord = card.textContent.toLowerCase().indexOf(word) !== -1;

      if (matchesGenre && matchesWord) {
        card.style.display = "";
        shown++;
      } else {
        card.style.display = "none";
      }
    }

    countText.textContent = shown + " books";
  }

  function setGenre(name) {
    selectedGenre = name;

    for (var b = 0; b < genreButtons.length; b++) {
      if (genreButtons[b].dataset.genre === name) {
        genreButtons[b].classList.add("selected");
      } else {
        genreButtons[b].classList.remove("selected");
      }
    }

    updateLibrary();
  }

  for (var g = 0; g < genreButtons.length; g++) {
    genreButtons[g].addEventListener("click", function () {
      setGenre(this.dataset.genre);
    });
  }

  searchBox.addEventListener("input", updateLibrary);

  var fromLink = new URLSearchParams(window.location.search).get("genre");
  if (fromLink) {
    setGenre(fromLink);
  } else {
    updateLibrary();
  }
}

var storyText = document.getElementById("story-text");

if (storyText) {
  var textSize = 19;

  document.getElementById("bigger").addEventListener("click", function () {
    if (textSize < 28) { textSize += 2; }
    storyText.style.fontSize = textSize + "px";
  });

  document.getElementById("smaller").addEventListener("click", function () {
    if (textSize > 14) { textSize -= 2; }
    storyText.style.fontSize = textSize + "px";
  });

  document.getElementById("go-top").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.getElementById("go-bottom").addEventListener("click", function () {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  });

  var paragraphsPerPage = 12;

  var paragraphs = storyText.querySelectorAll("p");
  var totalPages = Math.ceil(paragraphs.length / paragraphsPerPage);
  var currentPage = 1;
  var pageNavs = document.querySelectorAll(".page-nav");

  function showPage(number) {
    currentPage = number;

    for (var p = 0; p < paragraphs.length; p++) {
      var belongsToPage = Math.floor(p / paragraphsPerPage) + 1;
      paragraphs[p].style.display = (belongsToPage === currentPage) ? "" : "none";
    }

    for (var n = 0; n < pageNavs.length; n++) {
      pageNavs[n].querySelector(".page-info").textContent = "Page " + currentPage + " of " + totalPages;
      pageNavs[n].querySelector(".prev-page").disabled = (currentPage === 1);
      pageNavs[n].querySelector(".next-page").disabled = (currentPage === totalPages);
    }
  }

  if (totalPages > 1) {
    for (var n = 0; n < pageNavs.length; n++) {
      pageNavs[n].hidden = false;

      pageNavs[n].querySelector(".prev-page").addEventListener("click", function () {
        showPage(currentPage - 1);
        document.querySelector(".reading-area").scrollIntoView({ behavior: "smooth" });
      });

      pageNavs[n].querySelector(".next-page").addEventListener("click", function () {
        showPage(currentPage + 1);
        document.querySelector(".reading-area").scrollIntoView({ behavior: "smooth" });
      });
    }
    showPage(1);
  }

  var bar = document.getElementById("progress");

  window.addEventListener("scroll", function () {
    var scrollable = document.body.scrollHeight - window.innerHeight;
    var percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    bar.style.width = percent + "%";
  });
}


// ================= Book hover preview (popup) =================
(function () {
  if (!window.matchMedia('(hover: hover)').matches) return;
  if (!document.querySelector('.card')) return;

  var DELAY = 180;
  var GAP = 12;
  var MARGIN = 12;

  var tip = document.createElement('aside');
  tip.className = 'bp-preview';
  tip.setAttribute('aria-hidden', 'true');
  tip.innerHTML =
    '<img class="bp-cover" alt="">' +
    '<div class="bp-body">' +
      '<div class="bp-genres"></div>' +
      '<h4 class="bp-title"></h4>' +
      '<p class="bp-author"></p>' +
      '<p class="bp-summary"></p>' +
    '</div>';
  document.body.appendChild(tip);

  var cover = tip.querySelector('.bp-cover');
  var genres = tip.querySelector('.bp-genres');
  var title = tip.querySelector('.bp-title');
  var author = tip.querySelector('.bp-author');
  var summary = tip.querySelector('.bp-summary');

  var current = null;
  var timer = null;

  function text(el) {
    return el ? el.textContent.trim() : '';
  }

  function fill(card) {
    var img = card.querySelector('img');
    cover.src = img ? (img.currentSrc || img.src) : '';

    genres.textContent = '';
    (card.getAttribute('data-genres') || '').split(',').forEach(function (g) {
      g = g.trim();
      if (!g) return;
      var pill = document.createElement('span');
      pill.className = 'bp-genre';
      pill.textContent = g;
      genres.appendChild(pill);
    });

    title.textContent = text(card.querySelector('h3'));
    author.textContent = text(card.querySelector('.author'));
    summary.textContent = text(card.querySelector('.synopsis'));
  }

  function place(card) {
    var r = card.getBoundingClientRect();
    var w = tip.offsetWidth;
    var h = tip.offsetHeight;
    var vw = document.documentElement.clientWidth;
    var vh = window.innerHeight;
    var left, top;

    if (r.right + GAP + w + MARGIN <= vw) {
      left = r.right + GAP;
    } else if (r.left - GAP - w - MARGIN >= 0) {
      left = r.left - GAP - w;
    } else {
      left = Math.min(Math.max(MARGIN, r.left + (r.width - w) / 2), vw - w - MARGIN);
    }

    top = r.top + (r.height - h) / 2;
    if (left > r.right || left + w < r.left) {
      top = Math.min(Math.max(MARGIN, top), vh - h - MARGIN);
    } else {
      top = (r.bottom + GAP + h + MARGIN <= vh) ? r.bottom + GAP : Math.max(MARGIN, r.top - GAP - h);
    }

    tip.style.left = Math.round(left) + 'px';
    tip.style.top = Math.round(top) + 'px';
  }

  function show(card) {
    current = card;
    fill(card);
    place(card);
    tip.classList.add('is-visible');
  }

  function hide() {
    clearTimeout(timer);
    current = null;
    tip.classList.remove('is-visible');
  }

  function enter(card) {
    if (card === current) return;
    clearTimeout(timer);
    timer = setTimeout(function () { show(card); }, tip.classList.contains('is-visible') ? 0 : DELAY);
  }

  document.addEventListener('mouseover', function (e) {
    var card = e.target.closest && e.target.closest('.card');
    if (card) enter(card);
  });

  document.addEventListener('mouseout', function (e) {
    var from = e.target.closest && e.target.closest('.card');
    if (!from) return;
    var to = e.relatedTarget && e.relatedTarget.closest ? e.relatedTarget.closest('.card') : null;
    if (to !== from) hide();
  });

  document.addEventListener('focusin', function (e) {
    var card = e.target.closest && e.target.closest('.card');
    if (card) enter(card);
  });

  document.addEventListener('focusout', function (e) {
    var card = e.target.closest && e.target.closest('.card');
    if (card && !card.contains(e.relatedTarget)) hide();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') hide();
  });

  window.addEventListener('scroll', hide, { passive: true });
  window.addEventListener('resize', hide);
})();


// ================= Image slideshow (landing page) =================
(function () {
  var shelf = document.getElementById('shelf');
  if (!shelf) return;

  var slides = Array.prototype.slice.call(shelf.querySelectorAll('.slide'));
  var total = slides.length;
  if (!total) return;

  var titleEl = document.getElementById('shelf-title');
  var authorEl = document.getElementById('shelf-author');
  var prevBtn = document.getElementById('shelf-prev');
  var nextBtn = document.getElementById('shelf-next');
  var toggleBtn = document.getElementById('shelf-toggle');

  var INTERVAL = 3500;
  var index = 0;
  var timer = null;
  var userPaused = false;
  var hovering = false;

  function render() {
    slides.forEach(function (slide, k) {
      var d = ((k - index) % total + total) % total;
      if (d > total / 2) d -= total;

      var pos;
      if (Math.abs(d) <= 2) pos = String(d);
      else pos = d < 0 ? 'out-left' : 'out-right';

      slide.setAttribute('data-pos', pos);
      slide.setAttribute('aria-hidden', d === 0 ? 'false' : 'true');
    });

    if (titleEl) titleEl.textContent = slides[index].getAttribute('data-title');
    if (authorEl) authorEl.textContent = 'by ' + slides[index].getAttribute('data-author');
  }

  function go(step) {
    index = ((index + step) % total + total) % total;
    render();
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  function start() {
    stop();
    if (userPaused || hovering) return;
    timer = setInterval(function () { go(1); }, INTERVAL);
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { go(-1); start(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { go(1); start(); });

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      userPaused = !userPaused;
      toggleBtn.classList.toggle('is-paused', userPaused);
      toggleBtn.setAttribute('aria-label', userPaused ? 'Play slideshow' : 'Pause slideshow');
      start();
    });
  }

  slides.forEach(function (slide) {
    slide.addEventListener('click', function () {
      var pos = parseInt(slide.getAttribute('data-pos'), 10);
      if (pos === -1 || pos === 1) { go(pos); start(); }
    });
  });

  shelf.addEventListener('mouseenter', function () { hovering = true; stop(); });
  shelf.addEventListener('mouseleave', function () { hovering = false; start(); });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });

  render();
  start();
})();
