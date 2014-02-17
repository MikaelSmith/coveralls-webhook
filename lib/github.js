var Github = require('github');

var client = new Github({
  version: "3.0.0",
  debug: true,
  protocol: "https",
  host: "api.github.com",
  timeout: 10000
});

client.authenticate({
  type: 'oauth',
  token: process.env.GITHUB_OAUTH_TOKEN
});

module.exports = {
  getPullRequests: function (user, repo) {
    return function (fn) {
      client.pullRequests.getAll(
        {
          user: user,
          repo: repo
        }, function (err, res) {
          if (err) return fn(err);
          fn(null, res);
        }
      );
    };
  },

  createIssuesComment: function (user, repo, number, body) {
    return function (fn) {
      client.issues.createComment({
        user: user,
        repo: repo,
        number: number,
        body: body
      }, fn);
    };
  }
}
