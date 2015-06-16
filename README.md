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
myurlpdf.myhtmltopdf("<strong>Hi Sam,</strong><br/><div> Simple tool to generate raw HTML to pdf using myurltopdf.</div><div style='font-size:12px;color:#DDD'>Created By Dilhad Khan<br/><a href='http://mind2minds.com'>http://mind2minds.com</a></div>", {fileName:"....../filename.pdf"}, function(err){
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

Methods
-----------------------
myurltopdf(url, options, callback)

myhtmltopdf(html, options, callback)

Params
-----------------------
url -  - required

html - required

options - {
  fileName - pdf file path - required
  tmpFolderPath - optional. default path is tmp directory of the installed module. where tmp files created for the pdf generation process and removed after pdf generation process completed
  viewportSize - optional. default viewPortSize is { width: 1024, height : 768 }
  paperSize - optional. default paperSize is {format: 'A4', orientation: 'portrait', border: '0.5cm'}


}
callback - required

Misc Options
-----------------------

1.viewportSize - {
  width : in px
  height :  in px
}
2.pageSize - {
  -----------
  format - "A4",
  or
  width -
  height -
  ----------
  borders: number in px
  or as object e.g. {top:, right, bottom, left}
  -------
  headers - object {

  }
  ----------

  footers - object {

  }


}

