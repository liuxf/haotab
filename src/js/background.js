var _tabs_hash = {};
var isNewTab = function(tabUrl){
	return tabUrl == "chrome://newtab/";
};
var isCompleteStatus = function(status){
	return status == "complete";
};
chrome.tabs.onUpdated.addListener(function(id, obj, tab){
	// 保存所有打开网页的tab对象
	if(!isNewTab(tab.url)){
		_tabs_hash[id] = tab;
	}
});
chrome.tabs.onRemoved.addListener(function(id, obj){
	// 判断是关闭tab（非浏览器）触发的关闭事件
	if(!obj.isWindowClosing){
		_tabs_hash[id] = null;
		delete _tabs_hash[id];
	}
});