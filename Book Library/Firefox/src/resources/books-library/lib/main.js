exports.main = function() {

    var data = require("self").data;
    
    var request = require("request").Request;
    
    var tabs = require('tabs');
    
    var panel = require("panel").Panel({
      width:370,
      height:400,
      contentURL: data.url("popup.html"),
      contentScriptFile: [data.url("jquery-1.7.2.min.js"),data.url("view.js"),data.url("viewhelper.js"),data.url("controller.js"),data.url("init.js")]
    });
    
    var widget = require("widget").Widget({
        id: "books.vnuki.org",
        label: "Library",
        contentURL: data.url("favicon.ico"),
        panel: panel
    });
    
    panel.on('show', function() {
        panel.port.emit('show', new Library());
    });

    panel.port.on("searchAction", function(data)
    {
        var library = new Library();
        library.search(data.query);  
    });
    
    panel.port.on("downloadAction", function(data)
    {
        var library = new Library();
        library.download(data.md5);  
    });
    
    panel.port.on("findpageAction", function(data)
    {
        var library = new Library();
        library.findpage(data.md5);  
    });

    /*
     * Library Model
     *
     */
    var Library = function()
    {
      this.methodURL = {'search': 'http://books.vnuki.org/method/search', 'download': 'http://books.vnuki.org/method/download', 'findpage': 'http://books.vnuki.org/method/findPage'};
      this.apiKey = '90485e931f687a9b9c2a66bf58a3861a';
      this.libraryURL = 'http://vnuki.org/library/';
    }
    
    Library.prototype.search = function(query)
    {
        var url = this.methodURL.search+
                '?api_key='+encodeURIComponent(this.apiKey)+
                '&query='+encodeURIComponent(query)+
                '&return=title,authors,extension,filesize,imageUrl'+
                '&per_page=100';
        request({
          url: url,
          onComplete: function (data) {
            var response = data.json.response || null;
            panel.port.emit("showresultsAction", response);
          }
        }).get();
    }
    
    Library.prototype.download = function(md5)
    {
        var url = this.methodURL.download+'?md5='+md5;
        tabs.open(url);
    } 
    
    Library.prototype.findpage = function(md5)
    {
        var url = this.methodURL.findpage+'?md5='+md5+'&redirect=1';
        tabs.open(url);
    }
    
};