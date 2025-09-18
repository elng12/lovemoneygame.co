# EdgeOne Pages MCP 快速部署指南

## 🚀 一键部署

### 选项1：快速部署（无需 API Token）

```bash
# 1. 安装依赖
npm install

# 2. 立即部署
npm run deploy
```

这将创建一个临时访问链接，适合快速测试和预览。

### 选项2：完整部署（推荐）

```bash
# 1. 获取 API Token
# 访问：https://console.cloud.tencent.com/edgeone/pages
# 生成 API Token

# 2. 设置环境变量
export EDGEONE_PAGES_API_TOKEN="your-api-token-here"
export EDGEONE_PAGES_PROJECT_NAME="lovemoney-game"

# 3. 安装依赖并部署
npm install
npm run deploy
```

这将创建持久的项目部署，支持域名绑定和高级功能。

## 📱 支持的 AI 客户端配置

### Claude Desktop 配置

在 Claude Desktop 的配置文件中添加：

```json
{
  "mcpServers": {
    "edgeone-pages-mcp-server": {
      "command": "npx",
      "args": ["edgeone-pages-mcp"],
      "env": {
        "EDGEONE_PAGES_API_TOKEN": "your-token",
        "EDGEONE_PAGES_PROJECT_NAME": "lovemoney-game"
      }
    }
  }
}
```

### Cursor 配置

在 Cursor 的 MCP 设置中添加：

```json
{
  "mcpServers": {
    "edgeone-pages": {
      "url": "https://mcp-on-edge.edgeone.site/mcp-server"
    }
  }
}
```

## 🔧 常用命令

| 命令 | 说明 |
|------|------|
| `npm run deploy` | 完整项目部署 |
| `npm run deploy-single` | 单文件快速部署 |
| `npm run validate` | 项目验证和优化检查 |
| `npm run serve` | 本地预览（端口3000） |

## ⚡ 立即测试

运行以下命令验证配置：

```bash
npm run validate
```

如果看到 "✅ 项目已准备好部署到 EdgeOne Pages"，就可以开始部署了！

## 🆘 遇到问题？

1. **检查 Node.js 版本**：`node --version` (需要 ≥14.0.0)
2. **重新安装依赖**：`rm -rf node_modules && npm install`
3. **查看详细日志**：`DEBUG=* npm run deploy`
4. **查看完整文档**：`cat README.md`

## 📞 技术支持

- GitHub Issues: https://github.com/elng12/lovemoneygame.co/issues
- EdgeOne Pages 文档: https://edgeone.cloud.tencent.com/pages/document/173172415568367616

