//app.js
var fs = require('fs'),
	ejs = require('ejs'),
	mysql = require('mysql'),
	db = mysql.createConnection({
		host:'localhost',
		user:'root',
		password:'2176618aA',
		database:'Company'
	}),
	express = require('express'),
	router = express.Router(),
	app = express();

app.use(router);
app.listen(3000,function(){
	console.log('--------- seve on');
});
app.get('/',function(request, response){
	console.log('//list.ejs');
	fs.readFile('list.ejs', 'utf8', function(err, data){
		db.query('select * from products', function(err, results){
			if(err){
				console.log(' /// '+err);
				return false;
			}
			response.send(ejs.render(data, {
				data: results
			}));
		});
	});	
});
app.get('/delete/:id',function(request, response){

});
app.get('/insert',function(request, response){

});
app.post('insert',function(request, response){

});
app.get('/edit/:id',function(request, response){

});
app.post('/edit/:id',function(request, response){

});