# Book Library API

### Description of the API features

[API] (http://en.wikipedia.org/wiki/API) methods of Vnuki Library provide an opportunity to:
+ Search for books;
+ Download books by [md5] (http://en.wikipedia.org/wiki/Md5) keys;
+ Create your own online library using search engine and file storage of Vnuki Library;
+ Develop a library application for any platform

### API call format
To make an API call you should send the [HTTP GET] (http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3) request to the server **api.books.artemplatonov.com** in format:

    api.books.artemplatonov.com/method/Method_name?[Parameters_list_as_key=value][&xml=1]
    
## API Methods

### search

Method **search** searches the books on a given substring. Returns up to 100 max [relevant] (http://en.wikipedia.org/wiki/Relevance_%28information_retrieval%29) results or an error. The very first element of the results array is the total number of found books.

Accepts two arguments:
+ **query** (required) - URL-encoded search query string.
+ **return** (optional) - comma separated list of additional field names that should be returned in results apart **md5** field. Available field names: **title**, **authors**, **description**, **extension**, **filesize**, **imageUrl**. Field **md5** is always returned.

An example of the request:

    api.books.artemplatonov.com/method/search?query=thinking+in+java+Eckel
    
Will return a similar result:
```json
{"response":{"books":[3,{"md5":"b51a894deb1d060b2543fc838339181b"},{"md5":"a1f01a7a725cef3983a83c860298097a"},{"md5":"88dfcd75e8387f67a201f93e7f1b7395"}]}}
```

An example of the request with additional parameters:

     api.books.artemplatonov.com/method/search?query=english+grammar&return=title,authors,extension
     
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

    api.books.artemplatonov.com/method/download?md5=095374fa95ff3b2a823e99692c5f18e5
    
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

=
### findPage

Method **findPage** returns the URL of the page of a book on vnuki.org site. In case of additional parameter **redirect=1** is specified the API also redirects the client's browser to this page.

Accepts two arguments:
+ **md5** (required) - a sequence of 32 hexadecimal digits which is the [md5 hash] (http://en.wikipedia.org/wiki/Md5#MD5_hashes) of the file of the requested book.
+ **redirect** (optional) - a flag that could be set in *0* or *1*. By default is *0*.

An example of the request:

    api.books.artemplatonov.com/method/findPage?md5=095374fa95ff3b2a823e99692c5f18e5
    
An example of the response in [JSON] (http://en.wikipedia.org/wiki/JSON) format:
```json
{"response":{"url":"http:\/\/vnuki.org\/library\/book\/347363"}}
```
An example of the response in [XML] (http://en.wikipedia.org/wiki/XML) format:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<response>
  <url>http://vnuki.org/library/book/347363</url>
</response>
```
Possible responses in case of error:
+ error_code: **10** ("Wrong MD5 string passed.")
+ error_code: **15** ("Book not found.")

=
### listPopular

Method **listPopular** returns up to 100 most popular books.  

Accepts two arguments:
+ **format** (optional) - comma separated list of formats to filter. Supported formats: **fb2.zip**, **pdf**, **djvu**, **doc**, **mobi**, **rtf**, **txt**, **zip**, **rar**.
+ **return** (optional) - comma separated list of additional field names that should be returned in results apart **md5** field. Available field names: **title**, **authors**, **description**, **extension**, **filesize**, **imageUrl**. Field **md5** is always returned.

An example of the request:

    api.books.artemplatonov.com/method/listPopular?format=pdf,djvu
    
=
### getStatistics

Method **getStatistics** returns statistics on the available books. 

Does not accept arguments.

Returns variables:
+ *total.books* - Total amount of books available for downloading;
+ *total.filesize* - The total weight of the available files in bytes;
+ *md5_hashes_data.csv_file_url* - The link to the [CSV] (http://en.wikipedia.org/wiki/Comma-separated_values) file of the md5 hashes of available books;
+ *md5_hashes_data.last_modified* - The time of last change of the CSV file in seconds elapsed since the Unix Epoch start;
+ *md5_hashes_data.filesize* - The weight of this CSV file in bytes;
+ *books_table_data.sql_file_url* - The link to the [zip-archive] (http://en.wikipedia.org/wiki/ZIP_%28file_format%29) of the [SQL] (http://en.wikipedia.org/wiki/SQL) file with queries the execution of which recreates [MyISAM] (http://en.wikipedia.org/wiki/MyISAM) table *api_vnuki_books* for use on the server side;
+ *books_table_data.last_modified* - The time of last change of compressed SQL file in seconds elapsed since the Unix Epoch start;
+ *books_table_data.filesize* - The weight of this zip-archive in bytes.

An example of the response in [JSON] (http://en.wikipedia.org/wiki/JSON) format:
```json
{"response":{"total":{"books":"335376","filesize":"817204333243"},"md5_hashes_data":{"last_modified":1333453171,"csv_file_url":"http:\/\/api.books.artemplatonov.com\/data\/md5.csv","filesize":11067407},"books_table_data":{"last_modified":1333463562,"sql_file_url":"http:\/\/api.books.artemplatonov.com\/data\/api_books.sql.zip","filesize":70083217}}}
```
An example of the response in [XML] (http://en.wikipedia.org/wiki/XML) format:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<response>
  <total>
    <books>357215</books>
    <filesize>1114634724541</filesize>
  </total>
  <md5_hashes_data>
    <last_modified>1348952901</last_modified>
    <csv_file_url>http://api.books.artemplatonov.com/data/md5.csv</csv_file_url>
    <filesize>11788094</filesize>
  </md5_hashes_data>
  <books_table_data>
    <last_modified>1348474056</last_modified>
    <sql_file_url>http://api.books.artemplatonov.com/data/api_books.sql.zip</sql_file_url>
    <filesize>77886102</filesize>
  </books_table_data>
</response>
```

## Extra API methods and features

### opds.search

Method **opds.search** generates the feed in format of [OPDS catalog] (http://en.wikipedia.org/wiki/OPDS) using the search string.

Accepts one argument:
+ **query** (required) - URL-encoded search query string.

An example of the request:

    api.books.artemplatonov.com/method/opds.search?query=computer+science
    
An example of the response:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/terms/" xmlns:os="http://a9.com/-/spec/opensearch/1.1/" xmlns:opds="http://opds-spec.org/2010/catalog">
  <id>org.vnuki.books.opds.search.51152aa081758</id>
  <title>Search Results</title>
  <icon>http://api.books.artemplatonov.com/example/images/favicon.ico</icon>
  <link type="application/atom+xml;profile=opds-catalog;kind=navigation" href="http://api.books.artemplatonov.com/opds.xml" rel="start" title="Home"/>
  <link type="application/opensearchdescription+xml" href="http://api.books.artemplatonov.com/opensearch.xml" rel="search" title="Search for Books"/>
  <updated>2013-02-08T18:41:04Z</updated>
  <entry>
    <title>Computer science - an overview</title>
    <id>urn:uuid:88359fb4fe6f1706c76f6f8f97a2b4dc</id>
    <author>
      <name>J. Glenn Brookshear</name>
    </author>
    <content type="text">For over a decade, students and instructors alike have praised the broad coverage and clear exposition in the leading text Computer Science: An Overview. Glenn Brookshear draws on years of success in the classroom in this practical, language-independent approach to the introduction of core computing science topics. This Ninth Edition provides a balanced, realistic picture of the dynamic nature of computer science by presenting the historical background and the most up-to-date research and trends. It engages students with timely topics like bioinformatics and artificial intelligence, and provides coverage of foundational hardware topics like data representation/storage, machine architecture, and machine language.</content>
    <dc:format>djvu</dc:format>
    <link type="image/jpeg" rel="http://opds-spec.org/image/thumbnail" href="http://upload.vnuki.org/books/ava/21/209982_f09fe786.jpg"/>
    <link type="text/html" rel="alternate" title="View in Browser" href="http://api.books.artemplatonov.com/method/findPage?md5=88359fb4fe6f1706c76f6f8f97a2b4dc&amp;redirect=1"/>
    <link type="image/x-djvu" rel="http://opds-spec.org/acquisition/open-access" href="http://api.books.artemplatonov.com/method/download?md5=88359fb4fe6f1706c76f6f8f97a2b4dc"/>
    <updated>2013-02-08T18:41:04Z</updated>
  </entry>
  <entry>
    <title>Computer science handbook</title>
    <id>urn:uuid:9d615734bfb5e8d9657d68b81068d4d3</id>
    <author>
      <name>Tucker A.B. (ed.)</name>
    </author>
    <content type="text">The second edition of this elemental handbook reviews the current state of theory and practice in the field while emphasizing a more practical/applied approach to IT topics such as information management, net-centric computing, and human computer interaction. With a complete revision of its sections on software engineering, architecture, and operating systems, this now thoroughly up-to-date manual is as cutting-edge in the new millennium as it was in the nineties. The Computer Science Handbook, Second Edition includes new information on Web-based software, speech recognition, data mining, cryptography, and distributed objects computing as well as references and sources for further information.</content>
    <dc:format>pdf</dc:format>
    <link type="image/jpeg" rel="http://opds-spec.org/image/thumbnail" href="http://upload.vnuki.org/books/ava/21/209994_21b4fc74.jpg"/>
    <link type="text/html" rel="alternate" title="View in Browser" href="http://api.books.artemplatonov.com/method/findPage?md5=9d615734bfb5e8d9657d68b81068d4d3&amp;redirect=1"/>
    <link type="application/pdf" rel="http://opds-spec.org/acquisition/open-access" href="http://api.books.artemplatonov.com/method/download?md5=9d615734bfb5e8d9657d68b81068d4d3"/>
    <updated>2013-02-08T18:41:04Z</updated>
  </entry>
  <entry>
    <title>Handbook of theoretical computer science. Algorithms and complexity</title>
    <id>urn:uuid:628cec0685e19b3fd807434d152f7081</id>
    <author>
      <name>van Leeuwen J. (ed.)</name>
    </author>
    <content type="text">This first part presents chapters on models of computation, complexity theory, data structures, and efficient computation in many recognized sub-disciplines of Theoretical Computer Science.</content>
    <dc:format>djvu</dc:format>
    <link type="image/jpeg" rel="http://opds-spec.org/image/thumbnail" href="http://upload.vnuki.org/books/ava/21/209998_3733edb8.jpg"/>
    <link type="text/html" rel="alternate" title="View in Browser" href="http://api.books.artemplatonov.com/method/findPage?md5=628cec0685e19b3fd807434d152f7081&amp;redirect=1"/>
    <link type="image/x-djvu" rel="http://opds-spec.org/acquisition/open-access" href="http://api.books.artemplatonov.com/method/download?md5=628cec0685e19b3fd807434d152f7081"/>
    <updated>2013-02-08T18:41:04Z</updated>
  </entry>
</feed>
```

=
### opds.listPopular

Method **opds.listPopular** generates the feed in format of [OPDS catalog] (http://en.wikipedia.org/wiki/OPDS) of up to 100 most popular books.

Accepts one argument:
+ **format** (optional) - comma separated list of formats to filter. Supported formats: **fb2.zip**, **pdf**, **djvu**, **doc**, **mobi**, **rtf**, **txt**, **zip**, **rar**.

An example of the request:

    api.books.artemplatonov.com/method/opds.listPopular?format=pdf,djvu

=
### OPDS Catalog

[OPDS catalog] (http://en.wikipedia.org/wiki/OPDS) that currently supports only search functionality - **http://api.books.artemplatonov.com/opds.xml**

### OpenSearch

[OpenSearch Description Document] (http://en.wikipedia.org/wiki/OpenSearch) that allows to search for books on api.books.artemplatonov.com - **http://api.books.artemplatonov.com/opensearch.xml**

### Browser Extensions

Our API based library extensions for popular browsers:

+ [Google Chrome] (https://chrome.google.com/webstore/detail/nkbdabbfpcmlgnpadccpnohdkcpmenen)
+ [Mozilla Firefox] (https://addons.mozilla.org/en-US/firefox/addon/books-library/)
+ [Opera] (https://addons.opera.com/ru/extensions/details/library/)

![library extension - Screenshot](https://lh6.googleusercontent.com/mLkgE4KUKJ2gtGT5DgsXF0BbKf6BP_omE7ZnCRbY5znkGnQ1brZiVP9GJDJwedV0zZC1aQwhJZM=s640-h400-e365-rw "Book Library browser extension screenshot")
