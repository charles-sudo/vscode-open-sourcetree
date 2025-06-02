# GitHub CI/CD 集成流程说明

本项目已配置完整的 GitHub Actions CI/CD 流程，支持自动化测试和发布构建产物。

## 工作流概述

### 1. 测试工作流 (`.github/workflows/test.yml`)

**触发条件：**
- 推送到 `main`、`master` 或 `develop` 分支
- 创建针对这些分支的 Pull Request

**功能：**
- 在多个 Node.js 版本 (16, 18, 20) 上测试构建
- 执行 TypeScript 编译检查
- 验证国际化文件复制
- 测试 VSIX 打包流程
- 进行 TypeScript 类型检查

### 2. 发布工作流 (`.github/workflows/release.yml`)

**触发条件：**
- 创建新的 Release
- 推送以 `v` 开头的 tag (如 `v1.0.0`)

**功能：**
- 自动编译项目
- 复制国际化文件
- 生成 `.vsix` 扩展包
- 自动上传构建产物到 Release Assets
- 生成构建摘要报告

## 使用流程

### 开发流程

1. **日常开发**
   ```bash
   # 开发过程中编译和监听
   npm run watch
   
   # 手动编译
   npm run compile
   
   # 清理构建产物
   npm run clean
   
   # 重新构建
   npm run rebuild
   ```

2. **本地测试**
   ```bash
   # 完整构建和打包
   npm run package
   
   # 这会生成 .vsix 文件，可以在 VS Code 中手动安装测试
   ```

### 发布流程

1. **准备发布**
   ```bash
   # 1. 更新版本号
   npm version patch  # 或 minor/major
   
   # 2. 提交更改
   git add .
   git commit -m "chore: bump version to x.x.x"
   git push origin main
   ```

2. **创建 Release**
   ```bash
   # 方式 1: 通过 git tag
   git tag v1.0.0
   git push origin v1.0.0
   
   # 方式 2: 在 GitHub 网页创建 Release
   # 访问 GitHub 仓库 -> Releases -> Create a new release
   ```

3. **自动化发布**
   - GitHub Actions 会自动触发构建
   - 编译项目并生成 `.vsix` 文件
   - 将构建产物上传到 Release Assets
   - 用户可以直接下载使用

## 构建产物

发布成功后，用户可以从 Release Assets 下载：
- `open-sourcetree-v1.0.0.vsix` - VS Code 扩展包

## 安装使用

下载 `.vsix` 文件后，在 VS Code 中安装：

1. **命令行安装**
   ```bash
   code --install-extension open-sourcetree-v1.0.0.vsix
   ```

2. **VS Code 界面安装**
   - 打开 VS Code
   - 按 `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
   - 输入 "Extensions: Install from VSIX"
   - 选择下载的 `.vsix` 文件

## 构建状态

项目构建状态可以通过以下徽章查看：

```markdown
![Test](https://github.com/charles-sudo/vscode-open-sourcetree/workflows/Test/badge.svg)
![Release](https://github.com/charles-sudo/vscode-open-sourcetree/workflows/Release/badge.svg)
```

## 故障排除

### 常见问题

1. **构建失败**
   - 检查 TypeScript 编译错误
   - 确保所有依赖正确安装
   - 验证 `src/i18n/` 目录和文件存在

2. **打包失败**
   - 确保已安装 `@vscode/vsce` 包
   - 检查 `package.json` 配置正确性
   - 验证 `out/` 目录包含编译后的文件

3. **上传失败**
   - 检查 GitHub token 权限
   - 确保 Release 已正确创建
   - 验证工作流权限设置

### 调试步骤

1. **本地验证**
   ```bash
   # 清理并重新构建
   npm run clean
   npm run package
   
   # 检查生成的文件
   ls -la out/
   ls -la *.vsix
   ```

2. **查看 GitHub Actions 日志**
   - 访问 GitHub 仓库
   - 点击 "Actions" 标签
   - 查看失败的工作流日志

## 配置说明

- **Node.js 版本**: 支持 16, 18, 20
- **构建环境**: Ubuntu Latest
- **缓存策略**: npm 依赖缓存
- **输出格式**: VSIX 扩展包

这个 CI/CD 流程确保了代码质量和发布的自动化，让开发者可以专注于功能开发。 