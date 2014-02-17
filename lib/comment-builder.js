var util = require('util');

module.exports = {
  build: function(params) {
    var message = util.format("<a href=\"%s\"><img src=\"%s\" alt=\"Coverage Status\" data-canonical-src=\"%s/badge\" style=\"max-width:100%;\"></a><br \><br \>", params.url, params.badge_url, params.url);
    var coverageChange = parseInt(params.coverage_change, 10);

    if (coverageChange === 0) {
      message += "Coverage remained the same ";
    } else if (coverageChange > 0) {
      message += util.format("Coverage has improved (%s%) ", coverageChange);
    } else {
      message += util.format("Coverage has declined (%s%) ", coverageChange);
    }

    // actually there is no base branch info, supposed as master :S
    message += util.format("when pulling <strong>%s on %s</strong> into on <strong>master</strong>.", params.commit_sha, params.branch);
    return message;
  }
}
