// Saves options to chrome.storage
function save_options() {
  var keyWords = document.getElementById('keyWords').value;
  var summWords = document.getElementById('summWords').value;
  chrome.storage.sync.set({
    keyWords: keyWords,
    summWords: summWords
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// stored in chrome.storage.
function restore_options() {
	console.log('addEventListener2');
	document.getElementById('saveStgs').addEventListener('click', save_options);
	
  // 
  chrome.storage.sync.get({
    keyWords: '',
    summWords: ''
  }, function(items) {
    document.getElementById('keyWords').value = items.keyWords;
    document.getElementById('summWords').value = items.summWords;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
