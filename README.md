# Open SourceTree Extension

[![Test](https://github.com/charles-sudo/vscode-open-sourcetree/workflows/Test/badge.svg)](https://github.com/charles-sudo/vscode-open-sourcetree/actions)
[![Release](https://github.com/charles-sudo/vscode-open-sourcetree/workflows/Release/badge.svg)](https://github.com/charles-sudo/vscode-open-sourcetree/actions)

A VS Code extension for quickly opening the current project in SourceTree. Quick access to open the current Git project in SourceTree through an icon in the editor title bar, supporting direct opening for single projects and selection for multi-workspace projects.

## Features

- 🚀 Quickly open current project in SourceTree
- 🎯 Multiple trigger methods: Command Palette, right-click menu, keyboard shortcuts
- 🌍 Multi-language support: Chinese, English, Japanese
- ⚡ Lightweight with fast startup
- 📍 Display SourceTree icon in VSCode editor title bar
- 🔄 **Single Git Project**: Click to open directly in SourceTree
- 📂 **Multi-Git Project Workspace**: Show selection list to choose which project to open
- 💻 Support for macOS and Windows systems
- 🔍 Auto-detect Git repositories in current workspace
- 🎛️ Smart icon display (only shows when Git projects are present)
- 📝 Support for file explorer right-click menu

## Usage

1. Ensure you have SourceTree application installed
2. Open one or more folders containing Git projects in VSCode
3. Look for the SourceTree icon `$(source-control)` on the right side of the editor title bar
4. Click the icon:
   - **Single Project**: Opens directly in SourceTree
   - **Multiple Projects**: Shows selection dialog to choose which project to open
5. You can also right-click folders in the file explorer and select "Open in SourceTree"

### Keyboard Shortcuts

- **Windows/Linux**: `Ctrl+Alt+S`
- **macOS**: `Cmd+Alt+S`

### Icon Display Location

- **Editor Title Bar** - SourceTree icon displayed in the right navigation area
- **File Explorer** - "Open in SourceTree" option in right-click menu
- **Display Condition** - Only shows when workspace contains Git projects

### Display Logic

- **No Git Projects** → Icon hidden
- **Git Projects Present** → Icon shown in editor title bar
- **Single Git Project** → Click to open directly
- **Multiple Git Projects** → Click to show selection list

## Installation

### Download from Release (Recommended)

1. Visit the [Releases page](https://github.com/charles-sudo/vscode-open-sourcetree/releases)
2. Download the latest version `.vsix` file
3. Install in VS Code: `Extensions: Install from VSIX`

### Development Mode Installation

1. Clone or download this project
2. Run in the project root directory:
   ```bash
   npm install
   npm run compile
   ```
3. Press `F5` or use VSCode debug feature to start the extension in development mode

### Package Installation

1. Install vsce (VSCode Extension Manager):
   ```bash
   npm install -g vsce
   ```
2. Run in the project root directory:
   ```bash
   vsce package
   ```
3. This will generate a `.vsix` file that you can install through VSCode's "Install from VSIX" feature

## System Requirements

- VSCode 1.75.0 or higher
- SourceTree application installed
- macOS or Windows operating system

## Supported Operating Systems

- **macOS**: Uses `open -a SourceTree` command
- **Windows**: Uses SourceTree's default installation path

## Notes

- Only detects projects containing `.git` folders
- Ensure SourceTree is properly installed on your system
- Windows users need to ensure SourceTree is installed in the default path
- Icon automatically shows/hides based on workspace Git projects

## Development

See [CI/CD Documentation](./CI_CD_README.md) for complete development and release workflow.

```bash
# Clone the project
git clone https://github.com/charles-sudo/vscode-open-sourcetree.git

# Install dependencies
npm install

# Development mode
npm run watch

# Build
npm run package
```

To contribute code or modify the extension:

1. Fork this repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License
