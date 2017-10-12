function addNameToExclude(items){
	var selection = window.getSelection().toString();
	console.log('selection: ' + selection);
	//alert(window.getSelection().toString());

	var newKeyWords = items.keyWords + '|' + selection;
	console.log('keyWords: ' + items.keyWords);
	console.log('summWords: ' + items.summWords);
	console.log('keyWords2: ' + newKeyWords);

	chrome.storage.sync.set({
    keyWords: newKeyWords,
    summWords: items.summWords
	  }, function() { });
}

chrome.storage.sync.get({
    keyWords: '',
    summWords: ''
}, addNameToExclude);