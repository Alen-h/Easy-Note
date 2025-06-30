// 监听插件图标点击事件
chrome.action.onClicked.addListener((tab) => {
  // 向当前标签页发送消息，切换侧边栏状态
  chrome.tabs.sendMessage(tab.id, { action: "toggleSidebar" });
}); 