/*
 * View
 *
 */

var View = function()
{
  this.resultsContainer = $('#searchResults');
  this.searchContainer = $('#query');
  this.progressBar = $('#search .progress');
}

View.prototype.displaySearchResults = function(data)
{
  this.hideProgress();
  if (data.length > 0) {
    var viewHelper = new ViewHelper();
    this.resultsContainer.empty();

    for(var i = 0; i < data.length; i++) {
      
      var authors = data[i].authors.split(',');
      var authorsLinks = [];
      for (var a = 0; a < authors.length; a++) {
        var author = $.trim(authors[a]);
        var authorEl = $("<a/>", { 'href': viewHelper.generateAuthorURL(author) }).text(author);
        authorsLinks.push($('<div/>').append(authorEl).html());
      }

      var resultItem = $('<div/>').addClass('resultItem p_relative');

      var itemImage = $('<div/>').addClass('image').append( 
        $('<a/>', {
          'href': viewHelper.generateFindpageURL(data[i].md5)
        }).data('md5', data[i].md5).append( 
          $('<img/>', {
            'src': data[i].imageUrl, 
            'width': '40px'
          }) 
        )
      );

      var itemDownload = $('<div/>').addClass('download').append(
        $('<a/>', {
          href: viewHelper.generateDownloadURL(data[i].md5)
        }).data('md5', data[i].md5).addClass('lnk').text('Download ('+data[i].extension.toUpperCase()+')')
      ).append(
        $('<span/>').addClass('filesize').text(viewHelper.generateFilesize(data[i].filesize))
      );

      var itemBookmark = $('<div/>').addClass('bookmark').append(
        $('<a/>', {
          href: viewHelper.generateFindpageURL(data[i].md5),
          title: 'permalink'
        }).data('md5', data[i].md5).addClass('lnk').text('#'+(i+1))
      );

      var leftBlock = $('<div/>').addClass('leftBlock');
      var rightBlock = $('<div class="rightBlock">'+
                          '<h4></h4>'+
                          '<div class="authors"><span></span></div>'+
                        '</div>');

      leftBlock.append(itemImage);
      rightBlock.find('h4').text(data[i].title);
      rightBlock.find('.authors span').html(authorsLinks.join(', '));
      rightBlock.append(itemDownload).append(itemBookmark);

      resultItem.append(leftBlock).append(rightBlock);

      this.resultsContainer.append(resultItem);
    }
    this.adjustScreen();

  } else {
    this.resultsContainer.html('<div class="no_results">No results match your criteria</div>');
  }

}

View.prototype.clearSearchResults = function()
{
  this.hideProgress();
  this.resultsContainer.html('');
  this.searchContainer.focus();
}

View.prototype.showProgress = function()
{
  this.progressBar.css('opacity', 1);
}

View.prototype.hideProgress = function()
{
  this.progressBar.css('opacity', 0);
}

View.prototype.adjustScreen = function()
{
  $(window).scrollTop(0);
}