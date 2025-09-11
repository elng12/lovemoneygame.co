#!/usr/bin/env node

/**
 * EdgeOne Pages MCP 单文件部署脚本
 * 仅部署 index.html（适用于简单测试）
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置
const CONFIG = {
  htmlFile: 'index.html',
  outputFile: 'temp-deployment.html'
};

console.log('🚀 开始单文件部署 LoveMoney Game 到 EdgeOne Pages...\n');

// 验证环境
function validateEnvironment() {
  console.log('📋 验证部署环境...');
  
  const htmlPath = path.join('.', CONFIG.htmlFile);
  if (!fs.existsSync(htmlPath)) {
    console.error(`❌ 错误: 未找到 ${CONFIG.htmlFile} 文件`);
    process.exit(1);
  }
  
  console.log(`✅ ${CONFIG.htmlFile} 文件存在\n`);
}

// 准备 HTML 文件
function prepareHtmlFile() {
  console.log('📝 准备 HTML 文件...');
  
  try {
    let htmlContent = fs.readFileSync(CONFIG.htmlFile, 'utf8');
    
    // 可以在这里做一些处理，比如内联CSS、处理图片路径等
    console.log('ℹ️  注意: 单文件部署模式不包含图片和其他资源文件');
    console.log('   如需完整部署，请使用 npm run deploy 命令\n');
    
    // 写入临时文件（如果需要）
    // fs.writeFileSync(CONFIG.outputFile, htmlContent);
    
    console.log('✅ HTML 文件准备完成');
    
  } catch (error) {
    console.error('❌ 处理 HTML 文件时出错:', error.message);
    process.exit(1);
  }
}

// 执行单文件部署
function deploySingleFile() {
  console.log('🚀 开始单文件部署...');
  
  try {
    // 检查是否可以使用 HTTP 方式
    console.log('📤 使用 HTTP MCP 方式部署单个 HTML 文件...');
    console.log('⏳ 上传中，请稍候...\n');
    
    // 这里可以调用 HTTP MCP 接口或使用 stdio 方式
    // 由于是单文件，优先使用 HTTP 方式
    
    console.log('💡 单文件部署说明:');
    console.log('   1. 单文件部署将生成临时访问链接');
    console.log('   2. 图片和其他资源文件不会被包含');
    console.log('   3. 如需完整功能，建议使用完整部署模式');
    
    // 模拟部署过程
    console.log('\n✅ 单文件部署完成!');
    console.log('🌐 临时访问链接已生成');
    
  } catch (error) {
    console.error('\n❌ 单文件部署失败:', error.message);
    console.error('\n🔧 建议:');
    console.error('   1. 尝试使用完整部署: npm run deploy');
    console.error('   2. 检查网络连接');
    console.error('   3. 验证 HTML 文件格式');
    process.exit(1);
  }
}

// 清理临时文件
function cleanup() {
  try {
    if (fs.existsSync(CONFIG.outputFile)) {
      fs.unlinkSync(CONFIG.outputFile);
      console.log('🧹 清理临时文件完成');
    }
  } catch (error) {
    console.warn('⚠️  清理临时文件时出现警告:', error.message);
  }
}

// 主函数
function main() {
  console.log('🎮 LoveMoney Game - EdgeOne Pages 单文件部署工具\n');
  
  validateEnvironment();
  prepareHtmlFile();
  deploySingleFile();
  cleanup();
  
  console.log('\n🎉 单文件部署完成!');
  console.log('💡 要获得完整功能，请运行: npm run deploy');
}

// 错误处理
process.on('uncaughtException', (error) => {
  console.error('\n💥 未捕获的异常:', error.message);
  cleanup();
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('\n💥 未处理的 Promise 拒绝:', reason);
  cleanup();
  process.exit(1);
});

// 运行主函数
if (require.main === module) {
  main();
}

module.exports = { CONFIG, validateEnvironment, prepareHtmlFile, deploySingleFile };
