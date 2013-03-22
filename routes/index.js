
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {
  	title: 'How much carbon is this?',
  	query: req.query["amount"]
  });
};