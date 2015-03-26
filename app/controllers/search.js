

/**
 * Render the application.
 */
exports.index = function(req, res) {
  res.render('search/index', {
    title: 'Harvard Open Metadata'
  });
};
