

/**
 * Render the application.
 */
exports.index = function(req, res) {
  res.render('overview/show', {
    title: 'Harvard Open Metadata'
  });
};
