var path = require('path')
  , gutil = require('gulp-util')
  , through = require('through2')
  , crypto = require('crypto');

module.exports = function(options) {
  var size;

  if (typeof options === 'object') {
    size = options.size | 0;
  } else {
    size = options | 0;
  }

  return through.obj(function(file, enc, cb) {
    calcMd5(file, size).then((md5Hash) => {
      var filename = path.basename(file.path);
      gutil.log(filename + ' ' + md5Hash);
      return cb(null, file);
    }).catch((err) => {
      console.error('[gulp-md5] err', err);
      this.emit('error', new gutil.PluginError('gulp-md5', err));
      return cb(err);
    });
  });
};

function calcMd5(file, slice) {
  return new Promise((resolve, reject) => {
    var md5 = crypto.createHash('md5');

    if (file.isStream) {
      file.contents.on('error', err => reject(err));
      file.contents.on('data', chunk => md5.update(chunk, 'utf8'));
      file.contents.on('end', () => {
        resolve(slice > 0 ? md5.digest('hex').slice(0, slice) : md5.digest('hex'));
      });
    } else {
      md5.update(file.contents, 'utf8');
      resolve(slice > 0 ? md5.digest('hex').slice(0, slice) : md5.digest('hex'));
    }
  });
}
