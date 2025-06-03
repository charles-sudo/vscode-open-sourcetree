import * as vscode from "vscode";
import { exec } from "child_process";
import * as path from "path";
import * as fs from "fs";
import i18n, { loadLocaleMessages, t } from "./i18n";

// 状态栏项目
let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
  // 加载语言包
  loadLocaleMessages(context);

  console.log(t("extension.activated"));

  // 注册打开SourceTree的命令
  let disposable = vscode.commands.registerCommand(
    "open-sourcetree.openInSourceTree",
    () => {
      openInSourceTree();
    }
  );

  // 创建状态栏图标
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  statusBarItem.command = "open-sourcetree.openInSourceTree";

  // 使用图标代表SourceTree
  // VSCode状态栏图标参考: https://code.visualstudio.com/api/references/icons-in-labels
  statusBarItem.text = "$(repo) SourceTree"; // 使用仓库图标
  statusBarItem.tooltip = t("statusBar.tooltip");
  statusBarItem.show();

  // 注册编辑器上下文菜单
  const editorContextMenuCommand = vscode.commands.registerCommand(
    "open-sourcetree.openInSourceTreeFromContextMenu",
    (uri) => {
      if (uri && uri.fsPath) {
        // 获取文件所在的目录
        const folderPath =
          uri.scheme === "file"
            ? fs.statSync(uri.fsPath).isDirectory()
              ? uri.fsPath
              : path.dirname(uri.fsPath)
            : uri.fsPath;

        openSourceTreeForPath(folderPath, path.basename(folderPath));
      } else {
        openInSourceTree();
      }
    }
  );

  // 注册资源管理器上下文菜单
  const explorerContextMenuCommand = vscode.commands.registerCommand(
    "open-sourcetree.openInSourceTreeFromExplorer",
    (uri) => {
      if (uri && uri.fsPath) {
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
        if (workspaceFolder) {
          openSourceTreeForPath(
            workspaceFolder.uri.fsPath,
            workspaceFolder.name
          );
        } else {
          // 如果找不到工作区文件夹，尝试获取文件所在目录，这是一种降级处理
          // 或者提示用户此文件不在任何工作区中
          const folderPath =
            uri.scheme === "file"
              ? fs.statSync(uri.fsPath).isDirectory()
                ? uri.fsPath
                : path.dirname(uri.fsPath)
              : uri.fsPath;
          // 如果仍然无法确定项目，则调用默认的 openInSourceTree
          if (folderPath) {
            openSourceTreeForPath(folderPath, path.basename(folderPath));
          } else {
            openInSourceTree();
          }
        }
      } else {
        openInSourceTree();
      }
    }
  );

  // 注册刷新UI的命令（用于语言切换后刷新界面文本）
  const refreshUICommand = vscode.commands.registerCommand(
    "open-sourcetree.refreshUI",
    () => {
      // 刷新状态栏提示
      statusBarItem.tooltip = t("statusBar.tooltip");

      // 通知用户语言已更改
      vscode.window.showInformationMessage(t("extension.activated"));
    }
  );

  context.subscriptions.push(
    disposable,
    statusBarItem,
    editorContextMenuCommand,
    explorerContextMenuCommand,
    refreshUICommand
  );
}

function openInSourceTree() {
  const workspaceFolders = vscode.workspace.workspaceFolders;

  if (!workspaceFolders || workspaceFolders.length === 0) {
    vscode.window.showErrorMessage(t("errors.noWorkspace"));
    return;
  }

  if (workspaceFolders.length === 1) {
    // 单个项目，直接打开
    openSourceTreeForPath(
      workspaceFolders[0].uri.fsPath,
      workspaceFolders[0].name
    );
  } else {
    // 多个项目，显示选择列表
    const items: vscode.QuickPickItem[] = workspaceFolders.map((folder) => ({
      label: folder.name,
      description: folder.uri.fsPath,
      detail: t("ui.projectPath", folder.uri.fsPath),
    }));

    vscode.window
      .showQuickPick(items, {
        placeHolder: t("ui.pickPlaceholder"),
        matchOnDescription: true,
        matchOnDetail: true,
      })
      .then((selectedItem) => {
        if (selectedItem) {
          openSourceTreeForPath(selectedItem.description!, selectedItem.label);
        }
      });
  }
}

function openSourceTreeForPath(workspacePath: string, projectName: string) {
  // 根据操作系统选择不同的命令
  let command: string;
  const platform = process.platform;

  if (platform === "darwin") {
    // macOS
    command = `open -a SourceTree "${workspacePath}"`;
  } else if (platform === "win32") {
    // Windows
    command = `"C:\\Program Files (x86)\\Atlassian\\SourceTree\\SourceTree.exe" "${workspacePath}"`;
  } else {
    // Linux (不太常见，但提供一个通用方案)
    vscode.window.showErrorMessage(t("errors.unsupportedOS"));
    return;
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行错误: ${error}`);
      vscode.window.showErrorMessage(t("errors.cannotOpen", error.message));
      return;
    }

    // 显示带有短暂超时的通知
    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: t("ui.openingProject", projectName),
        cancellable: false,
      },
      (progress) => {
        // 创建一个Promise，在3秒后解决
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 3000);
        });
      }
    );
  });
}

export function deactivate() {
  console.log(t("extension.deactivated"));
}
