const { expect } = require('chai');
const convertGlobsToPaths = require('../lib/glob-resolver');

describe('globResolver', () => {
    it('can use default options', async () => {
        const paths = convertGlobsToPaths(
            'example/**/*tenant.json'
        );

        expect(paths).to.have.length(9);
    });

    it('can convert an individual glob to file paths', async () => {
        const paths = convertGlobsToPaths(
            '**/*tenant.json',
            {
                cwd: `${process.cwd()}/example/`
            }
        );

        expect(paths).to.have.length(9);
    });

    it('has the expected properties', async () => {
        const paths = convertGlobsToPaths(
            '**/*tenant.json',
            {
                cwd: `${process.cwd()}/example/`,
                ignore: 'tenants/**'
            }
        );

        expect(paths[0]).to.have.property('name');
        expect(paths[0]).to.have.property('relativePath');
        expect(paths[0]).to.have.property('fullPath');
    });

    it('can ignore paths', async () => {
        const paths = convertGlobsToPaths(
            '**/*tenant.json',
            {
                cwd: `${process.cwd()}/example/`,
                ignore: 'tenants/**'
            }
        );

        expect(paths).to.have.length(2);
    });

    it('can convert an array of globs to file paths', async () => {
        const paths = convertGlobsToPaths(
            [
                'tenants/*tenant.json',
                'tenants2/*tenant.json',
            ],
            {
                cwd: `${process.cwd()}/example/`
            }
        );

        expect(paths).to.have.length(9);
    });
});
