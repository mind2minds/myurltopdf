myurltopdf
=========
A simple tool to convert any given url or raw html to generate pdf.

Installation
-----------------------

```shell
npm install myurltopdf
```

Usage
-----------------------
To generate pdf follow these simple steps.

To generate pdf from raw html call myhtmltopdf(html,options,callback). see example below the right syntex

```shell
var myurlpdf = require("myurltopdf");
myurlpdf.myhtmltopdf("<strong>Hi Sam,</strong><br/><div> Simple tool to generate raw HTML to pdf using myurltopdf.</div><div style='font-size:12px;color:#DDD'>Created By Dilhad Khan<br/><a href='http://mind2minds.com'>http://mind2minds.com</a></div>",
                    {
                      fileName:"....../filename.pdf"
                    }, function(err){
  if(err){
    console.log(err);
  }else{
    console.log("file created successfully");
  }
});
```
Or

To generate pdf from any url call myurltopdf(url,options,callback). see example below the right syntex

```shell
myurlpdf.myurltopdf("http://mind2minds.com", {fileName:"...../filename.pdf"}, function(err){
  if(err){
    console.log(err);
  }else{
    console.log("file created successfully");
  }
});
```

Options
-----------------------
Options is json object contains following key values

-fileName - pdf file path - required

-tmpFolderPath - optional. default path is tmp folder path of the installed module.
Where tmp files created for the pdf generation process and removed after pdf generation process completed.

-viewportSize - optional
default viewPortSize is
```shell
viewPortSize = { width: 1024, height : 768 }
```
-paperSize - optional
default paperSize is
```shell
paperSize={
  format: 'A4',
  orientation: 'portrait',
  border: '0.5cm'
}
```

Advanced Options
-----------------------

```shell
viewportSize = {
  width : in px
  height :  in px
}
```

```shell
pageSize = {
  format: "A4" - Supported formats are: 'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'
  OR
  width : in px,
  height : in px,
  orientation: 'portrait', 'landscape',
  borders: in px,
  OR as object for indvidual sides e.g.
    borders: {
      top: in px,
      right: in px,
      bottom: in px,
      left: in px
    },
  header: {
    height: "1cm",
    contents: phantom.callback(function(pageNum, numPages) {
      return "<h1>Header <span style='float:right'>" + pageNum + " / " + numPages + "</span></h1>";
    })
  },
  footer: {
    height: "1cm",
    contents: phantom.callback(function(pageNum, numPages) {
      return "<h1>Footer <span style='float:right'>" + pageNum + " / " + numPages + "</span></h1>";
    })
  }
}
```
