# LoveMoney Game - EdgeOne Pages MCP 部署指南

## 项目简介

LoveMoney Game 官方网站，使用腾讯云 EdgeOne Pages MCP 服务进行快速部署和预览。

## 🚀 快速开始

### 1. 环境准备

确保您的系统已安装：
- Node.js (≥14.0.0)
- npm 或 yarn

### 2. 安装依赖

```bash
npm install
```

### 3. 配置 EdgeOne Pages MCP

#### 方式一：Stdio 接入（推荐）

1. 获取 EdgeOne Pages API Token（可选）
   - 访问 [EdgeOne Pages 控制台](https://console.cloud.tencent.com/edgeone/pages)
   - 生成 API Token

2. 设置环境变量（可选）：
   ```bash
   export EDGEONE_PAGES_API_TOKEN="your-api-token"
   export EDGEONE_PAGES_PROJECT_NAME="lovemoney-game"
   ```

3. 使用 `mcp-config.json` 配置文件

#### 方式二：HTTP 接入（简单快速）

使用 `mcp-config-http.json` 配置文件，无需 API Token，但功能有限。

### 4. 部署选项

#### 完整部署（推荐）
```bash
npm run deploy
```
- 部署整个项目文件夹
- 包含所有图片和资源文件
- 支持自定义项目名称

#### 单文件部署（测试用）
```bash
npm run deploy-single
```
- 仅部署 HTML 文件
- 生成临时访问链接
- 适合快速测试

#### 项目验证
```bash
npm run validate
```
- 检查项目结构
- 验证文件完整性
- 性能优化建议

#### 本地预览
```bash
npm run serve
```
- 在本地 3000 端口预览网站

## 📁 项目结构

```
lovemoneygame.co/
├── index.html              # 主页面
├── 10002.png               # 游戏截图
├── 10003.png               # 游戏截图
├── 10004.png               # 游戏截图
├── 10005.png               # 游戏截图
├── package.json            # 项目配置
├── mcp-config.json         # MCP Stdio 配置
├── mcp-config-http.json    # MCP HTTP 配置
├── deploy.js               # 完整部署脚本
├── deploy-single.js        # 单文件部署脚本
├── validate.js             # 项目验证脚本
├── sitemap.xml             # 站点地图（自动生成）
├── robots.txt              # 搜索引擎配置（自动生成）
└── README.md               # 部署指南
```

## 🔧 配置说明

### MCP 配置文件

#### mcp-config.json (Stdio 方式)
```json
{
  "mcpServers": {
    "edgeone-pages-mcp-server": {
      "command": "npx",
      "args": ["edgeone-pages-mcp"],
      "env": {
        "EDGEONE_PAGES_API_TOKEN": "",
        "EDGEONE_PAGES_PROJECT_NAME": "lovemoney-game"
      }
    }
  }
}
```

#### mcp-config-http.json (HTTP 方式)
```json
{
  "mcpServers": {
    "edgeone-pages-mcp-server": {
      "url": "https://mcp-on-edge.edgeone.site/mcp-server"
    }
  }
}
```

### 环境变量

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `EDGEONE_PAGES_API_TOKEN` | EdgeOne Pages API 令牌 | 可选 |
| `EDGEONE_PAGES_PROJECT_NAME` | 项目名称 | 可选 |

## 📋 部署步骤详解

### 1. 完整部署流程

```bash
# 1. 验证项目
npm run validate

# 2. 设置环境变量（可选）
export EDGEONE_PAGES_API_TOKEN="your-token"
export EDGEONE_PAGES_PROJECT_NAME="your-project-name"

# 3. 执行部署
npm run deploy
```

### 2. 部署输出示例

```
🎮 LoveMoney Game - EdgeOne Pages MCP 部署工具

📋 验证部署环境...
✅ API Token 已配置
📁 项目名称: lovemoney-game
📂 源目录: .

📝 验证项目文件...
✅ index.html 文件存在
✅ 发现 4 个图片文件: 10002.png, 10003.png, 10004.png, 10005.png

📦 准备部署文件...
✅ edgeone-pages-mcp 已安装

🚀 开始部署到 EdgeOne Pages...
📤 上传文件到 EdgeOne Pages...
⏳ 这可能需要几分钟时间，请耐心等待...

✅ 部署完成!
🌐 您的网站已成功部署到 EdgeOne Pages
```

## 🛠️ 故障排除

### 常见问题

1. **部署失败 - 网络错误**
   ```bash
   # 检查网络连接
   ping console.cloud.tencent.com
   
   # 重试部署
   npm run deploy
   ```

2. **API Token 无效**
   ```bash
   # 重新生成 Token
   # 检查环境变量设置
   echo $EDGEONE_PAGES_API_TOKEN
   ```

3. **文件太大**
   ```bash
   # 运行验证检查文件大小
   npm run validate
   
   # 优化图片大小
   # 移除不必要的文件
   ```

4. **项目名称冲突**
   ```bash
   # 使用不同的项目名称
   export EDGEONE_PAGES_PROJECT_NAME="lovemoney-game-v2"
   npm run deploy
   ```

### 调试模式

启用详细日志：
```bash
DEBUG=* npm run deploy
```

## 📚 参考资源

- [EdgeOne Pages MCP 官方文档](https://edgeone.cloud.tencent.com/pages/document/173172415568367616)
- [MCP 协议规范](https://modelcontextprotocol.io/)
- [EdgeOne Pages 控制台](https://console.cloud.tencent.com/edgeone/pages)

## 🔒 安全注意事项

1. **API Token 安全**
   - 不要将 API Token 提交到代码仓库
   - 使用环境变量或安全的配置管理工具
   - 定期轮换 Token

2. **文件内容检查**
   - 确保不包含敏感信息
   - 验证所有外部链接
   - 检查图片和资源文件

## 📈 性能优化

### 自动优化

运行验证脚本会自动检查并提供优化建议：
```bash
npm run validate
```

### 手动优化建议

1. **图片优化**
   - 压缩图片文件
   - 使用现代图片格式（WebP）
   - 设置适当的图片尺寸

2. **代码优化**
   - 最小化 CSS 和 JavaScript
   - 移除未使用的代码
   - 启用 Gzip 压缩

3. **CDN 优化**
   - 使用 EdgeOne CDN 加速
   - 配置缓存策略
   - 启用压缩传输

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支
3. 提交更改
4. 创建 Pull Request

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 🆘 技术支持

- 创建 [GitHub Issue](https://github.com/elng12/lovemoneygame.co/issues)
- 联系 SugarSugar Game Studio
- 查看 EdgeOne Pages 官方文档

---

**SugarSugar Game Studio** - 专注于创新游戏开发 🎮
