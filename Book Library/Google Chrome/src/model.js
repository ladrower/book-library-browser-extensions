/*
 * Model
 *
 */

var Library = function()
{
  this.methodURL = {'search': 'http://books.vnuki.org/method/search', 'download': 'http://books.vnuki.org/method/download', 'findpage': 'http://books.vnuki.org/method/findPage'};
  this.apiKey = '90485e931f687a9b9c2a66bf58a3861a';
  this.libraryURL = 'http://vnuki.org/library/';
}

Library.prototype.search = function(query, callbackController)
{
  $.get(this.methodURL.search, {
      'api_key': this.apiKey,
      'query': query,
      'return': 'title,authors,extension,filesize,imageUrl',
      'per_page': 100
    },
    function(data)
    {
      if (data.response)
      {
        if (typeof(callbackController) === 'function')
        {
          callbackController.bind(null,data.response)();
        }
      }
    },
    'json'
  );
}