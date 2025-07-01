# Easy Note - Chrome Extension

A simple and easy-to-use Chrome sidebar note-taking extension that allows you to easily record thoughts and notes while browsing the web.

## Features

- 🚀 **Sidebar Design**: Click the extension icon to open the right sidebar (not an overlay, it compresses page content)
- 📝 **Auto-save**: Entered content is automatically saved to Chrome local storage
- 📋 **One-click Copy**: Click the copy button in the bottom left to quickly copy text content to clipboard
- 🎨 **Modern Interface**: Clean interface design with responsive layout support
- 🔒 **Privacy & Security**: All data is stored locally only, never uploaded to servers

## Installation

1. **Download Extension Files**
   - Save all files to a folder

2. **Prepare Icon Files**
   - Create three icon files: `icon16.png`, `icon48.png`, `icon128.png`
   - Icons should use simple notepad or note-taking icons

3. **Load Extension into Chrome**
   - Open Chrome browser
   - Go to `chrome://extensions/`
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked"
   - Select the folder containing the extension files

## Usage

1. **Open Sidebar**: Click the extension icon in Chrome toolbar
2. **Enter Notes**: Type your note content in the text area
3. **Auto-save**: Content is automatically saved as you type
4. **Copy Content**: Click the "Copy" button in the bottom left to copy current content
5. **Close Sidebar**: Click the "✕" button in the top right corner

## File Structure

```
Easy Note/
├── manifest.json      # Extension configuration file
├── background.js      # Background script
├── content.js         # Content script
├── sidebar.css        # Style file
├── icon16.png         # 16x16 icon
├── icon48.png         # 48x48 icon
├── icon128.png        # 128x128 icon
└── README.md          # Documentation
```

## Notes

- Extension requires Chrome browser support
- All data is stored only in local Chrome storage
- Sidebar compresses page content (not overlay design)
- Supports responsive design, adapts to different screen sizes

## Technical Features

- Uses Chrome Extension Manifest V3
- Modern CSS with smooth animations
- Chrome Storage API for data persistence
- Clipboard API support for one-click copy functionality

## Development Information

- Version: 1.0
- Compatibility: Chrome browser (supports Manifest V3)
- Required Permissions: storage (local storage), activeTab (current tab access) 