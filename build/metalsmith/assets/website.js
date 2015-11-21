/*eslint-disable no-var */
(function() {
  'use strict';

  function addBodyToIssueLink() {
    var editLink = document.getElementById('document-github-edit');
    var issueLink = document.getElementById('document-github-issue');

    var body = [
      '*Concerning*: [' + issueLink.getAttribute('data-title') + '](' + editLink.href + ')',
      '*User Agent:* ' + navigator.userAgent,
      '*ally.js version*: [insert]',
      '',
      '---',
      '',
      '## Steps to reproduce the problem',
      '',
      '1. ',
      '2. ',
      '3. ',
      '',
      '## What is the expected behavior?',
      '',
      '',
      '',
      '## What went wrong?',
      '',
      '',
      '',
      '## Comments',
      '',
      '',
      '---',
      '',
      'Please remove sections that do not apply to the nature of your issue.',
    ].join('\n');

    issueLink.href += '&body=' + encodeURIComponent(body);
  }

  addBodyToIssueLink();
})();
