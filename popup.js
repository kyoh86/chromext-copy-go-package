window.onload=function() {

// add menu items when content scripts report
chrome.runtime.onMessage.addListener(function(message) {
  switch (message.event) {
  case 'success':
    switch (message.source) {
    case 'github':
      let res = message.result;
      let packageName = res.name;
      if (!!res.branch && res.branch !== 'master') {
        packageName += "@" + res.branch;
      }
      addMenu('"' + packageName + '"')
      addMenu('go get "' + packageName + '"')
      break;
    }
    break;
  case 'error':
    console.error(message.error.toString());
    break;
  }
  return true;
});

// call content script
chrome.tabs.executeScript({
  file: 'content/github.js'
});

// create menu item
let presentationSelector = document.getElementById('presentation-selector');

function addMenu(label) {
  let item = document.createElement('li');
  let attr = document.createAttribute('role');
  attr.value = "menuitem";
  item.setAttributeNode(attr);
  item.appendChild(document.createTextNode(label));
  item.addEventListener('click', function() {
    navigator.clipboard.writeText(label)
    window.close();
  });

  presentationSelector.appendChild(item);
}

}; // window.onload=
