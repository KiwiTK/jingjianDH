document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const searchEngine = document.getElementById('search-engine');

    // 读取上次选择的引擎（新增代码）
    const lastEngine = localStorage.getItem('lastEngine') || 'baidu';
    searchEngine.value = lastEngine;

    function performSearch() {
        const query = searchInput.value.trim();
        const engine = searchEngine.value;
        if (!query) return;

        // 新增AI引擎 ↓
        const urls = {
            baidu: `https://www.baidu.com/s?wd=${encodeURIComponent(query)}`,
            google: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
            bing: `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
            ai: `https://chat.baidu.com`  // 新增AI选项
        };
        
        // 存储选择记录（新增代码） ↓
        localStorage.setItem('lastEngine', engine);
        
        window.open(urls[engine], '_self');
    }

    // 按钮点击事件
    searchButton.addEventListener('click', performSearch);
    
    // 回车键事件
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});

// 在DOMContentLoaded事件内添加
const isEdge = navigator.userAgent.includes('Edg');
console.log('Browser is Edge:', isEdge);

// 修改资源加载方式
const iconPath = isEdge ? 
    `edge-extension://${chrome.runtime.id}/assets/images/favicon-32x32.png` :
    chrome.runtime.getURL('assets/images/favicon-32x32.png');

fetch(iconPath)
  .then(response => {
    if (!response.ok) throw new Error('Edge资源加载失败');
    console.log('Edge图标加载成功');
  })
  .catch(error => console.error('Edge加载错误:', error));