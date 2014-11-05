console.log('background started');
var SearchApp = SearchApp || {};

if (!SearchApp.background) {
  SearchApp.background = {
      "onUpdated" : function (tabId, changeInfo, tab) {
        console.log('background.onUpdated %s %s',changeInfo.status, tab.url);
        if (changeInfo.status == 'complete' && tab.url.indexOf("http") == 0) { // excludes chrome devtools and extension
          console.log('background.onUpdated start processing');
          SearchApp.background.incognito = tab.incognito;

          if (!SearchApp.background.incognito) {
            var result = SearchApp.background.getSiteHandler(tab);

            SearchApp.background.siteHandler = null;
            if (result.isHomeUrl || result.isSearchPageUrl) {
              chrome.pageAction.show(tabId);
              SearchApp.background.siteHandler = result.siteHandler;

              if (result.isSearchPageUrl) {
                chrome.runtime.sendMessage({"api":"main-copy", "parameters":{"tabId" : tabId}});
              }
              else {
                SearchApp.main.getData("preferences", function(response) {
                  if (!response || response.autoPaste == true) {
                    console.log('background.onUpdated autoPasting');
                    chrome.runtime.sendMessage({"api":"main-paste", "parameters":{"tabId" : tabId}});
                  }
                });
              }
            }
          }
        }
      },
      "onFocusChanged" : function(windowId){
        if (SearchApp.background.currentWindowId) {
          chrome.windows.remove(SearchApp.background.currentWindowId);
          SearchApp.background.currentWindowId = null;
        }
      },
      "getSiteHandler" : function(tab) {
          var result = {"isHomeUrl" : false, "isSearchPageUrl" : false};
          for(var i=0; i < SearchApp.siteHandlers.list.length; i++) {
            var siteHandler = SearchApp.siteHandlers.list[i];
            for(var j=0; j < siteHandler.urls.length; j++) {
              var url = siteHandler.urls[j];
              var regExp = new RegExp(url, 'i');
              if (regExp.test(tab.url))
              {
                result.siteHandler = siteHandler;
                result.isHomeUrl = true;
                break;
              }
            }
            if (siteHandler.searchPage) {
              var regExp = new RegExp(siteHandler.searchPage.url, 'i');
              if (regExp.test(tab.url))
              {
                result.siteHandler = siteHandler; // needed if site not found but search page found e.g. argos config
                result.isSearchPageUrl = true;
                break;
              }
            }
          }
          if (!result.siteHandler) {
            console.log('Search Aid : Site handler not found');
          }
          return result;
      }
  };
}

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(SearchApp.background.onUpdated);
chrome.windows.onFocusChanged.addListener(SearchApp.background.onFocusChanged);

console.log('background finished');