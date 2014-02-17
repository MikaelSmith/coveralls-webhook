var env            = require('node-env-file');
var koa            = require('koa');
var route          = require('koa-route');
var parse          = require('co-body');
var logger         = require('koa-logger');
var github         = require('./lib/github');
var commentBuilder = require('./lib/comment-builder');

var app = module.exports = koa();
app.use(logger());

var env  = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;

var post = function *(next) {
  var params = yield parse(this, { limit: '1kb' });
  var branchName = params.branch.split('/')[1]; // 'origin/foo' -> 'foo'
  var comment = commentBuilder.build(params);
  var slug = params.repo_name.split('/')
  var user = slug[0];
  var repo = slug[1];

  var prs = yield github.getPullRequests(user, repo);

  var matchedPrs = prs.filter(function(pr) {
    return pr.head.ref.indexOf(branchName) > -1;
  });

  var number = (matchedPrs.length === 1) ? matchedPrs[0].number : null;

  yield github.createIssuesComment(user, repo, number, comment);

  this.body = 'done';
}

app.use(route.get('/ping', function *() {
  this.body = { pong: true };
}));

app.use(route.post('/' + process.env.WEBHOOK_PATH, post));

if (!module.parent) {
  app.listen(port, function () {
    console.log('app running on %d', port);
  });
}
