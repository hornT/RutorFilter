document.getElementById("keyWords").value = localStorage["keyWords"];
document.getElementById("summWords").value = localStorage["summWords"];

function filter(){
	// Регулярка из ключевых слов дл¤ фильтра
	var keyWordsReg = "/" + localStorage["keyWords"] + "/";// /VA|Хоккей|Баскетбол|Теннис|Футбол|эфир|Обои|MP3|FLAC|19\d{2}|200\d|201[0123]/;
	var keyWordsSummReg = "/" + localStorage["summWords"] + "/";// /Телевизор|Сериалы|Софт|Юмор|Аниме|Спорт|Книги|Научно|Хозяйство|Музыка/;

	// получить все новые
	var trakers = document.querySelector("#timeline").querySelectorAll(".u0Entry");
	var ln = trakers.length;
	//console.log('ln: %s', ln);
	for(var i = ln - 1; i >= 0; i--){
		var title = trakers[i].attributes['data-title'].value;
		var summary = trakers[i].querySelector('.u0Summary').innerHTML;
		
		var skip = keyWordsReg.test(title) || keyWordsSummReg.test(summary);
		//console.log('i: %s, skip: %s, title: %s', i, skip, title);
		
		if(skip){
			//console.log('delete: %s', title);
			var closeImg = trakers[i].querySelector('div').querySelector('img');
			closeImg.click();
		}
	}
}

function saveStgs(){
	localStorage["keyWords"] = document.getElementById("keyWords").value;
	localStorage["summWords"] = document.getElementById("summWords").value;
}