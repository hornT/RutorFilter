function addNameToExclude(items){
	const selection = window.getSelection().toString();
	console.log('selection: ' + selection);

	const newFilms = items.films == '' ? selection : items.films + '|' + selection;
	console.log('keyWords: ' + items.keyWords);
	console.log('summWords: ' + items.summWords);
	console.log('films: ' + items.films);
	console.log('newFilms: ' + newFilms);

	chrome.storage.sync.set({
		keyWords: items.keyWords,
		summWords: items.summWords,
		films: newFilms
	  }, function() { });
}

  chrome.storage.sync.get({
    keyWords: '',
    summWords: '',
	films: ''
}, addNameToExclude);