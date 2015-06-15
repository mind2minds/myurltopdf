(function() {
  var path = require('path');
  var tempfs = require('temp');
  var fs = require('fs');
  var child_process = require('child_process');
  var phantomjs = require('phantomjs');
  var binPath = phantomjs.path || 'phantomjs';
  var debug = true;
  var log = function(){
    if(debug){
      console.log.apply(this, arguments);
    }
  }
  var genPDF = function(address, options, cb){
    var fileName = options.fileName;
    var tmpPath = options.tmpFolderPath || path.join(__dirname, 'tmp');
    return jsFile = tempfs.open({
      dir: tmpPath,
      suffix: '.js'
    }, function(err, info) {
      var js;
      if (err) {
        throw err;
      }
      js = "var page = require('webpage').create();\npage.viewportSize = " + JSON.stringify(options.viewportSize || { width: 1024, height : 768 }) + ";\npage.paperSize = " + JSON.stringify(options.paperSize || {format: 'A4', orientation: 'portrait', border: '0.5cm'}) + ";\nvar address = '" + address + "';\npage.open(address, function (status) {\n    if (status !== 'success') {\n        console.log('Unable to load the address!');\n        phantom.exit();\n    } else {\n        window.setTimeout(function () {\n            page.render('" + fileName + "');\n            phantom.exit();\n        }, 200);\n    }\n});";
      log(js);
      fs.write(info.fd, js);
      return fs.close(info.fd, function(err) {
        var ps;
        if (err) {
          throw err;
        }
        log(binPath, ' ', info.path);
        ps = child_process.execFile(binPath, [info.path], function(err, stdo, stde) {
          log(stde, stdo);
          if (cb) {
            fs.unlink(info.path, function(err){
              console.log(err, "removing file js");
            });
            if(options.htmlContent){
              fs.unlink(address, function(err){
                console.log(err, "removing file html");
              });
            }
            return cb(err);
          }
        });
        ps.stdout.on('data', function(std) {
          return log('stdout:', std);
        });
        ps.stderr.on('data', function(std) {
          return log('stderr:', std);
        });
        return ps.on('exit', function(c, d) {
          return log('exited with code: ', c);
        });
      });
    });
  };
  var doConvert =  function(html, options, cb) {
    var htmlFile, tmpPath;
    tmpPath = options.tmpFolderPath || path.join(__dirname, 'tmp');
    log("tmpPath", tmpPath, "binPath", binPath);
    return htmlFile = tempfs.open({
      dir: tmpPath,
      suffix: '.html'
    }, function(err, htmlInfo) {
      if (err) {
        throw err;
      }
      fs.write(htmlInfo.fd, html);
      return fs.close(htmlInfo.fd, function(err) {
        var jsFile;
        if (err) {
          throw err;
        }
        options.htmlContent = true;
        return genPDF(htmlInfo.path, options, cb);
      });
    });
  }

exports.myurltopdf = function(url, options, cb){
  genPDF(url, options, cb);
};
exports.myhtmltopdf = function(html, options, cb){
  doConvert(html, options, cb);
};


}).call(this);
