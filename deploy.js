#!/usr/bin/env node

/**
 * EdgeOne Pages MCP 部署脚本
 * 支持完整项目部署（文件夹方式）
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置
const CONFIG = {
  projectName: process.env.EDGEONE_PAGES_PROJECT_NAME || 'lovemoney-game',
  apiToken: process.env.EDGEONE_PAGES_API_TOKEN,
  sourceDir: '.',
  excludePatterns: [
    'node_modules',
    '.git',
    '.gitignore',
    'package.json',
    'package-lock.json',
    'deploy.js',
    'deploy-single.js',
    'validate.js',
    'mcp-config*.json',
    'README.md',
    '*.log'
  ]
};

console.log('🚀 开始部署 LoveMoney Game 到 EdgeOne Pages...\n');

// 验证环境
function validateEnvironment() {
  console.log('📋 验证部署环境...');
  
  if (!CONFIG.apiToken) {
    console.warn('⚠️  警告: 未设置 EDGEONE_PAGES_API_TOKEN 环境变量');
    console.warn('   这将创建临时链接而不是关联到指定项目');
    console.warn('   要关联到项目，请设置 API Token\n');
  } else {
    console.log('✅ API Token 已配置');
  }
  
  console.log(`📁 项目名称: ${CONFIG.projectName}`);
  console.log(`📂 源目录: ${CONFIG.sourceDir}\n`);
}

// 检查文件
function validateFiles() {
  console.log('📝 验证项目文件...');
  
  const indexPath = path.join(CONFIG.sourceDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ 错误: 未找到 index.html 文件');
    process.exit(1);
  }
  
  console.log('✅ index.html 文件存在');
  
  // 检查图片文件
  const imageFiles = fs.readdirSync(CONFIG.sourceDir).filter(file => 
    file.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i)
  );
  
  if (imageFiles.length > 0) {
    console.log(`✅ 发现 ${imageFiles.length} 个图片文件:`, imageFiles.join(', '));
  }
  
  console.log('');
}

// 创建部署包
function createDeploymentPackage() {
  console.log('📦 准备部署文件...');
  
  try {
    // 检查是否安装了 edgeone-pages-mcp
    execSync('npm list edgeone-pages-mcp', { stdio: 'pipe' });
    console.log('✅ edgeone-pages-mcp 已安装');
  } catch (error) {
    console.log('📥 安装 edgeone-pages-mcp...');
    try {
      execSync('npm install edgeone-pages-mcp', { stdio: 'inherit' });
      console.log('✅ edgeone-pages-mcp 安装完成');
    } catch (installError) {
      console.error('❌ 安装失败:', installError.message);
      process.exit(1);
    }
  }
  
  console.log('');
}

// 执行部署
function deploy() {
  console.log('🚀 开始部署到 EdgeOne Pages...');
  
  try {
    // 构建 MCP 命令
    const mcpCommand = 'npx edgeone-pages-mcp';
    
    console.log('📤 上传文件到 EdgeOne Pages...');
    console.log('⏳ 这可能需要几分钟时间，请耐心等待...\n');
    
    // 执行部署命令
    const result = execSync(mcpCommand, { 
      stdio: 'inherit',
      cwd: CONFIG.sourceDir,
      env: {
        ...process.env,
        EDGEONE_PAGES_PROJECT_NAME: CONFIG.projectName,
        EDGEONE_PAGES_API_TOKEN: CONFIG.apiToken
      }
    });
    
    console.log('\n✅ 部署完成!');
    console.log('🌐 您的网站已成功部署到 EdgeOne Pages');
    
    if (!CONFIG.apiToken) {
      console.log('\n💡 提示: 如需将网站关联到特定项目，请:');
      console.log('   1. 获取 EdgeOne Pages API Token');
      console.log('   2. 设置环境变量 EDGEONE_PAGES_API_TOKEN');
      console.log('   3. 重新运行部署命令');
    }
    
  } catch (error) {
    console.error('\n❌ 部署失败:', error.message);
    console.error('\n🔧 故障排除建议:');
    console.error('   1. 检查网络连接');
    console.error('   2. 验证 API Token 是否正确');
    console.error('   3. 确认项目名称是否有效');
    console.error('   4. 查看完整错误日志');
    process.exit(1);
  }
}

// 主函数
function main() {
  console.log('🎮 LoveMoney Game - EdgeOne Pages MCP 部署工具\n');
  
  validateEnvironment();
  validateFiles();
  createDeploymentPackage();
  deploy();
  
  console.log('\n🎉 部署流程完成!');
  console.log('📱 您现在可以访问您的网站了');
}

// 错误处理
process.on('uncaughtException', (error) => {
  console.error('\n💥 未捕获的异常:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('\n💥 未处理的 Promise 拒绝:', reason);
  process.exit(1);
});

// 运行主函数
if (require.main === module) {
  main();
}

module.exports = { CONFIG, validateEnvironment, validateFiles, deploy };
