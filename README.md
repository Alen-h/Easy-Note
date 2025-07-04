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

### For Users (Chrome Web Store)
1. Visit the Chrome Web Store and search for "Easy Note"
2. Click "Add to Chrome" to install the extension
3. The extension icon will appear in your Chrome toolbar

### For Developers
1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the project folder

## Usage

1. Click the extension icon in Chrome toolbar to open the sidebar
2. Type your notes in the text area
3. Use the **Copy** button to copy notes to clipboard
4. Use the **Export** button to download notes as a .txt file
5. Click the **✕** button to close the sidebar

## Chrome Web Store Submission

The project includes documentation for Chrome Web Store submission:

- **Chrome_Web_Store_Simple_Description.txt**: Marketing description and feature highlights for the Chrome Web Store listing
- **Chrome_Web_Store_Permissions_Justification.txt**: Detailed justification for each permission requested by the extension
- **PRIVACY_POLICY.md**: Comprehensive privacy policy explaining data handling practices

### Privacy Policy
The extension includes a comprehensive privacy policy ([PRIVACY_POLICY.md](PRIVACY_POLICY.md)) that explains:
- Data collection practices (none)
- Local storage usage
- Required permissions
- User rights and controls

## File Structure

```
Easy Note/
├── manifest.json                              # Extension configuration
├── background.js                              # Background script
├── content.js                                 # Content script
├── sidebar.html                               # Sidebar interface
├── sidebar.css                                # Styling
├── README.md                                  # Project documentation
├── PRIVACY_POLICY.md                          # Privacy policy for Chrome Web Store
├── Chrome_Web_Store_Simple_Description.txt    # Chrome Web Store marketing description
├── Chrome_Web_Store_Permissions_Justification.txt # Permission justifications
├── LICENSE                                    # Open source license
└── icons/                                     # Extension icons
    ├── icon16.png
    ├── icon48.png
    ├── icon128.png
    └── icon1024.png
```

## Technical Details

- **Manifest Version**: V3 (latest Chrome extension standard)
- **Permissions**: `storage`, `activeTab`, `downloads`
- **Compatibility**: All websites
- **Storage**: Chrome local storage API (no external servers)
- **Privacy**: All data stored locally, no tracking or analytics

## Development

### Local Development
1. Make your changes to the extension files
2. Go to `chrome://extensions/` in Chrome
3. Click the refresh button on the Easy Note extension card
4. Test your changes

### Submission to Chrome Web Store
1. Create a zip file containing all project files (excluding development files)
2. Submit to Chrome Web Store Developer Dashboard
3. Include the privacy policy and permission justifications
4. All required documentation is included in this repository

## Author

Developed by [Alen Hu](https://github.com/Alen-h)

## License

This project is open source. Feel free to use and modify as needed. 