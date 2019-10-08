var path = require('path')
  , gutil = require('gulp-util')
  , through = require('through2')
  , crypto = require('crypto');

module.exports = function(options) {
  var separator, size, printOnly;

  if (typeof options === 'object') {
    size = options.size | 0;
  } else {
    size = options | 0;
  }

  return through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-debug', 'Streaming not supported'));
      return cb();
    }

    var md5Hash = calcMd5(file, size),
      filename = path.basename(file.path),
      dir;

    gutil.log(filename + ' ' + md5Hash);
    return cb(null, file)

  });
};

function calcMd5(file, slice) {
  var md5 = crypto.createHash('md5');
  md5.update(file.contents, 'utf8');

  return slice > 0 ? md5.digest('hex').slice(0, slice) : md5.digest('hex');
}
