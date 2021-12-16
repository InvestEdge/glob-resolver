# Glob Resolver

This module resolves globs and returns some specific file metadata.

## Example

Assuming the file structure below:

```
./test/some-dir/a.js
./test/some-dir/b.js
```
 
It turns this:
 
```javascript
const filePaths = globResolver(
    [ '/some-dir/*.js' ],
    { cwd: './test' }
)
 ```

  Into this:
 
 ```javascript
// filePaths: 
[
    {
        //...path.parse(relativePath)
        root: '/',
        dir: 'some-dir',
        base: 'a.js',
        ext: '.js',
        name: 'a',
        relativePath:'/some-dir/a.js',
        fullPath: '/path/to/test/some-dir/a.js'
    },
    {
        //...path.parse(relativePath)
        root: '/',
        dir: 'some-dir',
        base: 'b.js',
        ext: '.js',
        name: 'b',
        relativePath: '/some-dir/b.js',
        fullPath: '/path/to/test/some-dir/b.js'
    }
]
```

# API

## **globResolver(glob|globs[] [, options])**

`glob`

The module loader accepts a single string or an array containing globs. It also exposes all options accepted by the [`glob`](https://www.npmjs.com/package/glob) package, with the following exceptions which are always overridden.


`options`

Glob Resolver exposes all options accepted by the [`glob`](https://www.npmjs.com/package/glob) package, with the following exceptions which are always overridden.

```
nodir: true,
strict: true,
cwd: options.cwd || process.cwd()
```

## Examples:

```javascript
// Find files based on multiple patterns
const { globResolver } = require('glob-resolver');

const files = globResolver(
    [
        '**/*routes*.js',
        '**/*modules*.js'
    ],
    { cwd: `${process.cwd()}/myapp/` }
);
```

```javascript
// Ignore certain files - uses a pass-through option of the glob module
const { globResolver } = require('glob-resolver');

const files = globResolver(
    '**/*.js',
    {
        cwd: `${process.cwd()}/myapp/`,
        ignore: '**/*modules*.js'
    }
);
```
