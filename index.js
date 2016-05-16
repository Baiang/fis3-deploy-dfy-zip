
var yazl = require('yazl');
var concatStream = require('concat-stream');

module.exports = function(options, modified, total, callback) {
  var list = options.modified ? modified : total;
  if (!list.length) {
    return false;
  }

  var root = fis.project.getProjectPath();
  var zipfile = new yazl.ZipFile();

  list.forEach(function(file) {
    var filepath = file.getHashRelease().substring(1);

    zipfile.addBuffer(file.getContent(), filepath, {
      compress: true,
      mtime: file.getMtime(),
      mode: null
    });
  });

  zipfile.end(function() {
    zipfile
      .outputStream
      .pipe(concatStream(function(data) {
        var file = fis.file(root, options.filename || 'all.zip');
        file.setContent(data);

        if (!options.keep) {
          modified.splice(0, modified.length);
          total.splice(0, total.length);
        }

        modified.push(file);
        total.push(file);
        callback();
      }))
  });
};

module.exports.options = {
  // 是否保留原始文件。
  keep: false,

  // 是否只打包修改过的。
  modified: false,

  // zip 文件名
  filename: 'dfy-all.zip'
};
