
/*
 * Init
 *
 */
var library;

self.port.on("show", function (data)
{
    $('#query').focus();
    library = data;
});

self.port.on("showresultsAction", function (data)
{
    var controller = new Controller();
    controller.showresultsAction(data);
});

$(function()
{
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
  {
    e.preventDefault();
    var md5 = $(this).data('md5');
    controller.downloadAction(md5);
  });

  $("#searchResults").on("click", ".bookmark .lnk", function(e)
  {
    e.preventDefault();
    var md5 = $(this).data('md5');
    controller.findpageAction(md5);
  });
  
  $("#searchResults").on("click", ".image a", function(e)
  {
    e.preventDefault();
    var md5 = $(this).data('md5');
    controller.findpageAction(md5);
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
  
});
