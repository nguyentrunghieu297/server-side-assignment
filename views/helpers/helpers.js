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
};

module.exports = helpers;
