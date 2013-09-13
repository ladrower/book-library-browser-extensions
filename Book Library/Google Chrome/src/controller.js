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
  var libraryModel = new Library();
  libraryModel.search(query, this.showresultsAction);
  return false;
}

Controller.prototype.showresultsAction = function(results)
{
  var libraryView = new View();

  if (results.books)
  {
    var count = results.books[0] || 0;
    var data = results.books.slice(1);
    libraryView.displaySearchResults(data);
  } else {
    libraryView.clearSearchResults();
  }
}