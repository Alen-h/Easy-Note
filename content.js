// Sidebar state
let sidebarVisible = false;
let sidebarElement = null;

// Create sidebar
async function createSidebar() {
  if (sidebarElement) {
    return;
  }

  // Create sidebar container
  sidebarElement = document.createElement('div');
  sidebarElement.id = 'easy-note-sidebar';
  sidebarElement.className = 'easy-note-sidebar';

  try {
    // Load sidebar content from HTML file
    const htmlUrl = chrome.runtime.getURL('sidebar.html');
    const response = await fetch(htmlUrl);
    const htmlContent = await response.text();
    
    // Replace dynamic content (icon URL)
    const iconUrl = chrome.runtime.getURL('icons/icon48.png');
    const processedHtml = htmlContent.replace('{{ICON_URL}}', iconUrl);
    
    sidebarElement.innerHTML = processedHtml;

    // Insert into body
    document.body.appendChild(sidebarElement);

    // Bind events
    bindEvents();

    // Load saved content
    loadSavedContent();
  } catch (error) {
    console.error('Failed to load sidebar HTML:', error);
    // If loading fails, can fallback to original hardcoded approach or show error message
  }
}

// Bind events
function bindEvents() {
  // Close button event
  document.getElementById('easy-note-close').addEventListener('click', hideSidebar);

  // Copy button event
  document.getElementById('easy-note-copy').addEventListener('click', copyContent);

  // Textarea content change event
  document.getElementById('easy-note-textarea').addEventListener('input', saveContent);

  // Click outside sidebar to close it
  document.addEventListener('click', handleOutsideClick);
}

// Handle clicks outside the sidebar
function handleOutsideClick(event) {
  // Only handle if sidebar is visible
  if (!sidebarVisible || !sidebarElement) {
    return;
  }

  // Check if the click target is inside the sidebar
  if (!sidebarElement.contains(event.target)) {
    hideSidebar();
  }
}

// Show sidebar
async function showSidebar() {
  if (!sidebarElement) {
    await createSidebar();
    
    // Wait for the browser to render the initial transform state before adding visible class
    // This ensures the slide-in animation works properly on first open
    if (sidebarElement) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          sidebarElement.classList.add('visible');
          document.body.classList.add('easy-note-sidebar-open');
          sidebarVisible = true;
        });
      });
      return;
    }
  }

  if (sidebarElement) {
    sidebarElement.classList.add('visible');
    document.body.classList.add('easy-note-sidebar-open');
    sidebarVisible = true;
  }
}

// Hide sidebar
function hideSidebar() {
  if (sidebarElement) {
    sidebarElement.classList.remove('visible');
    document.body.classList.remove('easy-note-sidebar-open');
  }
  sidebarVisible = false;
}

// Toggle sidebar visibility
async function toggleSidebar() {
  if (sidebarVisible) {
    hideSidebar();
  } else {
    await showSidebar();
  }
}

// Copy content to clipboard
async function copyContent() {
  const textarea = document.getElementById('easy-note-textarea');
  const content = textarea.value;

  try {
    await navigator.clipboard.writeText(content);

    // Show copy success indicator
    const copyBtn = document.getElementById('easy-note-copy');
    const textSpan = copyBtn.querySelector('span');
    const originalText = textSpan.textContent;
    textSpan.textContent = 'Copied!';
    copyBtn.classList.add('copied');

    setTimeout(() => {
      textSpan.textContent = originalText;
      copyBtn.classList.remove('copied');
    }, 2000);
  } catch (err) {
    console.error('Copy failed:', err);
    alert('Copy failed, please copy manually');
  }
}

// Save content to chrome.storage
function saveContent() {
  const textarea = document.getElementById('easy-note-textarea');
  const content = textarea.value;

  chrome.storage.local.set({ 'easyNoteContent': content }, () => {
    if (chrome.runtime.lastError) {
      console.error('Save failed:', chrome.runtime.lastError);
    }
  });
}

// Load saved content
function loadSavedContent() {
  chrome.storage.local.get(['easyNoteContent'], (result) => {
    if (chrome.runtime.lastError) {
      console.error('Load failed:', chrome.runtime.lastError);
      return;
    }

    const textarea = document.getElementById('easy-note-textarea');
    if (result.easyNoteContent) {
      textarea.value = result.easyNoteContent;
    }
  });
}

// Listen for messages from background
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'toggleSidebar') {
    await toggleSidebar();
  }
});

// Initialize after page loading
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // No need to create sidebar immediately after DOM loading, wait for user to click icon
  });
} else {
  // Page already loaded, no need to create sidebar immediately
} 