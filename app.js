const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
app.set('trust proxy', true);

const fs = require('fs');
const url = require('url');

app.get(/^(?!\/api\/)/, (req, res) => {
	var turl = url.parse(req.url, true);
	var path = 'current' + turl.pathname;

	if(path[path.length - 1] == '/')
		path += 'index';

	res.render(path, turl.query);
});

app.get('/api/', (req, res) => {

});

app.get('*', (req, res) => {
	// 404 error
	res.render('/404/index');
});

// 404 handling

app.listen(80, function() {
	console.log('Starting local server');
});
