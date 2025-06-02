# Open SourceTree Extension

[![Test](https://github.com/charles-sudo/vscode-open-sourcetree/workflows/Test/badge.svg)](https://github.com/charles-sudo/vscode-open-sourcetree/actions)
[![Release](https://github.com/charles-sudo/vscode-open-sourcetree/workflows/Release/badge.svg)](https://github.com/charles-sudo/vscode-open-sourcetree/actions)

一个用于在 SourceTree 中快速打开当前项目的 VS Code 扩展。

## 功能

- 🚀 快速在 SourceTree 中打开当前项目
- 🎯 支持多种触发方式：命令面板、右键菜单、快捷键
- 🌍 多语言支持：中文、英文、日语
- ⚡ 轻量级，启动速度快

## 安装

### 从 Release 下载

1. 访问 [Releases 页面](https://github.com/charles-sudo/vscode-open-sourcetree/releases)
2. 下载最新版本的 `.vsix` 文件
3. 在 VS Code 中安装：`Extensions: Install from VSIX`

### 快捷键

- **Windows/Linux**: `Ctrl+Alt+S`
- **macOS**: `Cmd+Alt+S`

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

## 许可证

MIT License
