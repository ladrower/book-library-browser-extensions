# Book Library API

### Description of the API features

[API] (http://en.wikipedia.org/wiki/API) methods of Vnuki Library provide an opportunity to:
+ Search for books;
+ Download books by [md5] (http://en.wikipedia.org/wiki/Md5) keys;
+ Create your own online library using search engine and file storage of Vnuki Library;
+ Develop a library application for any platform

### API call format
To make an API call you should send the [HTTP GET] (http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3) request to the server **books.vnuki.org** in format:

    books.vnuki.org/method/Method_name?[Parameters_list_as_key=value][&xml=1]
    
## API Methods

### search

Method **search** searches the books on a given substring. Returns up to 100 max [relevant] (http://en.wikipedia.org/wiki/Relevance_%28information_retrieval%29) results or an error. The very first element of the results array is the total number of found books.

Accepts two arguments:
+ **query** (required) - URL-encoded search query string.
+ **return** (optional) - comma separated list of additional field names that should be returned in results apart **md5** field. Available field names: **title**, **authors**, **description**, **extension**, **filesize**, **imageUrl**. Field **md5** is always returned.

An example of the request:

    books.vnuki.org/method/search?query=thinking+in+java+Eckel
    
Will return a similar result:
```json
{"response":{"books":[3,{"md5":"b51a894deb1d060b2543fc838339181b"},{"md5":"a1f01a7a725cef3983a83c860298097a"},{"md5":"88dfcd75e8387f67a201f93e7f1b7395"}]}}
```

An example of the request with additional parameters:

     books.vnuki.org/method/search?query=english+grammar&return=title,authors,extension
     
An example of the response in [JSON] (http://en.wikipedia.org/wiki/JSON) format:
```json
{"response":{"books":[5,{"md5":"a80baf541a1a5720b3e7269d4f820e9a","title":"Advanced Language Practice (with Key) English Grammar and Vocabulary","authors":"Michael Vince , Peter Sunderland","extension":"pdf"},{"md5":"47079630643817a5b2b41539b8b35f1a","title":"Fundamentals of English grammar","authors":"Betty Schrampfer Azar","extension":"djvu"},{"md5":"aa9f1bf313033e31ea9a174ac85bef0e","title":"Schaum's Outline of English Grammar","authors":"Eugene Ehrlich","extension":"djvu"},{"md5":"f564cdc62c910fa49636dd9d2d381ef3","title":"The online English grammar","authors":"Hughes A.","extension":"pdf"},{"md5":"b93e49b20057448f93e85586a8bf4c92","title":"English grammar in use: a self-study guide","authors":"Raymond Murphy","extension":"djvu"}]}}
```

An example of the response in [XML] (http://en.wikipedia.org/wiki/XML) format:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<response>
  <count>5</count>
  <book>
    <md5>a80baf541a1a5720b3e7269d4f820e9a</md5>
    <title>Advanced Language Practice (with Key) English Grammar and Vocabulary</title>
    <authors>Michael Vince , Peter Sunderland</authors>
    <extension>pdf</extension>
  </book>
  <book>
    <md5>47079630643817a5b2b41539b8b35f1a</md5>
    <title>Fundamentals of English grammar</title>
    <authors>Betty Schrampfer Azar</authors>
    <extension>djvu</extension>
  </book>
  <book>
    <md5>aa9f1bf313033e31ea9a174ac85bef0e</md5>
    <title>Schaum's Outline of English Grammar</title>
    <authors>Eugene Ehrlich</authors>
    <extension>djvu</extension>
  </book>
  <book>
    <md5>f564cdc62c910fa49636dd9d2d381ef3</md5>
    <title>The online English grammar</title>
    <authors>Hughes A.</authors>
    <extension>pdf</extension>
  </book>
  <book>
    <md5>b93e49b20057448f93e85586a8bf4c92</md5>
    <title>English grammar in use: a self-study guide</title>
    <authors>Raymond Murphy</authors>
    <extension>djvu</extension>
  </book>
</response>
```

**Examples of the response in case of empty result:**

JSON:
```json
{"response":{"books":[0]}}
```

XML:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<response>
  <count>0</count>
</response>
```

Possible responses in case of error:
+ error_code: **30** ("Query string is too short.") *Occurs when query string is zero length*

=
### download

Method **download** returns requested file or an error.
Accepts one argument:
+ **md5** (required) - a sequence of 32 hexadecimal digits which is the [md5 hash] (http://en.wikipedia.org/wiki/Md5#MD5_hashes) of the requested file.

An example of the request:

    books.vnuki.org/method/download?md5=095374fa95ff3b2a823e99692c5f18e5
    
Possible responses in case of error:
+ error_code: **10** ("Wrong MD5 string passed.")
+ error_code: **15** ("Book not found.")
+ error_code: **20** ("File not found.")

An example of the response in case of error in [JSON] (http://en.wikipedia.org/wiki/JSON) format:
```json
{"response":{"error":[{"error_code":10,"description":"Wrong MD5 string passed."}]}}
```
An example of the response in case of error in [XML] (http://en.wikipedia.org/wiki/XML) format:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<response>
  <error>
    <error_code>10</error_code>
    <description>Wrong MD5 string passed.</description>
  </error>
</response>
```

