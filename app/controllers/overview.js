

/**
 * Overview /metadata.
 */
exports.metadata = function(req, res) {
  res.status(204).send();
};


/**
 * Overview /show.
 */
exports.show = function(req, res) {
  res.render('overview/show');
};


/**
 * Run a search query.
 */
exports.query = function(req, res) {
  // TODO
};
