chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.storage.sync.get(null, (theValue) => {
      if (theValue[tab.url] !== undefined) {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: (code) => eval(code),
          args: [theValue[tab.url]]
        });
      }
    });
  }
});
