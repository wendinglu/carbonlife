
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {
  	title: 'What does my carbon footprint mean?',
  	query: req.query["amount"]
  });
};