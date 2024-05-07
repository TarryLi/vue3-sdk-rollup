export default function copyHtml() {
    const fs = require('fs');
    return {
      name: 'copy-html',
      generateBundle(options, bundle) {
        // 获取 HTML 文件的路径
        const htmlPath = './public/index-pro.html';
        // 将 HTML 文件复制到 dist 目录
        this.emitFile({
          type: 'asset',
          fileName: 'index.html',
          source: fs.readFileSync(htmlPath)
        });
      }
    };
  }