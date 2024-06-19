// helpers/helpers.js
const helpers = {
  filterWatchesByBrand: (watches, selectedBrandId) => {
    if (!selectedBrandId) {
      return watches;
    }
    return watches.filter(
      (watch) => watch.brand._id.toString() === selectedBrandId.toString()
    );
  },
  searchWatchesByName: (watches, searchQuery) => {
    if (!searchQuery) {
      return watches;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return watches.filter((watch) =>
      watch.name.toLowerCase().includes(lowerCaseQuery)
    );
  },

  sum: (a, b) => a + b,
};

module.exports = helpers;
