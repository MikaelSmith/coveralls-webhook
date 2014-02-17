var commentBuilder = require('../lib/comment-builder');
var expect         = require('chai').expect;

var params = {
  url: 'https://coveralls.io/builds/foo',
  badge_url: 'https://s3.amazonaws.com/assets.coveralls.io/badges/coveralls_93.png',
  branch: 'origin/foo',
  commit_sha: '7df3846ecf39e9c6409cb748b15e1df4a781f73b'
}

describe('commentBuilder', function () {
  describe('.build', function () {
    context('when coverage_change > 0', function () {
      it('should put new item', function () {
        params['coverage_change'] = 1;
        expect(commentBuilder.build(params)).to.eq('<a href="https://coveralls.io/builds/foo"><img src="https://s3.amazonaws.com/assets.coveralls.io/badges/coveralls_93.png" alt="Coverage Status" data-canonical-src="https://coveralls.io/builds/foo/badge" style="max-width:100%;"></a><br ><br >Coverage has improved (1%) when pulling <strong>7df3846ecf39e9c6409cb748b15e1df4a781f73b on origin/foo</strong> into on <strong>master</strong>.');
      });
    });

    context('when coverage_change is 0', function () {
      it('should put new item', function () {
        params['coverage_change'] = 0;
        expect(commentBuilder.build(params)).to.eq('<a href="https://coveralls.io/builds/foo"><img src="https://s3.amazonaws.com/assets.coveralls.io/badges/coveralls_93.png" alt="Coverage Status" data-canonical-src="https://coveralls.io/builds/foo/badge" style="max-width:100%;"></a><br ><br >Coverage remained the same when pulling <strong>7df3846ecf39e9c6409cb748b15e1df4a781f73b on origin/foo</strong> into on <strong>master</strong>.');
      });
    });

    context('when coverage_change < 0', function () {
      it('should put new item', function () {
        params['coverage_change'] = -1;
        expect(commentBuilder.build(params)).to.eq('<a href="https://coveralls.io/builds/foo"><img src="https://s3.amazonaws.com/assets.coveralls.io/badges/coveralls_93.png" alt="Coverage Status" data-canonical-src="https://coveralls.io/builds/foo/badge" style="max-width:100%;"></a><br ><br >Coverage has declined (-1%) when pulling <strong>7df3846ecf39e9c6409cb748b15e1df4a781f73b on origin/foo</strong> into on <strong>master</strong>.');
      });
    });
  });
});
