
module.exports = function(context) {
  /*eslint-disable no-console */
  // context.name - helper name
  // context.hash - arguments map
  // context.data - data map
  try {
    const data = JSON.parse(JSON.stringify(context.data));
    delete data.root.pkg;
    delete data.root.contents;
    delete data.root.stats;
    delete data.root.knownHelpers;
    delete data.root.blockParams;
    delete data.root.mode;
    delete data.root.partials;
    console.log('current data');
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.log('dumping everything because of circular references');
    console.log(context.data.root);
  }
  /*eslint-enable no-console */
};
