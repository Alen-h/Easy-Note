// Sidebar state
let sidebarVisible = false;
let sidebarElement = null;

// Toast state
let toastContainer = null;
let toastCounter = 0;

// ==========================================================================
// Toast Component Implementation
// ==========================================================================

/**
 * Public Toast API - Use this to show toast notifications
 * @param {string} message - The message to display
 * @param {string} type - Type of toast: 'success', 'error', 'warning', 'info'
 * @param {string} title - Optional title for the toast
 * @param {number} duration - Auto-dismiss duration in milliseconds (default: 3000)
 * @param {boolean} dismissible - Whether toast can be manually dismissed (default: true)
 */
window.EasyNoteToast = {
  show: function(message, type = 'info', title = null, duration = 3000, dismissible = true) {
    showToast(message, type, title, duration, dismissible);
  },
  success: function(message, title = null, duration = 3000) {
    showToast(message, 'success', title, duration, true);
  },
  error: function(message, title = null, duration = 5000) {
    showToast(message, 'error', title, duration, true);
  },
  warning: function(message, title = null, duration = 4000) {
    showToast(message, 'warning', title, duration, true);
  },
  info: function(message, title = null, duration = 3000) {
    showToast(message, 'info', title, duration, true);
  }
};

// Create toast container
function createToastContainer() {
  if (toastContainer) {
    return toastContainer;
  }

  toastContainer = document.createElement('div');
  toastContainer.className = 'easy-note-toast-container';
  document.body.appendChild(toastContainer);
  
  return toastContainer;
}

// Show toast notification
function showToast(message, type = 'info', title = null, duration = 3000, dismissible = true) {
  const container = createToastContainer();
  const toastId = `easy-note-toast-${++toastCounter}`;
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `easy-note-toast ${type}`;
  toast.id = toastId;
  
  // Get icon for toast type
  const icon = getToastIcon(type);
  
  // Build toast HTML
  toast.innerHTML = `
    ${icon}
    <div class="easy-note-toast-content">
      ${title ? `<div class="easy-note-toast-title">${escapeHtml(title)}</div>` : ''}
      <div class="easy-note-toast-message">${escapeHtml(message)}</div>
    </div>
    ${dismissible ? `
    <button class="easy-note-toast-close" aria-label="Close notification">
      <svg viewBox="0 0 16 16" fill="currentColor">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    </button>
    ` : ''}
    ${duration > 0 ? '<div class="easy-note-toast-progress"></div>' : ''}
  `;
  
  // Add to container
  container.appendChild(toast);
  
  // Bind close event if dismissible
  if (dismissible) {
    const closeBtn = toast.querySelector('.easy-note-toast-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => removeToast(toast));
    }
  }
  
  // Show toast with animation
  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });
  
  // Auto-dismiss with progress bar
  if (duration > 0) {
    const progressBar = toast.querySelector('.easy-note-toast-progress');
    if (progressBar) {
      progressBar.style.transition = `transform ${duration}ms linear`;
      progressBar.style.transform = 'scaleX(0)';
    }
    
    setTimeout(() => {
      removeToast(toast);
    }, duration);
  }
  
  return toastId;
}

// Remove toast with animation
function removeToast(toast) {
  if (!toast || !toast.parentNode) return;
  
  toast.classList.add('fade-out');
  
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
    
    // Clean up container if empty
    if (toastContainer && toastContainer.children.length === 0) {
      toastContainer.remove();
      toastContainer = null;
    }
  }, 300);
}

// Get icon for toast type
function getToastIcon(type) {
  const icons = {
    success: `
      <div class="easy-note-toast-icon">
        <svg viewBox="0 0 16 16" fill="currentColor">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
      </div>
    `,
    error: `
      <div class="easy-note-toast-icon">
        <svg viewBox="0 0 16 16" fill="currentColor">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
        </svg>
      </div>
    `,
    warning: `
      <div class="easy-note-toast-icon">
        <svg viewBox="0 0 16 16" fill="currentColor">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
      </div>
    `,
    info: `
      <div class="easy-note-toast-icon">
        <svg viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
        </svg>
      </div>
    `
  };
  
  return icons[type] || icons.info;
}

// Utility function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

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
    EasyNoteToast.error('Failed to load sidebar', 'Error');
  }
}

// Bind events
function bindEvents() {
  // Close button event
  document.getElementById('easy-note-close').addEventListener('click', hideSidebar);

  // Copy button event
  document.getElementById('easy-note-copy').addEventListener('click', copyContent);

  // Export button event
  document.getElementById('easy-note-export').addEventListener('click', exportContent);

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

  // Check if the click target is inside the sidebar or toast
  if (!sidebarElement.contains(event.target) && 
      !event.target.closest('.easy-note-toast-container')) {
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

    // Show toast notification
    EasyNoteToast.success('Content copied to clipboard', 'Success');

    setTimeout(() => {
      textSpan.textContent = originalText;
      copyBtn.classList.remove('copied');
    }, 2000);
  } catch (err) {
    console.error('Copy failed:', err);
    EasyNoteToast.error('Failed to copy content. Please try again.', 'Copy Failed');
  }
}

// Export content as .txt file
async function exportContent() {
  const textarea = document.getElementById('easy-note-textarea');
  const content = textarea.value;

  if (!content.trim()) {
    EasyNoteToast.warning('No content to export', 'Export Warning');
    return;
  }

  try {
    // Create timestamp for filename
    const now = new Date();
    const timestamp = now.getFullYear() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') + '_' +
      String(now.getHours()).padStart(2, '0') +
      String(now.getMinutes()).padStart(2, '0') +
      String(now.getSeconds()).padStart(2, '0');
    
    const filename = `easy_note_${timestamp}.txt`;

    // Create blob and object URL
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Use chrome.downloads API to download the file
    chrome.runtime.sendMessage({
      action: 'downloadFile',
      url: url,
      filename: filename
    }, (response) => {
      // Clean up the object URL
      URL.revokeObjectURL(url);
      
      if (response && response.success) {
        // Show export success indicator
        const exportBtn = document.getElementById('easy-note-export');
        const textSpan = exportBtn.querySelector('span');
        const originalText = textSpan.textContent;
        textSpan.textContent = 'Exported!';
        exportBtn.classList.add('copied');

        // Show toast notification
        EasyNoteToast.success(`Notes exported as ${filename}`, 'Export Successful');

        setTimeout(() => {
          textSpan.textContent = originalText;
          exportBtn.classList.remove('copied');
        }, 2000);
      } else {
        console.error('Export failed:', response ? response.error : 'Unknown error');
        EasyNoteToast.error('Failed to export notes. Please try again.', 'Export Failed');
      }
    });

  } catch (err) {
    console.error('Export failed:', err);
    EasyNoteToast.error('Failed to export notes. Please try again.', 'Export Failed');
  }
}

// Save content to chrome.storage
function saveContent() {
  const textarea = document.getElementById('easy-note-textarea');
  const content = textarea.value;

  chrome.storage.local.set({ 'easyNoteContent': content }, () => {
    if (chrome.runtime.lastError) {
      console.error('Save failed:', chrome.runtime.lastError);
      EasyNoteToast.error('Failed to save content', 'Save Error');
    }
  });
}

// Load saved content
function loadSavedContent() {
  chrome.storage.local.get(['easyNoteContent'], (result) => {
    if (chrome.runtime.lastError) {
      console.error('Load failed:', chrome.runtime.lastError);
      EasyNoteToast.error('Failed to load saved content', 'Load Error');
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