# Open SourceTree Extension

[![Test](https://github.com/charles-sudo/vscode-open-sourcetree/workflows/Test/badge.svg)](https://github.com/charles-sudo/vscode-open-sourcetree/actions)
[![Release](https://github.com/charles-sudo/vscode-open-sourcetree/workflows/Release/badge.svg)](https://github.com/charles-sudo/vscode-open-sourcetree/actions)

一个用于在 SourceTree 中快速打开当前项目的 VS Code 扩展，通过编辑器标题栏的图标快速在SourceTree中打开当前Git项目，支持单项目直接打开和多工作区项目选择。

## 功能特性

- 🚀 快速在 SourceTree 中打开当前项目
- 🎯 支持多种触发方式：命令面板、右键菜单、快捷键
- 🌍 多语言支持：中文、英文、日语
- ⚡ 轻量级，启动速度快
- 📍 在VSCode编辑器标题栏显示SourceTree图标
- 🔄 **单Git项目**：点击直接在SourceTree中打开
- 📂 **多Git项目工作区**：显示选择列表，选择要打开的项目
- 💻 支持macOS和Windows系统
- 🔍 自动检测当前工作区中的Git仓库
- 🎛️ 智能显示图标（仅在有Git项目时显示）
- 📝 支持文件资源管理器右键菜单

## 使用方法

1. 确保您已经安装了SourceTree应用程序
2. 在VSCode中打开一个或多个包含Git项目的文件夹
3. 查看编辑器标题栏右侧的SourceTree图标 `$(source-control)`
4. 点击图标：
   - **单项目**：直接在SourceTree中打开
   - **多项目**：弹出选择框，选择要打开的项目
5. 也可以在文件资源管理器中右键文件夹，选择"在SourceTree中打开"

### 快捷键

- **Windows/Linux**: `Ctrl+Alt+S`
- **macOS**: `Cmd+Alt+S`

### 图标显示位置

- **编辑器标题栏** - 右侧导航区域显示SourceTree图标
- **文件资源管理器** - 右键菜单中显示"在SourceTree中打开"选项
- **显示条件** - 只有在工作区包含Git项目时才显示

### 显示逻辑

- **无Git项目** → 图标隐藏
- **有Git项目** → 编辑器标题栏显示图标
- **单个Git项目** → 点击直接打开
- **多个Git项目** → 点击显示选择列表

## 安装

### 从 Release 下载（推荐）

1. 访问 [Releases 页面](https://github.com/charles-sudo/vscode-open-sourcetree/releases)
2. 下载最新版本的 `.vsix` 文件
3. 在 VS Code 中安装：`Extensions: Install from VSIX`

### 开发模式安装

1. 克隆或下载此项目
2. 在项目根目录运行：
   ```bash
   npm install
   npm run compile
   ```
3. 按 `F5` 或使用VSCode调试功能来启动插件开发模式

### 打包安装

1. 安装vsce（VSCode扩展打包工具）：
   ```bash
   npm install -g vsce
   ```
2. 在项目根目录运行：
   ```bash
   vsce package
   ```
3. 这将生成一个`.vsix`文件，您可以通过VSCode的"从VSIX安装"功能安装

## 系统要求

- VSCode 1.75.0 或更高版本
- 已安装SourceTree应用程序
- macOS 或 Windows 操作系统

## 支持的操作系统

- **macOS**: 使用 `open -a SourceTree` 命令
- **Windows**: 使用SourceTree的默认安装路径

## 注意事项

- 只检测包含`.git`文件夹的项目
- 确保SourceTree已正确安装在系统中
- Windows用户需要确保SourceTree安装在默认路径
- 图标会根据工作区Git项目自动显示/隐藏

## 开发

查看 [CI/CD 说明文档](./CI_CD_README.md) 了解完整的开发和发布流程。

```bash
# 克隆项目
git clone https://github.com/charles-sudo/vscode-open-sourcetree.git

# 安装依赖
npm install

# 开发模式
npm run watch

# 构建
npm run package
```

要贡献代码或修改插件：

1. Fork此仓库
2. 创建您的功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 许可证

MIT License 