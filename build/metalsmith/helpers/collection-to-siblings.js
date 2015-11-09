// collection-to-siblings
module.exports = function(context) {
  var _collections = context.data.root.collection;
  var collections = _collections.map(function(collectionName) {
    return context.data.root[collectionName];
  });

  context.data.root.siblings = collections[0] || [];
};
