// ==========================================================================
// SECTION: Constants & Global State
// ==========================================================================
const MAX_BOOKS = 3;
let myBooks = [];
let activeBook = null;
let rendition = null;
let currentFontSize = 100; 
let isHidden = true; 
let isDark = false;
let isResizing = false;

// ==========================================================================
// SECTION: DOM Cache
// ==========================================================================
const el = {
    // Modals & Overlays
    disclaimerModal: document.getElementById('disclaimer-modal'),
    agreeCheckbox: document.getElementById('agree-checkbox'),
    acceptBtn: document.getElementById('accept-btn'),
    capacityModal: document.getElementById('capacity-modal'),
    capacityCloseBtn: document.getElementById('capacity-close-btn'),
    bossKeyCover: document.getElementById('boss-key-cover'),

    // Headers & Toolbars
    themeToggle: document.getElementById('theme-toggle'),
    sidebarToggle: document.getElementById('sidebar-toggle'),
    readerToolbar: document.getElementById('reader-toolbar'),
    emailHeader: document.getElementById('email-header'),

    // Ribbon Elements
    tabHome: document.getElementById('tab-home'),
    tabView: document.getElementById('tab-view'),
    tabHelp: document.getElementById('tab-help'),
    ribbonHome: document.getElementById('ribbon-home'),
    ribbonView: document.getElementById('ribbon-view'),
    btnViewTheme: document.getElementById('btn-view-theme'),
    btnViewToolbar: document.getElementById('btn-view-toolbar'),
    btnViewBossKey: document.getElementById('btn-view-bosskey'),
    btnNewMessageRibbon: document.getElementById('btn-new-message-ribbon'),

    // Sidebar
    navSidebar: document.getElementById('nav-sidebar'),
    headerFavorites: document.getElementById('header-favorites'),
    listFavorites: document.getElementById('list-favorites'),
    headerFolders: document.getElementById('header-folders'),
    listFolders: document.getElementById('list-folders'),
    navAbout: document.getElementById('nav-about'),
    sidebarTexts: document.querySelectorAll('.sidebar-text'),
    inboxBadge: document.getElementById('inbox-badge'),

    // Middle Pane & List
    middlePane: document.getElementById('middle-pane'),
    btnNewMessageMiddle: document.getElementById('btn-new-message-middle'),
    bookUploadInput: document.getElementById('book-upload-input'),
    bookCount: document.getElementById('book-count'),
    bookList: document.getElementById('book-list'),
    resizer: document.getElementById('resizer'),

    // Right Pane (Reader)
    displayTitle: document.getElementById('display-title'),
    displayAuthor: document.getElementById('display-author'),
    displayStatus: document.getElementById('display-status'),
    progressContainer: document.getElementById('progress-container'),
    progressBarFill: document.getElementById('progress-bar-fill'),
    viewer: document.getElementById('viewer'),
    staticViewer: document.getElementById('static-viewer'),
    btnPrevPage: document.getElementById('btn-prev-page'),
    btnNextPage: document.getElementById('btn-next-page'),
    fontSelect: document.getElementById('font-select'),
    spacingSelect: document.getElementById('spacing-select'),
    sizeUp: document.getElementById('size-up'),
    sizeDown: document.getElementById('size-down')
};

// ==========================================================================
// SECTION: Data Models
// ==========================================================================
const fakeEmails = [
    { id: 'fake-1', author: 'IT Support', title: 'Action Required: System Update', dateStr: '09:14 AM', snippet: '"Who controls the past controls the future. Who controls the present controls the past." Please ensure your workstation is restarted by Friday.', type: 'email' },
    { id: 'fake-2', author: 'Cecil Folk', title: 'Hey everyone', dateStr: 'Thu 8:08 AM', snippet: '"I must not fear. Fear is the mind-killer." Wanted to introduce myself, I\'m the new hire.', type: 'email' },
    { id: 'fake-3', author: 'Elvia Atkins; Katri Ahokas', title: 'Happy Women\'s Day!', dateStr: '3:10 PM', snippet: '"There is some good in this world, and it\'s worth fighting for." HWD! In the office we pride ourselves on diversity.', type: 'email' },
    { id: 'fake-4', author: 'Kevin Sturgis', title: 'TED talks this winter', dateStr: 'Mon 6:12 PM', snippet: '"Whatever our souls are made of, his and mine are the same." Hey everyone, there are some great talks lined up.', type: 'email' },
    { id: 'fake-5', author: 'Lydia Bauer', title: 'New Pinboard!', dateStr: 'Mon 4:02 PM', snippet: '"It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife." Anybody have any suggestions?', type: 'email' },
    { id: 'fake-6', author: 'Erik Nason', title: 'Expense report', dateStr: 'Mon 11:20 AM', snippet: '"Call me Ishmael." Hi there Kat, I\'m wondering if I\'m able to get this approved before EOD.', type: 'email' },
    { id: 'fake-7', author: 'Management', title: 'Q3 Townhall Notes', dateStr: 'Last Week', snippet: '"It was the best of times, it was the worst of times." Thank you to everyone who attended the Q3 all-hands.', type: 'email' },
    { id: 'fake-8', author: 'Calendar', title: 'Weekly Standup', dateStr: 'Last Week', snippet: '"Not all those who wander are lost." Meeting reminder: Weekly Standup at 10:00 AM.', type: 'email' },
    { id: 'fake-9', author: 'HR Department', title: 'Updated Office Policy', dateStr: 'Last Week', snippet: '"Big Brother is watching you." Please review the attached documentation regarding the new badge system.', type: 'email' },
    { id: 'fake-10', author: 'Colin Ballinger', title: 'Research & Development', dateStr: 'Last Week', snippet: '"So it goes." I\'ve compiled the data metrics you requested for the upcoming review.', type: 'email' }
];

const aboutOutbookData = {
    id: 'about-outbook',
    author: 'Outbook Administration',
    title: 'Welcome to Outbook 1.0 - Setup & Guidelines',
    dateStr: 'System',
    type: 'system',
    content: `
        <div class="max-w-2xl">
            <h3 class="text-xl font-bold mb-4">Welcome to your new reading environment.</h3>
            <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">This tool is designed to allow distraction-free, private reading disguised as a corporate email interface.</p>
            
            <div class="bg-gray-100 dark:bg-gray-800 rounded p-4 mb-4 border border-gray-200 dark:border-gray-700">
                <h4 class="font-bold mb-2">🔒 Architecture Overview</h4>
                <ul class="list-disc pl-5 text-sm space-y-1">
                    <li><strong>100% Client-Side Processing:</strong> Books are rendered entirely within your browser memory.</li>
                    <li><strong>Zero Server Storage:</strong> Your ePub files never leave your computer. We track nothing.</li>
                </ul>
            </div>

            <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded p-4 mb-4 border border-yellow-200 dark:border-yellow-800/50 text-sm">
                <h4 class="font-bold mb-1 text-yellow-800 dark:text-yellow-300">⚖️ Terms of Use & Legal Disclaimer</h4>
                <p class="text-yellow-700 dark:text-yellow-400">By using this application, you confirm that you have obtained your ePub files legally and take full responsibility for all loaded content. No illegal or unauthorized content should be uploaded.</p>
            </div>

            <div class="bg-blue-50 dark:bg-blue-900/20 rounded p-4 mb-6 border border-blue-200 dark:border-blue-800/50 text-sm">
                <h4 class="font-bold mb-1 text-blue-800 dark:text-blue-300">🖥️ Device Compatibility</h4>
                <p class="text-blue-700 dark:text-blue-400">Outbook is engineered specifically for PC/Mac notebook and desktop browsers. It is not optimized for handheld mobile devices.</p>
            </div>

            <div class="bg-gray-100 dark:bg-gray-800 rounded p-4 mb-6 border border-gray-200 dark:border-gray-700">
                <h4 class="font-bold mb-2">⌨️ Navigation Cheat Sheet</h4>
                <table class="w-full text-sm text-left">
                    <tr class="border-b dark:border-gray-700"><td class="py-2">Upload Book</td><td class="py-2">Click <code>+ New message</code></td></tr>
                    <tr class="border-b dark:border-gray-700"><td class="py-2">Next Page</td><td class="py-2"><code>Forward</code> button or <code>K</code> key / <code>→</code> key</td></tr>
                    <tr class="border-b dark:border-gray-700"><td class="py-2">Previous Page</td><td class="py-2"><code>Reply</code> button or <code>J</code> key / <code>←</code> key</td></tr>
                    <tr><td class="py-2 text-outbook dark:text-blue-400 font-bold">Boss Key (Panic)</td><td class="py-2 font-bold">Press <code>Escape</code></td></tr>
                </table>
            </div>

            <!-- BUY ME A COFFEE IMAGE BUTTON -->
            <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 class="font-bold mb-2">☕ Support Outbook</h4>
                <p class="text-sm mb-4 text-gray-600 dark:text-gray-400">If you like this project and want to keep it alive and ad-free, consider buying me a coffee!</p>
                <a href="https://www.buymeacoffee.com/Sachmer" target="_blank" class="inline-block transition-transform hover:scale-105">
                    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee" style="height: 60px !important;width: 217px !important;">
                </a>
                <p class="text-xs text-gray-500 mt-8 text-center pt-4">Not affiliated with Microsoft or Outlook.</p>
            </div>
        </div>
    `
};

// ==========================================================================
// SECTION: Storage
// ==========================================================================
let db;
const request = indexedDB.open("OutbookDB", 1);
request.onupgradeneeded = (e) => {
    db = e.target.result;
    db.createObjectStore("books", { keyPath: "id" });
};
request.onsuccess = (e) => {
    db = e.target.result;
    loadBooksFromDB();
};

function loadBooksFromDB() {
    const tx = db.transaction("books", "readonly");
    const store = tx.objectStore("books");
    const getAll = store.getAll();
    
    getAll.onsuccess = () => {
        if(getAll.result) {
            myBooks = getAll.result.sort((a,b) => b.id - a.id);
            renderBookList();
        }
    };
}

function saveBookToDB(bookObj) {
    const tx = db.transaction("books", "readwrite");
    tx.objectStore("books").put(bookObj);
}

function deleteBook(id) {
    myBooks = myBooks.filter(b => b.id !== id);
    const tx = db.transaction("books", "readwrite");
    tx.objectStore("books").delete(id);
    localStorage.removeItem(`epub_cfi_${id}`); 
    
    if(activeBook && activeBook.outbookId === id) {
        el.staticViewer.innerHTML = '';
        loadStaticContent(aboutOutbookData); 
    }
    renderBookList();
}

// ==========================================================================
// SECTION: Reader Engine
// ==========================================================================
function loadBook(bookObj) {
    setUIState(bookObj.id);
    el.readerToolbar.classList.remove('hidden');
    el.viewer.classList.remove('hidden');
    el.staticViewer.classList.add('hidden');
    
    el.displayTitle.innerText = bookObj.title;
    el.displayAuthor.innerText = bookObj.author;
    
    el.displayStatus.className = "font-semibold text-outbook dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full text-xs md:text-sm pulse";
    el.displayStatus.innerHTML = "Calculating pages...";
    el.progressContainer.classList.add('hidden');
    
    if (activeBook) { activeBook.destroy(); }
    el.viewer.innerHTML = '';

    activeBook = ePub(bookObj.data);
    activeBook.outbookId = bookObj.id; 

    rendition = activeBook.renderTo("viewer", {
        width: "100%", height: "100%", spread: "none"
    });

    const savedLocation = localStorage.getItem(`epub_cfi_${bookObj.id}`);
    if (savedLocation) {
        rendition.display(savedLocation);
    } else {
        rendition.display();
    }
    
    rendition.on("rendered", () => { updateEpubTheme(); applyFormatting(); });

    activeBook.ready.then(() => {
        return activeBook.locations.generate(1024);
    }).then(() => {
        el.displayStatus.classList.remove('pulse'); 
        el.progressContainer.classList.remove('hidden');
        updateProgressMetric(rendition.location); 
    });

    rendition.on("relocated", (location) => {
        updateProgressMetric(location);
    });

    rendition.on("keyup", (e) => {
        if (e.key === 'ArrowRight' || e.key === 'j' || e.key === 'J') navigatePage('next');
        if (e.key === 'ArrowLeft' || e.key === 'k' || e.key === 'K') navigatePage('prev');
        if (e.key === 'Escape') toggleBossKey();
    });
}

function updateProgressMetric(location) {
    if(!location || !activeBook || !activeBook.locations.length()) return;
    
    localStorage.setItem(`epub_cfi_${activeBook.outbookId}`, location.start.cfi);
    
    const percentageFromLoc = activeBook.locations.percentageFromCfi(location.start.cfi);
    const percentage = Math.round(percentageFromLoc * 100);
    const currentPage = activeBook.locations.locationFromCfi(location.start.cfi);
    const totalPages = activeBook.locations.total;

    el.displayStatus.innerHTML = `${percentage}% Complete &nbsp;•&nbsp; Page ${currentPage} of ${totalPages}`;
    el.progressBarFill.style.width = `${percentage}%`;
}

function updateEpubTheme() {
    if (!rendition) return;
    const bgColor = isDark ? '#202020' : '#ffffff';
    const textColor = isDark ? '#f3f2f1' : '#252423';
    
    rendition.themes.register("currentTheme", {
        "body": { "background": `${bgColor} !important`, "color": `${textColor} !important` },
        "a": { "color": "#0078D4 !important", "text-decoration": "none !important" }
    });
    rendition.themes.select("currentTheme");
}

function applyFormatting() {
    if (!rendition) return;
    const font = el.fontSelect.value;
    const spacing = el.spacingSelect.value;
    
    rendition.themes.font(font);
    rendition.themes.fontSize(`${currentFontSize}%`);
    
    rendition.themes.register("spacing", {
        "body": { "font-family": `${font} !important` },
        "p": { "line-height": `${spacing} !important`, "margin-bottom": "1em !important" },
        "div": { "line-height": `${spacing} !important` }
    });
    rendition.themes.select("spacing");
    updateEpubTheme(); 
}

function navigatePage(direction) {
    if (rendition && !isHidden) {
        if (direction === 'next') rendition.next();
        if (direction === 'prev') rendition.prev();
    }
}

// ==========================================================================
// SECTION: UI & Interactivity
// ==========================================================================

// Initial Disclaimer Modal
if (!localStorage.getItem('epub_disclaimer_agreed')) {
    el.agreeCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            el.acceptBtn.disabled = false;
            el.acceptBtn.classList.replace('bg-gray-300', 'bg-outbook');
            el.acceptBtn.classList.replace('text-gray-500', 'text-white');
            el.acceptBtn.classList.remove('cursor-not-allowed');
        } else {
            el.acceptBtn.disabled = true;
            el.acceptBtn.classList.replace('bg-outbook', 'bg-gray-300');
            el.acceptBtn.classList.replace('text-white', 'text-gray-500');
            el.acceptBtn.classList.add('cursor-not-allowed');
        }
    });
    el.acceptBtn.addEventListener('click', () => {
        localStorage.setItem('epub_disclaimer_agreed', 'true');
        el.disclaimerModal.classList.add('hidden');
    });
} else {
    el.disclaimerModal.classList.add('hidden'); 
}

// Global UI Toggles
function toggleTheme() {
    isDark = !isDark;
    document.documentElement.classList.toggle('dark', isDark);
    updateEpubTheme();
}

function toggleBossKey() {
    isHidden = !isHidden;
    if (isHidden) {
        el.bossKeyCover.classList.remove('hidden');
    } else {
        if (myBooks.length > 0 || !el.staticViewer.classList.contains('hidden')) {
            el.bossKeyCover.classList.add('hidden');
        } else {
            isHidden = true; // Stay hidden if empty
        }
    }
}

el.themeToggle.addEventListener('click', toggleTheme);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleBossKey();
    if (rendition && !isHidden) {
        if (e.key === 'ArrowRight' || e.key === 'j' || e.key === 'J') navigatePage('next');
        if (e.key === 'ArrowLeft' || e.key === 'k' || e.key === 'K') navigatePage('prev');
    }
});

// Resizer Drag Logic
el.resizer.addEventListener('mousedown', () => {
    isResizing = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    const sidebarWidth = el.navSidebar.getBoundingClientRect().width;
    const newWidth = e.clientX - sidebarWidth; // dynamic offset to fix compact mode bug
    if (newWidth > 200 && newWidth < (window.innerWidth * 0.75)) {
        el.middlePane.style.width = `${newWidth}px`;
    }
});

document.addEventListener('mouseup', () => {
    if (isResizing) {
        isResizing = false;
        document.body.style.cursor = 'default';
        document.body.style.userSelect = '';
        if (rendition) rendition.resize();
    }
});

// Sidebar Collapsing
el.sidebarToggle.addEventListener('click', () => {
    el.navSidebar.classList.toggle('w-56');
    el.navSidebar.classList.toggle('w-16'); 
    el.sidebarTexts.forEach(el => el.classList.toggle('hidden'));
});

// Sidebar Accordions
function setupAccordion(headerEl, listEl) {
    const arrow = headerEl.querySelector('.arrow');
    headerEl.addEventListener('click', () => {
        listEl.classList.toggle('hidden');
        arrow.style.transform = listEl.classList.contains('hidden') ? 'rotate(-90deg)' : 'rotate(0deg)';
    });
}
setupAccordion(el.headerFavorites, el.listFavorites);
setupAccordion(el.headerFolders, el.listFolders);

// Ribbon Interactivity
function switchRibbonTab(activeTab) {
    el.tabHome.classList.remove('text-outbook', 'font-semibold', 'border-b-2', 'border-outbook', 'pb-1', '-mb-[5px]');
    el.tabHome.classList.add('hover:text-outbook');
    el.tabView.classList.remove('text-outbook', 'font-semibold', 'border-b-2', 'border-outbook', 'pb-1', '-mb-[5px]');
    el.tabView.classList.add('hover:text-outbook');

    el.ribbonHome.classList.add('hidden');
    el.ribbonView.classList.add('hidden');

    if (activeTab === 'home') {
        el.tabHome.classList.add('text-outbook', 'font-semibold', 'border-b-2', 'border-outbook', 'pb-1', '-mb-[5px]');
        el.tabHome.classList.remove('hover:text-outbook');
        el.ribbonHome.classList.remove('hidden');
    } else if (activeTab === 'view') {
        el.tabView.classList.add('text-outbook', 'font-semibold', 'border-b-2', 'border-outbook', 'pb-1', '-mb-[5px]');
        el.tabView.classList.remove('hover:text-outbook');
        el.ribbonView.classList.remove('hidden');
    }
}
el.tabHome.addEventListener('click', () => switchRibbonTab('home'));
el.tabView.addEventListener('click', () => switchRibbonTab('view'));
el.tabHelp.addEventListener('click', () => loadStaticContent(aboutOutbookData));

// View Ribbon Action Hooks
el.btnViewTheme.addEventListener('click', toggleTheme);
el.btnViewToolbar.addEventListener('click', () => el.readerToolbar.classList.toggle('hidden'));
el.btnViewBossKey.addEventListener('click', toggleBossKey);

// Formatting Toolbar hooks
el.fontSelect.addEventListener('change', applyFormatting);
el.spacingSelect.addEventListener('change', applyFormatting);
el.sizeUp.addEventListener('click', () => { currentFontSize += 10; applyFormatting(); });
el.sizeDown.addEventListener('click', () => { currentFontSize = Math.max(50, currentFontSize - 10); applyFormatting(); });
el.btnNextPage.addEventListener('click', () => navigatePage('next'));
el.btnPrevPage.addEventListener('click', () => navigatePage('prev'));

// Pre-upload Capacity Check Hook
function handleUploadClickTrigger(e) {
    if (myBooks.length >= MAX_BOOKS) {
        e.preventDefault();
        el.capacityModal.classList.remove('hidden');
    } else {
        el.bookUploadInput.click();
    }
}
el.btnNewMessageMiddle.addEventListener('click', handleUploadClickTrigger);
el.btnNewMessageRibbon.addEventListener('click', handleUploadClickTrigger);
el.capacityCloseBtn.addEventListener('click', () => el.capacityModal.classList.add('hidden'));

// Upload Engine
function handleBookUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // Safety guardrails
    if (!file.name.toLowerCase().endsWith('.epub') && file.type !== 'application/epub+zip') {
        alert('Invalid file format. Outbook only supports .epub files.');
        e.target.value = '';
        return;
    }

    // Duplicate File Detection Check
    const isDuplicate = myBooks.some(b => b.fileName === file.name && b.size === file.size);
    if (isDuplicate) {
        const proceed = confirm("This file appears to already be in your inbox — add it again anyway?");
        if (!proceed) {
            e.target.value = '';
            return;
        }
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const bookData = event.target.result;
        const tempBook = ePub(bookData);
        
        tempBook.loaded.metadata.then(meta => {
            const newBookEntry = {
                id: Date.now().toString(),
                title: meta.title || file.name.replace('.epub', ''),
                author: meta.creator || "Unknown Sender",
                fileName: file.name,
                size: file.size,
                data: bookData, 
                dateStr: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                type: 'epub',
                isUnread: true 
            };
            
            myBooks.unshift(newBookEntry); 
            saveBookToDB(newBookEntry); 
            renderBookList();
            loadBook(newBookEntry); 
            e.target.value = ''; 
        });
    };
    reader.readAsArrayBuffer(file);
}
el.bookUploadInput.addEventListener('change', handleBookUpload);

// List Rendering
function renderBookList() {
    el.bookCount.innerText = `${myBooks.length}/${MAX_BOOKS} Items`;
    el.inboxBadge.innerText = myBooks.length + fakeEmails.length;
    el.bookList.innerHTML = '';
    
    myBooks.forEach(book => el.bookList.appendChild(createListItem(book, true)));
    fakeEmails.forEach(email => el.bookList.appendChild(createListItem(email, false)));
}

function createListItem(itemData, isBook) {
    const item = document.createElement('div');
    item.className = "email-item p-3 border-b border-gray-200 dark:border-darkBorder hover:bg-gray-100 dark:hover:bg-darkPanel cursor-pointer border-l-4 border-l-transparent bg-white dark:bg-darkBg transition-colors group relative";
    item.dataset.id = itemData.id;
    
    const isUnread = itemData.isUnread || false;
    const titleClass = isBook ? "font-semibold text-outbook dark:text-blue-400" : "text-gray-700 dark:text-gray-300";
    const snippetText = isBook ? "Draft saved. Review required." : itemData.snippet;
    const authorWeight = isUnread ? "font-bold text-gray-900 dark:text-white" : "font-medium text-gray-700 dark:text-gray-300";
    
    item.innerHTML = `
        <div class="flex justify-between items-baseline mb-1 relative">
            <div class="flex items-center truncate pr-2">
                ${isUnread ? '<div class="w-2 h-2 rounded-full bg-outbook mr-2 shrink-0"></div>' : ''}
                <span class="${authorWeight} text-[15px] truncate">${itemData.author}</span>
            </div>
            <span class="text-xs ${isBook ? 'text-outbook dark:text-blue-400 font-semibold' : 'text-gray-500'} shrink-0 group-hover:hidden">${itemData.dateStr}</span>
            ${isBook ? `<button class="hidden group-hover:block text-red-500 text-xs shrink-0 delete-btn z-10" title="Delete Book">🗑️</button>` : ''}
        </div>
        <div class="text-sm ${titleClass} truncate mb-1 ${isUnread ? 'font-semibold' : ''}">${itemData.title}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400 truncate">${snippetText}</div>
    `;
    
    if(isBook) {
        item.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation(); 
            deleteBook(itemData.id);
        });
    }

    item.onclick = () => {
        if (itemData.isUnread) {
            itemData.isUnread = false;
            if (isBook) saveBookToDB(itemData);
            renderBookList();
        }

        if (isBook) loadBook(itemData);
        else loadStaticContent(itemData);
    };
    return item;
}

el.navAbout.addEventListener('click', () => loadStaticContent(aboutOutbookData));

function setUIState(activeId) {
    document.querySelectorAll('.email-item').forEach(el => el.classList.replace('border-l-outbook', 'border-l-transparent'));
    const activeItem = document.querySelector(`.email-item[data-id="${activeId}"]`);
    if(activeItem) activeItem.classList.replace('border-l-transparent', 'border-l-outbook');
    
    el.emailHeader.classList.remove('hidden');
    el.bossKeyCover.classList.add('hidden');
    isHidden = false;
}

function loadStaticContent(dataObj) {
    setUIState(dataObj.id);
    el.readerToolbar.classList.add('hidden');
    el.progressContainer.classList.add('hidden');
    el.viewer.classList.add('hidden');
    el.staticViewer.classList.remove('hidden');
    
    el.displayTitle.innerText = dataObj.title;
    el.displayAuthor.innerText = dataObj.author;
    el.displayStatus.innerHTML = 'Received';
    el.displayStatus.className = "text-gray-500 dark:text-gray-400"; 
    
    if (activeBook) { 
        activeBook.destroy(); 
        activeBook = null; rendition = null;
    }
    
    if (dataObj.type === 'system') {
        el.staticViewer.innerHTML = dataObj.content;
    } else {
        el.staticViewer.innerHTML = `
            <div class="max-w-2xl"><p class="mb-4">Hi Team,</p><p class="mb-4 italic text-gray-600 dark:text-gray-400 border-l-4 border-gray-300 dark:border-gray-600 pl-4">${dataObj.snippet}</p><p>Best regards,<br>${dataObj.author}</p></div>
        `;
    }
}

// Initial Call
renderBookList();
