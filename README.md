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
1. Download the latest release from the `releases/` folder
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extracted folder

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

## Development & Packaging

### Packaging for Chrome Web Store
This project includes an automated packaging script:

```bash
./package.sh
```

The script will:
- Create a `releases/` directory
- Generate a timestamped zip file ready for Chrome Web Store submission
- Include all necessary files while excluding development files
- Create a package information file with version details

For detailed packaging instructions, see [PACKAGE_USAGE.md](PACKAGE_USAGE.md).

### Privacy Policy
The extension includes a comprehensive privacy policy ([PRIVACY_POLICY.md](PRIVACY_POLICY.md)) that explains:
- Data collection practices (none)
- Local storage usage
- Required permissions
- User rights and controls

## File Structure

```
Easy Note/
├── manifest.json          # Extension configuration
├── background.js          # Background script
├── content.js             # Content script
├── sidebar.html           # Sidebar interface
├── sidebar.css            # Styling
├── README.md              # Project documentation
├── PRIVACY_POLICY.md      # Privacy policy for Chrome Web Store
├── package.sh             # Packaging script for releases
├── PACKAGE_USAGE.md       # Packaging script usage guide
├── releases/              # Generated packages (git ignored)
└── icons/                 # Extension icons
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

## Chrome Web Store Submission

The project is ready for Chrome Web Store submission:

1. **Package Creation**: Use `./package.sh` to create a submission-ready zip file
2. **Privacy Policy**: Included in the package and available as a standalone document
3. **Icons**: All required icon sizes included (16px, 48px, 128px, 1024px)
4. **Manifest V3**: Uses the latest Chrome extension manifest format
5. **Permissions**: Minimal required permissions with clear explanations

## Author

Developed by [Alen Hu](https://github.com/Alen-h)

## License

This project is open source. Feel free to use and modify as needed. 