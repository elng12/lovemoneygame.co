#!/usr/bin/env node

/**
 * 项目验证和优化脚本
 * 检查项目是否适合 EdgeOne Pages 部署
 */

const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  maxFileSize: 50 * 1024 * 1024, // 50MB
  allowedExtensions: ['.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico', '.json', '.txt'],
  requiredFiles: ['index.html'],
  optimizations: {
    minifyHtml: false,
    compressImages: false,
    generateSitemap: true
  }
};

console.log('🔍 验证项目配置和优化建议...\n');

// 检查必需文件
function checkRequiredFiles() {
  console.log('📋 检查必需文件...');
  
  let allRequired = true;
  CONFIG.requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file} - 存在`);
    } else {
      console.log(`❌ ${file} - 缺失`);
      allRequired = false;
    }
  });
  
  if (!allRequired) {
    console.error('\n❌ 缺少必需文件，无法部署');
    process.exit(1);
  }
  
  console.log('');
}

// 检查文件大小和类型
function validateFiles() {
  console.log('📁 检查项目文件...');
  
  const files = getAllFiles('.');
  let totalSize = 0;
  let validFiles = 0;
  let warnings = [];
  
  files.forEach(file => {
    const stats = fs.statSync(file);
    const ext = path.extname(file).toLowerCase();
    
    // 跳过特定文件
    if (file.includes('node_modules') || 
        file.includes('.git') || 
        file.includes('package') ||
        file.includes('deploy') ||
        file.includes('validate.js')) {
      return;
    }
    
    totalSize += stats.size;
    
    if (CONFIG.allowedExtensions.includes(ext)) {
      validFiles++;
      
      if (stats.size > CONFIG.maxFileSize) {
        warnings.push(`⚠️  ${file} 文件过大 (${formatFileSize(stats.size)})`);
      }
      
      console.log(`✅ ${file} (${formatFileSize(stats.size)})`);
    } else {
      warnings.push(`⚠️  ${file} 可能不支持的文件类型: ${ext}`);
    }
  });
  
  console.log(`\n📊 项目统计:`);
  console.log(`   有效文件: ${validFiles} 个`);
  console.log(`   总大小: ${formatFileSize(totalSize)}`);
  
  if (warnings.length > 0) {
    console.log('\n⚠️  警告:');
    warnings.forEach(warning => console.log(`   ${warning}`));
  }
  
  console.log('');
}

// 检查 HTML 结构
function validateHtml() {
  console.log('🌐 检查 HTML 结构...');
  
  try {
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    
    // 基本检查
    const checks = [
      { name: 'DOCTYPE 声明', test: /<!DOCTYPE\s+html>/i },
      { name: 'HTML 标签', test: /<html[^>]*>/i },
      { name: 'Head 标签', test: /<head[^>]*>/i },
      { name: 'Body 标签', test: /<body[^>]*>/i },
      { name: 'Title 标签', test: /<title[^>]*>.*<\/title>/i },
      { name: 'Meta viewport', test: /<meta[^>]*name=["']viewport["'][^>]*>/i },
      { name: 'Meta charset', test: /<meta[^>]*charset[^>]*>/i }
    ];
    
    checks.forEach(check => {
      if (check.test.test(htmlContent)) {
        console.log(`✅ ${check.name}`);
      } else {
        console.log(`⚠️  ${check.name} - 建议添加`);
      }
    });
    
    // 检查图片路径
    const imgMatches = htmlContent.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
    if (imgMatches) {
      console.log(`\n🖼️  发现 ${imgMatches.length} 个图片引用`);
      imgMatches.forEach(img => {
        const srcMatch = img.match(/src=["']([^"']+)["']/);
        if (srcMatch) {
          const src = srcMatch[1];
          if (src.startsWith('http')) {
            console.log(`🌐 外部图片: ${src}`);
          } else {
            const imgPath = src.startsWith('/') ? src.slice(1) : src;
            if (fs.existsSync(imgPath)) {
              console.log(`✅ 本地图片: ${src}`);
            } else {
              console.log(`❌ 缺失图片: ${src}`);
            }
          }
        }
      });
    }
    
  } catch (error) {
    console.error(`❌ 读取 HTML 文件时出错: ${error.message}`);
  }
  
  console.log('');
}

// 性能优化建议
function performanceOptimizations() {
  console.log('⚡ 性能优化建议...');
  
  const optimizations = [];
  
  try {
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    const htmlSize = Buffer.byteLength(htmlContent, 'utf8');
    
    console.log(`📏 HTML 文件大小: ${formatFileSize(htmlSize)}`);
    
    // 检查内联样式
    const inlineStyles = htmlContent.match(/<style[^>]*>[\s\S]*?<\/style>/gi);
    if (inlineStyles && inlineStyles.length > 0) {
      const totalStyleSize = inlineStyles.reduce((acc, style) => acc + style.length, 0);
      console.log(`🎨 内联样式: ${inlineStyles.length} 个块, ${formatFileSize(totalStyleSize)}`);
      
      if (totalStyleSize > 10000) {
        optimizations.push('考虑将大型内联样式提取为外部 CSS 文件');
      }
    }
    
    // 检查内联脚本
    const inlineScripts = htmlContent.match(/<script[^>]*>[\s\S]*?<\/script>/gi);
    if (inlineScripts) {
      const jsScripts = inlineScripts.filter(script => !script.includes('application/ld+json'));
      if (jsScripts.length > 0) {
        const totalScriptSize = jsScripts.reduce((acc, script) => acc + script.length, 0);
        console.log(`📜 内联脚本: ${jsScripts.length} 个, ${formatFileSize(totalScriptSize)}`);
        
        if (totalScriptSize > 20000) {
          optimizations.push('考虑将大型内联脚本提取为外部 JS 文件');
        }
      }
    }
    
    // 检查图片
    const imageFiles = getAllFiles('.').filter(file => 
      /\.(png|jpg|jpeg|gif|webp)$/i.test(file) && !file.includes('node_modules')
    );
    
    if (imageFiles.length > 0) {
      console.log(`🖼️  图片文件: ${imageFiles.length} 个`);
      let totalImageSize = 0;
      
      imageFiles.forEach(imgFile => {
        const stats = fs.statSync(imgFile);
        totalImageSize += stats.size;
        
        if (stats.size > 1024 * 1024) { // 1MB
          optimizations.push(`优化大图片: ${imgFile} (${formatFileSize(stats.size)})`);
        }
      });
      
      console.log(`   总大小: ${formatFileSize(totalImageSize)}`);
    }
    
  } catch (error) {
    console.error(`❌ 分析性能时出错: ${error.message}`);
  }
  
  if (optimizations.length > 0) {
    console.log('\n💡 优化建议:');
    optimizations.forEach(opt => console.log(`   • ${opt}`));
  } else {
    console.log('✅ 项目已经很好地优化了!');
  }
  
  console.log('');
}

// 生成站点地图
function generateSitemap() {
  console.log('🗺️  生成站点地图...');
  
  if (CONFIG.optimizations.generateSitemap) {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://lovemoneygame.co/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
    
    fs.writeFileSync('sitemap.xml', sitemap);
    console.log('✅ sitemap.xml 已生成');
  }
  
  // 生成 robots.txt
  const robots = `User-agent: *
Allow: /

Sitemap: https://lovemoneygame.co/sitemap.xml`;
  
  fs.writeFileSync('robots.txt', robots);
  console.log('✅ robots.txt 已生成');
  
  console.log('');
}

// 辅助函数
function getAllFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      results = results.concat(getAllFiles(filePath));
    } else if (stat && stat.isFile()) {
      results.push(filePath);
    }
  });
  
  return results;
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 主函数
function main() {
  console.log('🎮 LoveMoney Game - 项目验证和优化工具\n');
  
  checkRequiredFiles();
  validateFiles();
  validateHtml();
  performanceOptimizations();
  generateSitemap();
  
  console.log('🎉 验证完成!');
  console.log('✅ 项目已准备好部署到 EdgeOne Pages');
}

// 运行主函数
if (require.main === module) {
  main();
}

module.exports = { 
  CONFIG, 
  checkRequiredFiles, 
  validateFiles, 
  validateHtml, 
  performanceOptimizations,
  getAllFiles,
  formatFileSize 
};

