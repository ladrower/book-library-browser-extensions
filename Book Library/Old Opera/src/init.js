/*
 * Init
 *
 */

$(function(){
  var controller = new Controller();
  controller.indexAction();

  $("#search").on("submit", function(e)
  {
    e.preventDefault();
    var query = $('#query').val();
    controller.searchAction(query);
  });

  $("#query").on("focus", function(e)
  {
    var viewHelper = new ViewHelper();
    viewHelper.focusGained(this);
  });

  $("#query").on("blur", function(e)
  {
    var viewHelper = new ViewHelper();
    viewHelper.focusLost(this);
  });

  $("#query").on("input", function(e)
  {
    var viewHelper = new ViewHelper();
    viewHelper.handleOninput(this);
  });

  $("#searchResults").on("click", ".download .lnk", function(e)
  { return true;
    e.preventDefault();
    var md5 = $(this).data('md5');
    vnuki.download(md5);
  });

  $("#searchResults").on("click", ".bookmark .lnk", function(e)
  { return true;
    e.preventDefault();
    var md5 = $(this).data('md5');
    vnuki.findpage(md5);
  });

  $("#searchResults").on("click", ".image a", function(e)
  { return true;
    e.preventDefault();
    var md5 = $(this).data('md5');
    vnuki.findpage(md5);
  });

  $("#searchResults").on("click", ".authors a", function(e)
  {
    e.preventDefault();
    var searchInput = $("#query");
    var author = $(this).text();
    if (author == searchInput.val())
    {
      searchInput.focus();
      return;
    }

    searchInput.val(author);
    searchInput.focus();
    controller.searchAction(author);
  });

  $('#query').focus();
});


var vnuki = {
  model: new Library,
  controller: new Controller,
  view: new View,
  viewHelper: new ViewHelper,

  download: function(md5)
  {
    var url = vnuki.viewHelper.generateDownloadURL(md5);
    opera.extension.tabs.create({url: url});
  },
  findpage: function(md5)
  {
    var url = vnuki.viewHelper.generateFindpageURL(md5);
    opera.extension.tabs.create({url: url});
  }
}
