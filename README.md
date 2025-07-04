# Easy Note - Chrome Extension

A simple Chrome sidebar extension for taking notes while browsing the web.

## Features

- 🚀 **Sidebar Interface**: Click the extension icon to open a sidebar for note-taking
- 📝 **Auto-save**: Notes are automatically saved to Chrome local storage
- 📋 **Copy**: One-click copy of your notes to clipboard
- 📤 **Export**: Export notes as .txt files
- 🎯 **Toast Notifications**: Visual feedback for all actions
- 🔒 **Privacy**: All data stored locally only

## Installation

1. Download the extension files to a folder
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select your extension folder

## Usage

1. Click the extension icon in Chrome toolbar to open the sidebar
2. Type your notes in the text area
3. Use the **Copy** button to copy notes to clipboard
4. Use the **Export** button to download notes as a .txt file
5. Click the **✕** button to close the sidebar

## File Structure

```
Easy Note/
├── manifest.json      # Extension configuration
├── background.js      # Background script
├── content.js         # Content script
├── sidebar.html       # Sidebar interface
├── sidebar.css        # Styling
└── icons/             # Extension icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## Technical Details

- Uses Chrome Extension Manifest V3
- Requires permissions: `storage`, `activeTab`, `downloads`
- Compatible with all websites 