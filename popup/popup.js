console.log('popups started');

var SearchApp = SearchApp || {};

SearchApp.popup = {
  "updateSearchDetails" : function (obj, bgPage) {
    document.getElementById('search-details').style.display= (obj) ? "inline" : "none";
    document.getElementById('search-details-missing').style.display= (obj) ? "none" : "inline";
    if (obj) {
      document.getElementById('term').innerText = obj;
    }
  },
  "onLoad" : function() {
    console.log('onLoad called');
    chrome.runtime.getBackgroundPage(function(bgPage) {
      if (bgPage.SearchApp.background.incognito) {
        SearchApp.popup.updateSearchDetails(bgPage[bgPage.SearchApp.background.siteHandler], bgPage);
      }
      else {
        chrome.runtime.sendMessage({"api":"main-get-data", "parameters" : "data"}, function(response) {
          SearchApp.popup.updateSearchDetails(response, bgPage);
        });
        chrome.runtime.sendMessage({"api":"main-get-data", "parameters" : "preferences"}, function(response) {
          document.getElementById('autoPaste').checked = (response)? response.autoPaste : true;
        });
      }
    });

    var siteListElement = document.getElementById('site-list');
    for(var i=0; i < SearchApp.siteHandlers.sorted.length; i++) {
      var siteHandler = SearchApp.siteHandlers.sorted[i];
      var liElement = document.createElement("li");
      liElement.appendChild(document.createTextNode(siteHandler.id));
      siteListElement.appendChild(liElement);
    }
  },
  "setMessages" : function(messages) {
    document.getElementById('messages').innerText = messages;
  }
};


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('toggle-more-info').addEventListener('click', function(){
      var moreInfoElement = document.getElementById('more-info');
      moreInfoElement.style.display = moreInfoElement.style.display == "inline" ? "none" : "inline";
    });
    document.getElementById('autoPaste').addEventListener('click', function (e) {
      chrome.runtime.sendMessage({"api":"main-save-data", "parameters" : 
        {"data":{"autoPaste": e.target.checked}, 
         "table" : "preferences"}
      });
    });
    document.getElementById('clear').addEventListener('click', function (e) {
      chrome.storage.sync.clear();
    });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('popup onMessage called %s %O', request.api, request.parameters);
    switch (request.api)
    {
      case 'main-persist-search-details' :
        chrome.runtime.getBackgroundPage(function(bgPage) {
          SearchApp.popup.updateSearchDetails(request.parameters, bgPage);
        });
        break;
      case 'popup-messages' :
        SearchApp.popup.setMessages(request.parameters);
        break;
    }
  });

window.onload = SearchApp.popup.onLoad();