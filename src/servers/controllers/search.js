var express = require('express'),
    settings = require('../settings/settings.json'),
    SearchService = require('../services/search-service')

var router = express.Router();

router.get('/search', function(req, res){
    var query = req.query.q;
    var start = req.query.start || 1;

    var searchService = new SearchService({cx:settings.googleCx, key: settings.googleApiKey });
    searchService.search({q: query, start: start},function(error, response, body){
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(response.body);
            res.json(
                {
                    queries: result.queries,
                    items:  result.items
                })
        }
    } );
});

module.exports = router;