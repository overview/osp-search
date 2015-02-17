

exports.metadata = function(req, res) {
  res.status(204).send();
};


exports.show = function(req, res) {
  res.render('overview/show');
};
