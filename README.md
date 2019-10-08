# gulp-md5

> md5 plugin for [gulp](https://github.com/wearefractal/gulp).

## Usage

To your `gulpfile.js`:

```javascript
var md5 = require("gulp-md5");

gulp.src("./src/*.ext")
	.pipe(md5({
		msg: "Hello Gulp!"
	}))
	.pipe(gulp.dest("./dist"));
```

## API

### md5(size)

#### size
Type: `String`  
Default: null

Optionnal: you can pass the size to limit the size of the hash that is appended.

Example:
```javascript
	gulp.src('**/*', {
        cwd: './src'
    })
        .pipe(md5())
        .pipe(gulp.dest('./whatever'));
```

```shell
<filename> a7ded4c00cdc9cdc47e55f6b85e3f909
```

If you pass the size argument, the hash will be truncated to that value. For instance md5(10) will produce:

```shell
<filename> a7ded4c00c
```

## License

http://en.wikipedia.org/wiki/MIT_License[MIT License]

