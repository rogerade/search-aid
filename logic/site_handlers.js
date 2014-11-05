var SearchApp = SearchApp || {};

if (!SearchApp.siteHandlers) {
  SearchApp.siteHandlers = {
    "list" : [{
        "id" : "Alibaba UK",
        "urls" : ["http://uk.alibaba.com/$"],
        "setterScript" : "document.getElementsByName('SearchText')[0].value=text",
        "searchPage" : {
          "url" : "http://uk.alibaba.com/trading-search",
          "getterScript" : "document.getElementsByName('SearchText')[0].value"
        }
      },{
        "id" : "Alibaba USA",
        "urls" : ["http://www.alibaba.com/$"],
        "searchPage" : {
          "url" : "http://www.alibaba.com/trade/search",
          "getterScript" : "document.getElementsByName('SearchText')[0].value"
        }
      },{
        "id" : "Amazon",
        "urls" : ["http://www.amazon..*/$","http://www.amazon..*/ref=nav_logo"],
        "setterScript" : "document.getElementById('twotabsearchtextbox').value=text",
        "searchPage" : {
          "url" : "http://www.amazon..*/s/ref",
          "getterScript" : "document.getElementById('twotabsearchtextbox').value"
        }
      },{
        "id" : "Argos",
        "urls" : ["http://www.argos.co.uk/static/Home.htm"],
        "setterScript" : "document.getElementsByName('searchTerm')[0].value=text",
        "searchPage" : {
          "url" : "http://www.argos.co.uk/static/Search/.*",
          "getterScript" : "document.getElementsByName('searchTerm')[0].value"
        }
      },{
        "id" : "Boots UK",
        "urls" : ["http://www.boots.com/$"],
        "setterScript" : "document.getElementsByName('searchTerm')[0].value=text",
        "searchPage" : {
          "url" : "http://www.boots.com/webapp/wcs/stores/servlet/SolrSearchLister",
          "getterScript" : "SearchApp.globalUtils.getParameterByName('searchTerm')"
        }
      },{
        "id" : "Boots USA",
        "urls" : ["http://us.boots.com/$","http://us.boots.com//webstore/store/shopbootsusa/home.do"],
        "setterScript" : "document.getElementsByName('searchBox')[0].value=text",
        "searchPage" : {
          "url" : "http://us.boots.com//search/",
          "getterScript" : "document.getElementsByName('searchBox')[0].value"
        }
      },{
        "id" : "Clarks UK",
        "urls" : ["http://www.clarks.co.uk/$"],
        "setterScript" : "document.getElementsByName('searchString')[0].value=text",
        "searchPage" : {
          "url" : "http://www.clarks.co.uk/s/",
          "getterScript" : "document.getElementById('search-result-header').children[0].children[0].innerText.replace('You searched for ','')"
        }
      },{
        "id" : "Clarks USA",
        "urls" : ["http://www.clarksusa.com/$"],
        "setterScript" : "document.getElementById('searchTerm').value=text", 
        "searchPage" : {
          "url" : "http://www.clarksusa.com/eng/search/advanced/",
          "getterScript" : "SearchApp.globalUtils.getParameterByName('keywords')"
        }
      },{
        "id" : "Debenhams",
        "urls" : ["http://www.debenhams.com/$"],
        "setterScript" : "document.getElementsByName('txt')[0].value=text",
        "searchPage" : {
          "url" : "http://www.debenhams.com/webapp/wcs/stores/servlet/Navigate",
          "getterScript" : "document.title.replace(' at Debenhams.com', '')"
        }
      },{
        "id" : "Ebay",
        "urls" : ["http://www.ebay..*/$"],
        "setterScript" : "document.getElementById('gh-ac').value=text",
        "searchPage" : {
          "url" : "http://www.ebay..*/sch/i\.html",
          "getterScript" : "document.getElementById('gh-ac').value"
        }
      },{
        "id" : "Goldsmiths",
        "urls" : ["http://www.goldsmiths.co.uk/$"],
        "setterScript" : "document.getElementsByName('text')[0].value=text",
        "searchPage" : {
          "url" : "http://www.goldsmiths.co.uk/search/",
          "getterScript" : "document.title.replace(' | Goldsmiths', '')"
        }
      },{
        "id" : "House Of Fraser",
        "urls" : ["http://www.houseoffraser.co.uk/$","http://www.houseoffraser.co.uk/on/demandware.store/Sites-hof-Site/default/Home-Show"],
        "setterScript" : "document.getElementsByName('q')[0].value=text",
        "searchPage" : {
          "url" : "http://www.houseoffraser.co.uk/on/demandware.store/Sites-hof-Site/default/Search-Show",
          "getterScript" : "SearchApp.globalUtils.getParameterByName('q')"
        }
      },{
        "id" : "John Lewis",
        "urls" : ["http://www.johnlewis.com/$"],
        "setterScript" : "document.getElementsByName('search-keywords')[0].value=text",
        "searchPage" : {
          "url" : "http://www.johnlewis.com/search/",
          "getterScript" : "document.getElementsByName('search-keywords')[0].value"
        }
      },{
        "id" : "MAC",
        "urls" : ["http://www.maccosmetics.co.uk/$"],
        "setterScript" : "document.getElementsByName('search')[0].value=text",
        "searchPage" : {
          "url" : "http://www.maccosmetics.co.uk/search/esearch.tmpl",
          "getterScript" : "SearchApp.globalUtils.getParameterByName('search')"
        }
      },{
        "id" : "Marks and Spencer",
        "urls" : ["http://www.marksandspencer.com/$"],
        "setterScript" : "document.getElementsByName('searchTerm')[0].value=text;\
                          SearchApp.globalUtils.removeClass(document.getElementById('goButton'),'disabled');\
                          SearchApp.globalUtils.addClass(document.getElementById('goButton'),'enabled');\
                          text;", // returned for logs and proves completed successfully
        "searchPage" : {
          "url" : "http://www.marksandspencer.com/search",
          "getterScript" : "document.getElementsByName('search-keywords')[0].value"
        }
      },{
        "id" : "Mothercare",
        "urls" : ["http://www.mothercare.com/$"],
        "setterScript" : "document.getElementsByName('q')[0].value=text",
        "searchPage" : {
          "url" : "http://www.mothercare.com/on/demandware.store/Sites-MCENGB-Site/default/Search-Show",
          "getterScript" : "SearchApp.globalUtils.getParameterByName('q')"
        }
      },{
        "id" : "River Island",
        "urls" : ["http://www.riverisland.com/$"],
        "setterScript" : "document.getElementsByName('keyword')[0].value=text",
        "searchPage" : {
          "url" : "http://www.riverisland.com/search",
          "getterScript" : "SearchApp.globalUtils.getParameterByName('Ntt')"
        }
      },{
        "id" : "Selfridges",
        "urls" : ["http://www.selfridges.com/"],
        "searchPage" : {
          "url" : "http://www.selfridges.com/webapp/wcs/stores/servlet/",
          "getterScript" : "document.title.replace('Search results for \\'', '').replace('\\' - Selfridges | Shop Online', '')"
        }
      },{
        "id" : "Topshop",
        "urls" : ["http://www.topshop.com/$", "http://www.topshop.com/\\?geoip=home$"],
        "setterScript" : "document.getElementsByName('searchTerm')[0].value=text",
        "searchPage" : {
          "url" : "http://www.topshop.com/webapp/wcs/stores/servlet/CatalogNavigationSearchResultCmd",
          "getterScript" : "SearchApp.globalUtils.getParameterByName('searchTerm')"
        }
      }
    ]};

    SearchApp.siteHandlers.sorted = SearchApp.siteHandlers.list.sort(function(item1, item2){
        return item1.id.localeCompare(item2.id);
      });
}