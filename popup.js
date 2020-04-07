let presentationSelector = document.getElementById('presentation-selector');

const packageRegex = new RegExp("^https://(github\.com/[^/]+/[^/]+)(?=/|$)");

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  let url = tabs[0].url;
  if (!packageRegex.test(url)) {
    return
  }
  let label = tabs[0].url.replace(packageRegex, "$1");
  let item = document.createElement('div');
  let attr = document.createAttribute('role');
  attr.value = "menuitem";
  item.setAttributeNode(attr);
  item.appendChild(document.createTextNode(label));
  presentationSelector.appendChild(item);
});
