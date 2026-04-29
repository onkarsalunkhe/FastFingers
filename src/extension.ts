// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "fast-finger" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('fast-finger.duplicateFile', async (clickedFile: vscode.Uri) => {
		if (!clickedFile) {
			vscode.window.showErrorMessage('Please right-click on a file to duplicate it.');
			return;
		}

		try {
			const filePath = clickedFile.fsPath;
			const fileName = path.basename(filePath);
			const dirPath = path.dirname(filePath);
			const fileExtension = path.extname(fileName);
			const fileNameWithoutExt = path.basename(fileName, fileExtension);

			// Show input box to ask for the new filename
			const newFileName = await vscode.window.showInputBox({
				prompt: 'Enter the new filename',
				value: `${fileNameWithoutExt}_copy${fileExtension}`,
				validateInput: (value) => {
					if (!value) {
						return 'Filename cannot be empty';
					}
					if (value.includes('/') || value.includes('\\')) {
						return 'Filename cannot contain path separators';
					}
					return '';
				}
			});

			// User cancelled the input
			if (newFileName === undefined) {
				return;
			}

			const newFilePath = path.join(dirPath, newFileName);
			const newFileUri = vscode.Uri.file(newFilePath);

			// Copy the file
			await vscode.workspace.fs.copy(clickedFile, newFileUri, { overwrite: false });

			// Ask user if they want to find and replace content
			const performReplace = await vscode.window.showQuickPick(
				['Yes', 'No'],
				{ placeHolder: 'Do you want to find and replace text in the duplicated file?' }
			);

			if (performReplace === 'Yes') {
				// Prompt for find string
				const findString = await vscode.window.showInputBox({
					prompt: 'Enter the string to find',
					validateInput: (value) => {
						if (!value) {
							return 'Find string cannot be empty';
						}
						return '';
					}
				});

				// User cancelled
				if (findString === undefined) {
					vscode.window.showInformationMessage(`File duplicated successfully as "${newFileName}"`);
					return;
				}

				// Prompt for replace string
				const replaceString = await vscode.window.showInputBox({
					prompt: 'Enter the replacement string',
					value: ''
				});

				// User cancelled
				if (replaceString === undefined) {
					vscode.window.showInformationMessage(`File duplicated successfully as "${newFileName}"`);
					return;
				}

				// Read the duplicated file
				const fileContent = await vscode.workspace.fs.readFile(newFileUri);
				let contentString = new TextDecoder().decode(fileContent);

				// Replace all occurrences
				const regex = new RegExp(escapeRegExp(findString), 'g');
				const newContent = contentString.replace(regex, replaceString);

				// Write the modified content back
				const newFileData = new TextEncoder().encode(newContent);
				await vscode.workspace.fs.writeFile(newFileUri, newFileData);

				vscode.window.showInformationMessage(`File duplicated and content replaced successfully as "${newFileName}"`);
			} else {
				vscode.window.showInformationMessage(`File duplicated successfully as "${newFileName}"`);
			}

		} catch (error) {
			if (error instanceof Error) {
				vscode.window.showErrorMessage(`Failed to duplicate file: ${error.message}`);
			} else {
				vscode.window.showErrorMessage('Failed to duplicate file: Unknown error');
			}
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

// Helper function to escape special regex characters
function escapeRegExp(string: string): string {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
