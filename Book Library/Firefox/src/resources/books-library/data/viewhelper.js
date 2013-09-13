/*
 * ViewHelper
 *
 */

var ViewHelper = function()
{

}

ViewHelper.prototype.focusGained = function(el)
{
  $(el).prev('.inputBack').stop();
  if ($(el).val() == '')
    $(el).prev('.inputBack').animate({opacity: 0.5}, 400);
  else
    $(el).prev('.inputBack').animate({opacity: 0}, 200);
}

ViewHelper.prototype.focusLost = function(el)
{
  $(el).prev('.inputBack').stop();
  if ($(el).val() == '')
    $(el).prev('.inputBack').animate({opacity: 1}, 200);
}

ViewHelper.prototype.handleOninput = function(el)
{
  $(el).prev('.inputBack').stop();
  if ( $(el).val() == '' )
    $(el).prev('.inputBack').animate({opacity: 0.5}, 200);
  else
    $(el).prev('.inputBack').animate({opacity: 0}, 0);
}

ViewHelper.prototype.generateFilesize = function(filesize)
{
  var c = 0;
  while (filesize > 1024)
  {
    filesize = filesize / 1024;
    c++;
  }
  var measure = 'bytes'
  switch(c)
  {
    case 1 :
      measure = 'Kb';
      break;
    case 2 :
      measure = 'Mb';
      break;
    case 3 :
      measure = 'Gb';
      break;
  }
  return ( filesize % 1 === 0 ? filesize :  filesize.toFixed(2) ) + ' ' + measure;
}

ViewHelper.prototype.generateAuthorURL = function(author)
{
  return library.libraryURL+'#st=0&sba='+encodeURIComponent(author);
}

ViewHelper.prototype.generateDownloadURL = function(md5)
{
  return library.methodURL.download+'?md5='+md5;
}

ViewHelper.prototype.generateFindpageURL = function(md5)
{
  return library.methodURL.findpage+'?md5='+md5+'&redirect=1';
}










