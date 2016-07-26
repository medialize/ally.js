
const Github = require('github');

const data = {
  user: 'medialize',
  repo: 'ally.js',
  token: process.env.GITHUB_STATUS_ACCESS_TOKEN,
  sha: process.env.TRAVIS_COMMIT,
  build: process.env.TRAVIS_BUILD_NUMBER,
};

const github = new Github({
  version: '3.0.0',
  protocol: 'https',
  timeout: 5000,
  headers: {
    'user-agent': 'ally.js build tool',
  },
});

github.authenticate({
  type: 'oauth',
  token: data.token,
}, function(err) {
  if (err) {
    throw err;
  }
});

function setStatus(options, done) {
  options.user = data.user;
  options.repo = data.repo;
  options.sha = data.sha;
  /*eslint-disable camelcase */
  options.target_url = options.url;
  /*eslint-enable camelcase */
  github.statuses.create(options, function(err) {
    if (err) {
      throw err;
    }

    done && done();
  });
}

setStatus({
  state: 'success',
  context: 'coverage/istanbul',
  description: 'at build ' + data.build,
  url: 'https://s3.eu-central-1.amazonaws.com/ally.js/travis/' + data.build + '/reports/coverage/index.html',
});

setStatus({
  state: 'success',
  context: 'website-preview',
  description: 'at build ' + data.build,
  url: 'https://s3.eu-central-1.amazonaws.com/ally.js/travis/' + data.build + '/web/index.html',
});

setStatus({
  state: 'success',
  context: 'bundle-size',
  description: 'at build ' + data.build,
  url: 'https://s3.eu-central-1.amazonaws.com/ally.js/travis/' + data.build + '/reports/bundle-size.html',
});
