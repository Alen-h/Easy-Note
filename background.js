// Listen for extension icon click events
chrome.action.onClicked.addListener((tab) => {
  // Send message to current tab to toggle sidebar state
  chrome.tabs.sendMessage(tab.id, { action: "toggleSidebar" });
}); 