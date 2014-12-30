console.log('main started');

var SearchApp = SearchApp || {};

SearchApp.version = "v1";

SearchApp.main = {
  "getSiteHandler" : function (tabId, callback) {
    chrome.runtime.getBackgroundPage(function(bgPage) {
      var siteHandler = bgPage.SearchApp.background.siteHandler;
      if (siteHandler) {
        SearchApp.main.init(tabId);
        callback(siteHandler, bgPage);
      }
      else {
        callback(null, bgPage);
      }
    });
  },
  "getSearchDetails" : function (params, callbackParams, callback) {
    console.log('main.getSiteHandler started');
    SearchApp.main.getSiteHandler(params.tabId, function(siteHandler, bgPage) {
      if (siteHandler && siteHandler.searchPage && siteHandler.searchPage.getterScript) {
        chrome.tabs.executeScript(params.tabId, {code: "console.log('"+siteHandler.id+" search page handler started');"});
        chrome.tabs.executeScript(params.tabId, {code: "try{"+siteHandler.searchPage.getterScript+"}catch(err) {console.log('Error with getterScript: %s',err.message)}"}, function(result){
          callback(result[0], callbackParams);
        });
        chrome.tabs.executeScript(params.tabId, {code: "console.log('"+siteHandler.id+" search page handler finished');"});
      }
    });
    console.log('main.getSiteHandler finished');
  },
  "setSearchDetails" : function(tabId, callback) {
    console.log('main.setSearchDetails started');
    SearchApp.main.getSiteHandler(tabId, function(siteHandler) {
      SearchApp.main.getData("data", function(items) {
        if (items)
        {
          if (siteHandler && siteHandler.setterScript) {
            chrome.tabs.executeScript(tabId, {code: "var text = "+JSON.stringify(items)+";"});
            chrome.tabs.executeScript(tabId, {code: "console.log('"+siteHandler.id+" setter handler started');"});
            chrome.tabs.executeScript(tabId, {code: "try{"+siteHandler.setterScript+"}catch(err) {console.log('Error with setterScript: %s',err.message)}"}, function(result){
              chrome.tabs.executeScript(tabId, {code: "console.log('"+siteHandler.id+" setter handler finished');"});
              console.log('main.setSearchDetails "%s"', result[0]);
            });
          }
        }
      });
    });
    console.log('main.setSearchDetails finished');
  },
  "saveData" : function(tableName, parameters) {
    if (parameters) {
      var data = {};
      data[SearchApp.main.getTableName(tableName)] = {'value' : parameters, 'timeToLive' : new Date().toString()};
      chrome.runtime.getBackgroundPage(function(bgPage) {
        if (bgPage.SearchApp.background.incognito) {
          bgPage[bgPage.SearchApp.siteHandler] = data;
        }
        else {
          chrome.storage.sync.set(data);
        }
      });
    }
  },
  "getData" : function(tableName, callback) {
    chrome.runtime.getBackgroundPage(function(bgPage) {
      if (bgPage.SearchApp.background.incognito) {
        var data = bgPage[bgPage.SearchApp.siteHandler];
        callback(SearchApp.main.getValidData(data));
      }
      else {
        var table = SearchApp.main.getTableName(tableName);
        chrome.storage.sync.get(table, function(items) {
          callback(SearchApp.main.getValidData(items[table]));
        });
      }
    });
  },
  "getValidData" : function (data) {
    if (!data)
    {
      return null;
    }

    var expired = (new Date() - new Date(data.timeToLive)) > (1000 * 60 * 10);
    if (expired) {
      console.log('expired term');
    }
    return expired ? null : data.value;
  },
  "getTableName" : function(tableName) {
    return SearchApp.version + '-' + tableName;
  },
  "init" : function(tabId) {
    chrome.tabs.executeScript(tabId, {file: "logic/global_utils.js"});
  },
  "copySiteDetails" : function(params) {
    SearchApp.main.getSearchDetails(params, null, function(parameters) {
      if (parameters) {
        chrome.runtime.sendMessage({"api":"main-persist-search-details", "parameters": parameters});
      }
    });
  }
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('main.onMessage started %s %O', request.api, request.parameters);
    switch (request.api)
    {
      case 'main-persist-search-details' :
        SearchApp.main.saveData("data", request.parameters);
        break;
      case 'main-copy' :
        SearchApp.main.copySiteDetails(request.parameters);
        break;
      case 'main-paste' :
        SearchApp.main.setSearchDetails(request.parameters.tabId);
        break;
      case 'main-get-data' :
        SearchApp.main.getData(request.parameters, sendResponse);
        return true; // needed to send a response asynchronously
        break;
      case 'main-save-data' :
        SearchApp.main.saveData(request.parameters.table, request.parameters.data);
        break;
    }
    console.log('main.onMessage finished');
  });

console.log('main finished');