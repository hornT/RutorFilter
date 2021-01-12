function filter(items){
	console.log('start');

	// Регулярка из ключевых слов дл¤ фильтра
	var keyWordsReg = new RegExp(items.keyWords);
	var keyWordsSummReg = new RegExp(items.summWords);
	
	console.log('keyWordsReg: %s', keyWordsReg);
	console.log('keyWordsSummReg: %s', keyWordsSummReg);

	// получить все новые
	// (\(((19\d{2})|(200\d)|(201[0123456789]))\))|Online|Обои для рабочего стола|КПК|UKR|WEB-DL
	// Сериалы|Музыка|Телевизор|Софт|Научно-популярные фильмы|Наши фильмы|Мультипликация|Спорт|Юмор|Зарубежные сериалы|Наши сериалы|Аниме

	var trakers = document.querySelector(".list-entries").querySelectorAll(".entry--unread");
	var ln = trakers.length;
	var sortMas = {};
	console.log('ln: %s', ln);
	for(var i = ln - 1; i >= 0; i--){
		const dataTitle = trakers[i].attributes['data-title'];
		if(!dataTitle) continue;
		
		var title = dataTitle.value;
		var summary = trakers[i].querySelector('.summary').innerHTML;
		
		var skip = keyWordsReg.test(title) || keyWordsSummReg.test(summary);
		
		if(skip){
			console.log('delete: %s', title);
			var closeImg = trakers[i].querySelector('.icon-fx-cross-ios-sm-black');
			closeImg.click();
		}
	}
		
	console.log('end');
}

chrome.storage.sync.get({
    keyWords: '',
    summWords: ''
}, filter);

