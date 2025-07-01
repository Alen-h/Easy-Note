// 侧边栏状态
let sidebarVisible = false;
let sidebarElement = null;

// 创建侧边栏
function createSidebar() {
  if (sidebarElement) {
    return;
  }

  // 创建侧边栏容器
  sidebarElement = document.createElement('div');
  sidebarElement.id = 'easy-note-sidebar';
  sidebarElement.className = 'easy-note-sidebar';

  // 创建侧边栏内容
  sidebarElement.innerHTML = `
    <div class="easy-note-header">
      <div class="easy-note-title-container">
        <img src="${chrome.runtime.getURL('icons/icon48.png')}" class="easy-note-logo" alt="Easy Note Logo">
        <h3 class="easy-note-title">便捷笔记</h3>
      </div>
             <button class="easy-note-close-btn" id="easy-note-close">
         <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M8 8L40 40" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
           <path d="M8 40L40 8" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>
       </button>
    </div>
    <div class="easy-note-body">
      <div class="easy-note-textarea-container">
        <textarea 
          class="easy-note-textarea" 
          id="easy-note-textarea" 
          placeholder="在这里输入你的笔记..."
        ></textarea>
        <button class="easy-note-copy-btn" id="easy-note-copy">
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 12.4316V7.8125C13 6.2592 14.2592 5 15.8125 5H40.1875C41.7408 5 43 6.2592 43 7.8125V32.1875C43 33.7408 41.7408 35 40.1875 35H35.5163" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M32.1875 13H7.8125C6.2592 13 5 14.2592 5 15.8125V40.1875C5 41.7408 6.2592 43 7.8125 43H32.1875C33.7408 43 35 41.7408 35 40.1875V15.8125C35 14.2592 33.7408 13 32.1875 13Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/>
          </svg>
          <span>复制</span>
        </button>
      </div>
    </div>
  `;

  // 插入到body中
  document.body.appendChild(sidebarElement);

  // 绑定事件
  bindEvents();

  // 加载已保存的内容
  loadSavedContent();
}

// 绑定事件
function bindEvents() {
  // 关闭按钮事件
  document.getElementById('easy-note-close').addEventListener('click', hideSidebar);

  // 复制按钮事件
  document.getElementById('easy-note-copy').addEventListener('click', copyContent);

  // 文本框内容变化事件
  document.getElementById('easy-note-textarea').addEventListener('input', saveContent);
}

// 显示侧边栏
function showSidebar() {
  if (!sidebarElement) {
    createSidebar();
  }

  sidebarElement.classList.add('visible');
  document.body.classList.add('easy-note-sidebar-open');
  sidebarVisible = true;
}

// 隐藏侧边栏
function hideSidebar() {
  if (sidebarElement) {
    sidebarElement.classList.remove('visible');
    document.body.classList.remove('easy-note-sidebar-open');
  }
  sidebarVisible = false;
}

// 切换侧边栏显示状态
function toggleSidebar() {
  if (sidebarVisible) {
    hideSidebar();
  } else {
    showSidebar();
  }
}

// 复制内容到剪贴板
async function copyContent() {
  const textarea = document.getElementById('easy-note-textarea');
  const content = textarea.value;

  try {
    await navigator.clipboard.writeText(content);

    // 显示复制成功提示
    const copyBtn = document.getElementById('easy-note-copy');
    const textSpan = copyBtn.querySelector('span');
    const originalText = textSpan.textContent;
    textSpan.textContent = '已复制!';
    copyBtn.classList.add('copied');

    setTimeout(() => {
      textSpan.textContent = originalText;
      copyBtn.classList.remove('copied');
    }, 2000);
  } catch (err) {
    console.error('复制失败:', err);
    alert('复制失败，请手动复制内容');
  }
}

// 保存内容到chrome.storage
function saveContent() {
  const textarea = document.getElementById('easy-note-textarea');
  const content = textarea.value;

  chrome.storage.local.set({ 'easyNoteContent': content }, () => {
    if (chrome.runtime.lastError) {
      console.error('保存失败:', chrome.runtime.lastError);
    }
  });
}

// 加载已保存的内容
function loadSavedContent() {
  chrome.storage.local.get(['easyNoteContent'], (result) => {
    if (chrome.runtime.lastError) {
      console.error('加载失败:', chrome.runtime.lastError);
      return;
    }

    const textarea = document.getElementById('easy-note-textarea');
    if (result.easyNoteContent) {
      textarea.value = result.easyNoteContent;
    }
  });
}

// 监听来自background的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleSidebar') {
    toggleSidebar();
  }
});

// 页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // DOM加载完成后不需要立即创建侧边栏，等用户点击图标时再创建
  });
} else {
  // 页面已经加载完成，不需要立即创建侧边栏
} 