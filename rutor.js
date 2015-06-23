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
	}
		
	console.log('end');
}

  chrome.storage.sync.get({
    keyWords: '',
    summWords: ''
  }, filter);

