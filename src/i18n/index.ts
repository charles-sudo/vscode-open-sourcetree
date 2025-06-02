import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

// 支持的语言列表
const SUPPORTED_LOCALES = ["en", "zh-cn", "ja"];

// 语言包类型定义
export interface LocaleMessages {
  extension: {
    activated: string;
    deactivated: string;
  };
  statusBar: {
    tooltip: string;
  };
  errors: {
    noWorkspace: string;
    unsupportedOS: string;
    cannotOpen: string;
  };
  ui: {
    pickPlaceholder: string;
    projectPath: string;
    openingProject: string;
  };
}

// 默认语言
const DEFAULT_LOCALE = "en";

// 存储当前加载的语言包
let currentMessages: LocaleMessages;

/**
 * 加载语言包
 * @param context 扩展上下文
 * @returns 加载的语言包
 */
export function loadLocaleMessages(
  context: vscode.ExtensionContext
): LocaleMessages {
  // 优先从用户设置获取语言
  const config = vscode.workspace.getConfiguration("open-sourcetree");
  const configuredLocale = config.get<string>("language");

  // 如果用户设置了有效的语言，则使用；否则使用VSCode界面语言
  const vscodeLocale = vscode.env.language.toLowerCase();

  // 使用配置的语言或找到最匹配的语言
  const locale =
    configuredLocale && SUPPORTED_LOCALES.includes(configuredLocale)
      ? configuredLocale
      : findBestMatchLocale(vscodeLocale);

  try {
    // 构建语言文件路径
    const messagesPath = path.join(
      context.extensionPath,
      "out",
      "i18n",
      `${locale}.json`
    );

    // 如果文件存在，则加载
    if (fs.existsSync(messagesPath)) {
      const messagesJson = fs.readFileSync(messagesPath, "utf8");
      currentMessages = JSON.parse(messagesJson);

      // 记录加载信息
      console.log(`已加载语言包: ${locale}`);
    } else {
      // 否则加载默认语言
      const defaultMessagesPath = path.join(
        context.extensionPath,
        "out",
        "i18n",
        `${DEFAULT_LOCALE}.json`
      );
      const defaultMessagesJson = fs.readFileSync(defaultMessagesPath, "utf8");
      currentMessages = JSON.parse(defaultMessagesJson);

      // 记录警告
      console.warn(`找不到语言包 ${locale}，使用默认语言 ${DEFAULT_LOCALE}`);
    }
  } catch (error) {
    // 发生错误时加载内置默认语言
    console.error(`加载语言包失败: ${error}`);
    currentMessages = require(`./${DEFAULT_LOCALE}.json`);
  }

  // 监听语言设置变更
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("open-sourcetree.language")) {
        // 重新加载语言包
        loadLocaleMessages(context);
        // 刷新UI
        vscode.commands.executeCommand("open-sourcetree.refreshUI");
      }
    })
  );

  return currentMessages;
}

/**
 * 查找最匹配的语言
 * @param locale VSCode语言设置
 * @returns 最匹配的支持语言
 */
function findBestMatchLocale(locale: string): string {
  // 完全匹配
  if (SUPPORTED_LOCALES.includes(locale)) {
    return locale;
  }

  // 尝试匹配主语言部分 (例如: zh-tw -> zh-cn)
  const mainLang = locale.split("-")[0];
  for (const supportedLocale of SUPPORTED_LOCALES) {
    if (supportedLocale.startsWith(mainLang + "-")) {
      return supportedLocale;
    }
  }

  // 匹配主语言 (例如: zh -> zh-cn)
  if (SUPPORTED_LOCALES.includes(mainLang)) {
    return mainLang;
  }

  // 默认返回英语
  return DEFAULT_LOCALE;
}

/**
 * 格式化文本，替换占位符
 * @param text 包含占位符的文本
 * @param args 替换参数
 * @returns 格式化后的文本
 */
export function format(text: string, ...args: any[]): string {
  return text.replace(/{(\d+)}/g, (match, index) => {
    return typeof args[index] !== "undefined" ? args[index] : match;
  });
}

/**
 * 获取当前语言文本
 */
export function t(key: string, ...args: any[]): string {
  // 确保语言包已加载
  if (!currentMessages) {
    return key;
  }

  // 解析键路径 (例如: "errors.noWorkspace")
  const parts = key.split(".");
  let value: any = currentMessages;

  // 逐级查找键值
  for (const part of parts) {
    if (value && typeof value === "object" && part in value) {
      value = value[part];
    } else {
      console.warn(`找不到语言键: ${key}`);
      return key;
    }
  }

  // 如果找到并且是字符串，则格式化并返回
  if (typeof value === "string") {
    return format(value, ...args);
  }

  // 否则返回键名
  return key;
}

// 导出当前实例
export default {
  loadLocaleMessages,
  t,
  format,
};
