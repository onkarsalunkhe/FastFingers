# Fast Finger

A Visual Studio Code extension that allows you to duplicate files directly from the file explorer context menu with optional find and replace functionality.

## Features

- **Right-click file duplication**: Right-click on any file in the VS Code file explorer and select "Duplicate File"
- **Custom naming**: Specify a new filename for the duplicated file through an input dialog
- **Smart default naming**: The extension suggests a default name like `filename_copy.ext`
- **Find and replace**: After duplicating, optionally find and replace all occurrences of a string in the duplicated file
- **Validation**: Prevents invalid filenames and ensures proper file creation
- **Same directory**: Duplicated files are created in the same directory as the original file

## How to Use

1. Right-click on any file in the VS Code file explorer
2. Select **"Duplicate File"** from the context menu
3. Enter the new filename in the input dialog
4. Press Enter to confirm the filename
5. When prompted, choose whether to find and replace text:
   - Select **"Yes"** to find and replace content in the duplicated file
   - Select **"No"** to skip the find and replace
6. If you selected "Yes", enter the string you want to find
7. Enter the replacement string
8. The duplicate file will be created with all replacements applied

The file will be created in the same directory with the name you specified and the content you modified.

## Installation

1. Download the `fast-finger-0.0.1.vsix` file
2. Open VS Code
3. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
4. Click the "..." menu at the top of the Extensions panel
5. Select "Install from VSIX..."
6. Select the downloaded VSIX file

Alternatively, you can install it via command line:
```bash
code --install-extension fast-finger-0.0.1.vsix
```

## Requirements

- VS Code version 1.116.0 or higher

## Known Issues

- The extension only works with files, not directories
- Find and replace uses regex matching, so special regex characters should be escaped

## Release Notes

### 0.0.1

Initial release of Fast Finger extension with:
- Basic file duplication functionality
- User-defined find and replace feature for duplicated files

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
