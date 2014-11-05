console.log('global utils started');
var SearchApp = SearchApp || {};

SearchApp.globalUtils = SearchApp.globalUtils || {
  "reverseMap" : function(forwardMap) {
  	var reverseMap = {};
  	for (var key in forwardMap) {
	    if (forwardMap.hasOwnProperty(key)) {
        reverseMap[forwardMap[key]] = key;
	    }
	  }
	  return reverseMap;
  },
  "getParameterByName" : function (name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  },
  "addClass" : function(element, className) {
    if (element.className.indexOf(className) < 0) {
      element.className += ' ' + className;
    }
  },
  "removeClass" : function(element, className) {
    if (element.className.indexOf(className) >= 0) {
      element.className = element.className.replace(className, '');
    }
  }
}

console.log('global utils finished');