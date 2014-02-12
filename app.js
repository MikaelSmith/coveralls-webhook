var env    = require('node-env-file');
var route  = require('koa-route');
var koa    = require('koa');
var qs     = require('querystring');
var parse  = require('co-body');
var github = require('github');
var app    = module.exports = koa();

env(__dirname + '/.env');

var client = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    debug: true,
    protocol: "https",
    host: "github.com",
    pathPrefix: "/api/v3", // for some GHEs
    timeout: 10000
});

client.authenticate(type: 'oauth', token: process.env.GITHUB_OAUTH_TOKEN);

var buildPostComment = function(body) {
  var message = " \
    <a href=\"" + body.url + "\"> \
    <img src=\"" + body.badge_url + "\" alt=\"Coverage Status\" data-canonical-src=\"" + body.url + "/badge\" style=\"max-width:100%;\"></a> \
    <br \><br \> \
  ";

  var coverageChange = parseInt(body.coverage_change, 10);

  if (coverageChange === 0) {
    message += "Coverage remained the same ";
  } else if (coverageChange > 0) {
    message += "Coverage has improved (" + coverageChange + "%) ";
  } else {
    message += "Coverage has declined (" + coverageChange + "%) ";
  }

  // // actually there is no base branch info, supposed as master :S
  message += "when pulling <strong>" + body.commit_sha + " on " + body.branch + "</strong> into on <strong>master</strong>.</p> \ ";
  return message;
}

var post = function *(next) {
  var body = yield parse(this, { limit: '1kb' });
  yield next;
  this.body = 'done';
}

app.use(function *() {
  client.issues.createComment({
    user: user // no user
    repo: repo // no repo
    number: pr.number // no pr.number
    body: buildPostComment(body)
  });
});

app.use(route.post('/' + process.env.WEBHOOK_PATH, post));
if (!module.parent) app.listen(3000);
