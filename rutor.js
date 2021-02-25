async function filter(items){
	console.log('start');

	const keyWordsReg = new RegExp(items.keyWords);
	const keyWordsSummReg = new RegExp(items.summWords);
	
	const storage = Sifrr.Storage.getStorage('indexeddb');

	const films = await storage.keys().then(keys => keys);
	let tmpFilms = films.join('|');
	if(items.films != ''){
		tmpFilms += `${tmpFilms}|${items.films}`.replace(/\|/, '');

		const filmItems = items.films.split('|');
		filmItems.forEach(e => {
			storage.set(e, {date: new Date()}).then(() => {
				console.log(`Succes added ${e}`);
			});
		});

		chrome.storage.sync.set({
			keyWords: items.keyWords,
			summWords: items.summWords,
			films: ''
		  }, function() { });
	}
	const filmsReg = tmpFilms == '' ? null : new RegExp(tmpFilms);

	console.log(`filmsReg: ${filmsReg}`);
	console.log(`keyWordsReg: ${keyWordsReg}`);
	console.log(`keyWordsSummReg: ${keyWordsSummReg}`);
	console.log(`keyWordsFilms: ${items.films}`);

	// получить все новые
	// (\(((19\d{2})|(20[01]\d))\))|Online|Обои для рабочего стола|КПК|UKR|WEB-DL
	// Сериалы|Музыка|Телевизор|Софт|Научно-популярные фильмы|Наши фильмы|Мультипликация|Спорт|Юмор|Зарубежные сериалы|Наши сериалы|Аниме

	const entries = document.querySelector(".list-entries");
	if(entries == null){
		console.log('no data');
		return;
	}

	const trakers = entries.querySelectorAll(".entry--unread");
	const ln = trakers.length;
	console.log('ln: %s', ln);

	for(let i = ln - 1; i >= 0; i--){
		const dataTitle = trakers[i].attributes['data-title'];
		if(!dataTitle) continue;
		
		const title = dataTitle.value;
		const summary = trakers[i].querySelector('.summary').innerHTML;
		
		const skip = keyWordsReg.test(title) || keyWordsSummReg.test(summary) || (filmsReg != null && filmsReg.test(title));
		
		if(!skip) continue;

		console.log('delete: %s', title);
		const closeImg = trakers[i].querySelector('.icon-fx-cross-ios-sm-black');
		closeImg.click();
	}

	sortFilms();
		
	console.log('end');
}

function sortFilms(){
	const entries = document.querySelector(".list-entries");
	const list = entries.querySelectorAll(".entry--unread");

	[...list]
	.sort((a, b) => a.attributes['data-title'].value > b.attributes['data-title'].value ? 1 : -1)
	.forEach(node => entries.appendChild(node));
}

  fetch('https://unpkg.com/@sifrr/storage@latest/dist/sifrr.storage.min.js')
  .then(resp => resp.text())
  .then(eval)
  .then(function(){
	chrome.storage.sync.get({
		keyWords: '',
		summWords: '',
		films: ''
	}, filter);
  })
  .catch(console.error)