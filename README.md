# Easy Note - Chrome Extension

A simple and easy-to-use Chrome sidebar note-taking extension that allows you to easily record thoughts and notes while browsing the web.

## Features

- 🚀 **Sidebar Design**: Click the extension icon to open the right sidebar (not an overlay, it compresses page content)
- 📝 **Auto-save**: Entered content is automatically saved to Chrome local storage
- 📋 **One-click Copy**: Click the copy button in the bottom left to quickly copy text content to clipboard
- 🎯 **Toast Notifications**: Beautiful, non-intrusive toast notifications for all user feedback
- 📤 **Export Function**: Export your notes as .txt files with timestamps
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
4. **Copy Content**: Click the "Copy" button to copy current content
5. **Export Notes**: Click the "Export" button to download notes as a .txt file
6. **Toast Feedback**: Receive instant feedback via toast notifications for all actions
7. **Close Sidebar**: Click the "✕" button in the top right corner

## File Structure

```
Easy Note/
├── manifest.json      # Extension configuration file
├── background.js      # Background script
├── content.js         # Content script with Toast component
├── sidebar.html       # Sidebar HTML template
├── sidebar.css        # Style file (sidebar + toast styles)
├── test-toast.html    # Toast component test page
├── icons/
│   ├── icon16.png     # 16x16 icon
│   ├── icon48.png     # 48x48 icon
│   └── icon128.png    # 128x128 icon
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
- Public Toast component accessible via `window.EasyNoteToast`
- Chrome Downloads API for file export functionality

## Toast Component API

The extension includes a powerful Toast notification system available globally:

```javascript
// Basic usage
EasyNoteToast.success('Operation completed!');
EasyNoteToast.error('Something went wrong!');
EasyNoteToast.warning('Please check your input.');
EasyNoteToast.info('Here is some information.');

// Advanced usage with custom options
EasyNoteToast.show(
  'Custom message',
  'success',        // type: 'success', 'error', 'warning', 'info'
  'Custom Title',   // optional title
  5000,            // duration in milliseconds
  true             // dismissible by user
);
```

### Toast Features

- **Auto-positioning**: Appears in top-right corner, adjusts when sidebar is open
- **Auto-dismiss**: Configurable timeout (default 3 seconds)
- **Multiple types**: Success, error, warning, info with appropriate colors and icons
- **Stackable**: Multiple toasts can appear simultaneously
- **Responsive**: Adapts to mobile and tablet screens
- **Accessible**: Includes proper ARIA labels and keyboard support

## Development Information

- Version: 1.0
- Compatibility: Chrome browser (supports Manifest V3)
- Required Permissions: storage (local storage), activeTab (current tab access) 