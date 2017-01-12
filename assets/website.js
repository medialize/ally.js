/* eslint-disable no-var */
(function() {
  'use strict';

  function addBodyToIssueLink() {
    var editLink = document.getElementById('document-github-edit');
    var issueLink = document.getElementById('document-github-issue');

    if (!issueLink || !editLink) {
      return;
    }

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

/************************************************************
 * Algolia Search
 ************************************************************/
(function() {
  var client = window.algoliasearch('PLCNURI3P6', '572a18e64d6d618a62df82a0d28927b7');
  var index = {
    api: client.initIndex('ally.api'),
    tutorial: client.initIndex('ally.tutorial'),
    documentation: client.initIndex('ally.documentation'),
  };

  // https://github.com/algolia/autocomplete.js#options
  var options = {
    // hint: false,
    // debug: true,
    templates: {
      footer: '<div class="branding">Powered by <a href="https://www.algolia.com"><img src="https://www.algolia.com/assets/algolia128x40.png" alt="algolia"></a></div>',
    },
  };

  function formatSuggestion(suggestion) {
    var formatted = '<div><h3 class="title">'
      + suggestion._highlightResult.title.value
      + '</h3>';

    if (suggestion.excerpt) {
      formatted += '<p class="excerpt">'
        + suggestion._highlightResult.excerpt.value
        + '</p>';
    } else if (suggestion.document) {
      formatted += '<p class="excerpt">in '
        + '<em class="document">' + suggestion.document + '</em>'
        + '</p>';
    }

    return formatted + '</div>';
  }
  // https://github.com/algolia/autocomplete.js#datasets
  var sources = window.autocomplete.sources;
  var datasets = [
    {
      source: sources.hits(index.api, { hitsPerPage: 3 }),
      displayKey: 'title',
      templates: {
        suggestion: formatSuggestion,
        header: function() {
          return '<h2 class="index-block">API</h2>';
        },
      },
    },
    {
      source: sources.hits(index.tutorial, { hitsPerPage: 2 }),
      displayKey: 'title',
      templates: {
        suggestion: formatSuggestion,
        header: function() {
          return '<h2 class="index-block">Tutorials</h2>';
        },
      },
    },
    {
      source: sources.hits(index.documentation, { hitsPerPage: 2 }),
      displayKey: 'title',
      templates: {
        suggestion: formatSuggestion,
        header: function() {
          return '<h2 class="index-block">Documentation</h2>';
        },
      },
    },
  ];

  function handleSelected(event, suggestion /*, dataset */) {
    location.href = '/' + suggestion.url;
  }

  window.autocomplete('#search-input', options, datasets).on('autocomplete:selected', handleSelected);
})();
