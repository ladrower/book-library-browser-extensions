/*
 * Controller
 *
 */

var Controller = function()
{

}

Controller.prototype.indexAction = function()
{

}

Controller.prototype.searchAction = function(query)
{
  var libraryView = new View();

  query = $.trim(query);
  if (query.length == 0)
  {
    libraryView.clearSearchResults();
    return false;
  }

  libraryView.showProgress();
  self.port.emit("searchAction", {query: query});
  return false;
}

Controller.prototype.showresultsAction = function(results)
{
  var libraryView = new View();

  if (results && results.books)
  {
    var count = results.books[0] || 0;
    var data = results.books.slice(1);
    libraryView.displaySearchResults(data);
  } else {
    libraryView.clearSearchResults();
  }
}

Controller.prototype.downloadAction = function(md5)
{
  self.port.emit("downloadAction", {md5: md5});
}

Controller.prototype.findpageAction = function(md5)
{
  self.port.emit("findpageAction", {md5: md5});
}
