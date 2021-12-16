const glob = require('glob');
const path = require('path');


/**
 * The PathInfo object is an enhanced version of the results that a call to path.parse()
 * would normally return.
 * @typedef  {Object} PathInfo
 * @property {string} PathInfo.dir           - The relative directory that the file was found in.
 * @property {string} PathInfo.fullPath      - The full path to the file.
 * @property {string} PathInfo.relativePath  - The relative path to the file, based on cwd.
 */

/**
 * Resolves globs and returns file metadata. In other words, assuming the file structure below:
 *
 * files:
 *      ./test/some-dir/a.js
 *      ./test/some-dir/b.js
 *
 * It turns this:
 *
 *      globs:      ['/some-dir/*.js']
 *      options:    {cwd: './test'}
 *
 * Into this:
 *
 *      [
 *          {
 *              ...path.parse(relativePath)
 *              relativePath:'/some-dir/a.js',
 *              fullPath: '/path/to/test/some-dir/a.js'
 *          },
 *          {
 *              ...path.parse(relativePath)
 *              relativePath: '/some-dir/b.js',
 *              fullPath: '/path/to/test/some-dir/b.js'
 *          }
 *      ]
 *
 * @param {(string|Array)}  globs   - An individual glob or an array of globs.
 * @param {Object} options          - Override options in the glob library.
 * @param {string} options.cwd      - Current working directory. Defaults to process.cwd().
 * @param {string} options.ignore   - Glob(s) to ignore.
 * @returns {PathInfo[]}            - An Array of PathInfo objects.
  */
function convertGlobsToPaths(globs, options) {
    const opts = options || {};
    opts.cwd = opts.cwd || process.cwd();
    opts.nodir = true;
    opts.strict = true;

    return (Array.isArray(globs) ? globs : [globs])
        // Resolve the globs and collect all the results into an array of relative file paths
        .flatMap(globPattern => glob.sync(globPattern, opts))
        // Take the relative paths and add some extra information about the files
        .map(relativePath => ({
            ...path.parse(relativePath),
            relativePath,
            fullPath: opts.cwd.replace(/\/?$/, '/') + relativePath
        }));
}

module.exports = convertGlobsToPaths;
