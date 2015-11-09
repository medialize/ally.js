// collection-to-siblings
module.exports = function(context) {
  const _collections = context.data.root.collection;
  const collections = _collections.map(function(collectionName) {
    return context.data.root[collectionName];
  });

  context.data.root.siblings = collections[0] || [];
};
