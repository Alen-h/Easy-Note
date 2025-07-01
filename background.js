// Listen for extension icon click events
chrome.action.onClicked.addListener((tab) => {
  // Send message to current tab to toggle sidebar state
  chrome.tabs.sendMessage(tab.id, { action: "toggleSidebar" });
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'downloadFile') {
    // Use chrome.downloads API to download the file
    chrome.downloads.download({
      url: request.url,
      filename: request.filename,
      saveAs: false // Automatically save to default downloads folder
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        console.error('Download failed:', chrome.runtime.lastError);
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
      } else {
        console.log('Download started with ID:', downloadId);
        sendResponse({ success: true, downloadId: downloadId });
      }
    });
    
    // Return true to indicate we will send a response asynchronously
    return true;
  }
}); 