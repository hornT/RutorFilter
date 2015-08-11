function filter(items){
	console.log('start');
	// Регулярка из ключевых слов дл¤ фильтра
	var keyWordsReg = new RegExp(items.keyWords);
	var keyWordsSummReg = new RegExp(items.summWords);
	
	console.log('keyWordsReg: %s', keyWordsReg);
	console.log('keyWordsSummReg: %s', keyWordsSummReg);

	// получить все новые
	var trakers = document.querySelector("#timeline").querySelectorAll(".u0Entry");
	var ln = trakers.length;
	var sortMas = {};
	console.log('ln: %s', ln);
	for(var i = ln - 1; i >= 0; i--){
		var title = trakers[i].attributes['data-title'].value;
		var summary = trakers[i].querySelector('.u0Summary').innerHTML;
		
		var skip = keyWordsReg.test(title) || keyWordsSummReg.test(summary);
		//console.log('i: %s, skip: %s, title: %s', i, skip, title);
		
		if(skip){
			console.log('delete: %s', title);
			var closeImg = trakers[i].querySelector('div').querySelector('img');
			closeImg.click();
		}
		else{
			if(sortMas[title] === undefined)
				sortMas[title] = 0;
			sortMas[title]++;
		}
	}
	
	var tuples = [];

	for (var key in sortMas)
	  tuples.push([key, sortMas[key]]);

	tuples.sort(function(a, b) {
		a = a[1];
		b = b[1];

		return a > b ? -1 : (a < b ? 1 : 0);
	});
	
	var filmS = "";
	for (var i = 0; i < tuples.length; i++) {
		var key = tuples[i][0];
		var value = tuples[i][1];

		// do something with key and value
		filmS += "|" + key;
	}
	filmS = prompt("Conf", filmS);
	if(filmS !== null){
		keyWordsReg += filmS;
		chrome.storage.sync.set({
			keyWords: keyWords,
			summWords: summWords
			}, function() {
			setTimeout(function() {
			  alert("Save done");
			}, 750);
		 });
	}
		
	console.log('end');
}

  chrome.storage.sync.get({
    keyWords: '',
    summWords: ''
  }, filter);

