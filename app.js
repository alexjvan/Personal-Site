const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const fs = require('fs');
const nodemailer = require('nodemailer');
const url = require('url');

var gmailU = "";
var gmailP = "";
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
app.set('trust proxy', true);


// FUTURE PATH HANDLING
app.get(/api/, function(req, res)  {
	console.log('API TIME');
});

app.post('/sendmail/', function(req, res) {
	var obj = JSON.parse(fs.readFileSync('config.json', 'utf8'));
	let mailOpts, smtpTrans;
		smtpTrans = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: obj.user,
			pass: obj.pass
		}
	});
	mailOpts = {
		from: req.body.name + ' &lt;' + req.body.email + '&gt;',
		to: obj.user,
		subject: 'New message from contact form at alexvanmatre.com',
		text: `${req.body.name}\n${req.body.subject}\n(${req.body.email})\nsays:\n${req.body.message}`
	};
	smtpTrans.sendMail(mailOpts, function (error, response) {
		if(error)
			res.redirect('/dev/contact/index.ejs?error=true&errormessage='+error+'&name='+req.body.name+'&subject='+req.body.subject+'&email='+req.body.email+'&message='+req.body.message);
		else
			res.redirect('/dev/contact/index.ejs?error=false');
	});
});

app.get(/dev/, function(req, res) {
	var turl = url.parse(req.url, true);
	var path = turl.pathname;
	path = path.substring(1);

	if(path[path.length - 1] == '/')
		path += 'index';

	res.render(path, turl.query);
});

app.get('*', function(req, res)  {
	var turl = url.parse(req.url, true);
	var path = 'current' + turl.pathname;

	if(path[path.length - 1] == '/')
		path += 'index';

	res.render(path, turl.query);
});

// 404 handling

app.listen(80, function() {
	console.log('Starting local server');
});
