try {
  chrome.runtime.sendMessage({
    source: 'github',
    event: 'success',
    result: init()
  })
} catch (e) {
  chrome.runtime.sendMessage({
    source: 'github',
    event: 'error',
    error: e
  })
}

function init() {
  let pathParts = document.location.pathname.split('/');
  if (pathParts.length < 3) {
    throw 'not supported path'
  }

  return {
    name: document.location.hostname + pathParts.slice(0, 3).join('/'),
    branch: branch()
  }
}

function branch() {
  let branchBox = document.querySelector('#branch-select-menu > summary > span');
  if (!branchBox) {
    return;
  }
  return branchBox.innerText;
}
