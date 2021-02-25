function excludeName(){
	chrome.tabs.executeScript(null, {file:"addExclude.js"});
}

function clear(){
	chrome.tabs.executeScript(null, {file:"rutor.js"});
}

// stored in chrome.storage.
function load() {
	document.getElementById('btnExclude').addEventListener('click', excludeName);
	document.getElementById('btnClear').addEventListener('click', clear);
}

document.addEventListener('DOMContentLoaded', load);