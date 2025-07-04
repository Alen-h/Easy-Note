#!/bin/bash

# Easy Note Chrome Extension Packaging Script
# Author: Alen Hu (https://github.com/Alen-h)
# Description: Package the Chrome extension for Chrome Web Store submission

set -e  # Exit on any error

# Configuration
PROJECT_NAME="Easy-Note"
RELEASES_DIR="releases"
TEMP_DIR="temp_package"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Get version from manifest.json
get_version() {
    if [ -f "manifest.json" ]; then
        # Extract version using grep and sed
        VERSION=$(grep -o '"version"[[:space:]]*:[[:space:]]*"[^"]*"' manifest.json | sed 's/.*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/')
        echo "$VERSION"
    else
        print_error "manifest.json not found!"
        exit 1
    fi
}

# Create releases directory
create_releases_dir() {
    if [ ! -d "$RELEASES_DIR" ]; then
        mkdir -p "$RELEASES_DIR"
        print_info "Created releases directory: $RELEASES_DIR"
    fi
}

# Clean up temporary directory
cleanup() {
    if [ -d "$TEMP_DIR" ]; then
        rm -rf "$TEMP_DIR"
        print_info "Cleaned up temporary directory"
    fi
}

# Create temporary directory and copy files
prepare_package() {
    print_info "Preparing package..."
    
    # Clean up any existing temp directory
    cleanup
    
    # Create temporary directory
    mkdir -p "$TEMP_DIR"
    
    # Copy essential files
    cp manifest.json "$TEMP_DIR/"
    cp background.js "$TEMP_DIR/"
    cp content.js "$TEMP_DIR/"
    cp sidebar.html "$TEMP_DIR/"
    cp sidebar.css "$TEMP_DIR/"
    cp README.md "$TEMP_DIR/"
    cp PRIVACY_POLICY.md "$TEMP_DIR/"
    
    # Copy icons directory
    cp -r icons "$TEMP_DIR/"
    
    print_success "Files copied to temporary directory"
}

# Validate package contents
validate_package() {
    print_info "Validating package contents..."
    
    # Check essential files
    essential_files=(
        "manifest.json"
        "background.js"
        "content.js"
        "sidebar.html"
        "sidebar.css"
        "README.md"
        "PRIVACY_POLICY.md"
        "icons/icon16.png"
        "icons/icon48.png"
        "icons/icon128.png"
        "icons/icon1024.png"
    )
    
    for file in "${essential_files[@]}"; do
        if [ ! -f "$TEMP_DIR/$file" ]; then
            print_error "Missing essential file: $file"
            exit 1
        fi
    done
    
    print_success "Package validation completed"
}

# Create zip package
create_zip() {
    local version=$1
    local timestamp=$(date +"%Y%m%d_%H%M%S")
    local zip_name="${PROJECT_NAME}_v${version}_${timestamp}.zip"
    local zip_path="$RELEASES_DIR/$zip_name"
    
    print_info "Creating zip package: $zip_name"
    
    # Create zip file
    cd "$TEMP_DIR"
    zip -r "../$zip_path" . -x "*.DS_Store" "*.git*" "*.svn*" "*.tmp*" "*.temp*" "*.log*"
    cd ..
    
    if [ -f "$zip_path" ]; then
        print_success "Package created: $zip_path"
        
        # Show file size
        local size=$(ls -lh "$zip_path" | awk '{print $5}')
        print_info "Package size: $size"
        
        return 0
    else
        print_error "Failed to create package"
        return 1
    fi
}

# Generate package info
generate_info() {
    local version=$1
    local timestamp=$(date +"%Y-%m-%d %H:%M:%S")
    local info_file="$RELEASES_DIR/package_info.txt"
    
    cat > "$info_file" << EOF
Easy Note Chrome Extension - Package Information
================================================

Version: $version
Package Date: $timestamp
Author: Alen Hu (https://github.com/Alen-h)

Files Included:
- manifest.json (Extension configuration)
- background.js (Background script)
- content.js (Content script)
- sidebar.html (Sidebar interface)
- sidebar.css (Styling)
- README.md (Documentation)
- PRIVACY_POLICY.md (Privacy policy)
- icons/ (Extension icons)

Installation Instructions:
1. Extract the zip file
2. Open Chrome and go to chrome://extensions/
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extracted folder

For Chrome Web Store submission, upload the zip file directly.

EOF
    
    print_success "Package info generated: $info_file"
}

# Main execution
main() {
    print_info "Starting Easy Note Chrome Extension packaging..."
    print_info "Project: $PROJECT_NAME"
    
    # Get version from manifest
    VERSION=$(get_version)
    print_info "Version: $VERSION"
    
    # Create releases directory
    create_releases_dir
    
    # Prepare package
    prepare_package
    
    # Validate package
    validate_package
    
    # Create zip package
    if create_zip "$VERSION"; then
        # Generate package info
        generate_info "$VERSION"
        
        print_success "✅ Packaging completed successfully!"
        print_info "📦 Package location: $RELEASES_DIR/"
        print_info "🚀 Ready for Chrome Web Store submission"
    else
        print_error "❌ Packaging failed"
        exit 1
    fi
    
    # Clean up
    cleanup
}

# Handle script interruption
trap cleanup EXIT

# Run main function
main "$@" 