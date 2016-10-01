
const path = require('path');
const algoliasearch = require('algoliasearch');

const client = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_ADMIN_KEY);

function publish(indexName, fileName) {
  const index = client.initIndex(indexName);

  const file = path.resolve(process.cwd(), fileName);
  const documents = require(file);

  index.saveObjects(documents, function(err/*, content*/) {
    if (err) {
      /*eslint-disable no-console */
      console.error(err);
      /*eslint-enable no-console */
      /*eslint-disable no-process-exit */
      process.exit(1);
      /*eslint-enable no-process-exit */
    }
  });
}

publish('ally.api', 'web/algolia.api.json');
publish('ally.tutorial', 'web/algolia.tutorial.json');
publish('ally.documentation', 'web/algolia.documentation.json');
