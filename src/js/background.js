var _tabs_hash = {};
var MemoryYunTabsName = "MEMORYYUNTABS";
var newTab = function(tab){
	return {"title":tab.title, "url":tab.url};
};
var isRemberTab = function(tab){
	return /^(http[s]?\:\/\/)/i.test(tab.url);
};
var isCompleteStatus = function(obj){
	return obj.status == "complete";
};
var updateDataToStorage = function(){
	var d = [];
	for(var k in _tabs_hash){
		d.push(_tabs_hash[k]);
	}
	localStorage.setItem(MemoryYunTabsName, JSON.stringify(d));
};
chrome.tabs.onUpdated.addListener(function(id, obj, tab){
	// 保存所有打开网页的tab对象
	if(isRemberTab(tab)){
		_tabs_hash[id] = newTab(tab);
	}
	if(isCompleteStatus(obj)){
		updateDataToStorage();
	}
});
chrome.tabs.onRemoved.addListener(function(id, obj){
	// 判断是关闭tab（非浏览器）触发的关闭事件
	if(!obj.isWindowClosing){
		_tabs_hash[id] = null;
		delete _tabs_hash[id];
		updateDataToStorage();
	}
});