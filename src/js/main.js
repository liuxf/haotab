var HaoTab = {
  MemoryList:{}
};
chrome.tabs.onUpdated.addListener(function(id, info, tab){
  HaoTab.MemoryList[id] = {
    url:info.url
  };
});
chrome.tabs.onRemoved.addListener(function(id, info){
  delete HaoTab.MemoryList[id];
});
chrome.windows.onCreated.addListener(function(win){
  console.log(win.tabs)
});