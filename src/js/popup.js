var MemoryYunTabsName = "MEMORYYUNTABS";
var data = localStorage.getItem(MemoryYunTabsName);
var openLink = function(o){
	chrome.tabs.create({
		index:0,
		url:o.href,
		selected:true
	}, function(){
		o.parentNode.removeChild(o);
		o = null;
	});
};
var getShowTabs = function(d){
	var html = [];
	for(var i=0,l;l=d[i];i++){
		html.push('<a href="'+l.url+'">'+l.title+'</a>');
	}
	return html.join('');
};
if(data){
	var html = getShowTabs(JSON.parse(data));
	var div = document.getElementById("showTabs");
	div.innerHTML = html;
	div.addEventListener('click', function(e){
		if(e.target.tagName.toLowerCase() == "a"){
			openLink(e.target);
		}
	}, false);
}