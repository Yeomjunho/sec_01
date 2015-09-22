//app.js
var fs = require('fs'),
	ejs = require('ejs'),
	Parser = require('body-parser'),
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

//reauest.body 사용하기위해서
app.use(Parser.json());
app.use(Parser.urlencoded({extended: true}));

app.use(router);
app.listen(3000,function(){
	console.log('--------- 127.0.0.1:3000 seve on');
});
app.get('/',function(request, response){
	console.log('//[ejs] list');
	fs.readFile('list.ejs', 'utf8', function(err, data){
		db.query('select * from products limit 10', function(err, results){
			if(err){
				console.log(' /// '+err);
				return false;
			}
			console.log(results.length);
			response.send(ejs.render(data, {
				data: results
			}));
		});
	});	
});
app.get('/delete/:id',function(request, response){
	console.log('//[js] delete/'+request.param('id'));
	db.query('delete from products where id=?', [request.param('id')], function(){
		response.redirect('/');
	});
});
app.get('/insert',function(request, response){
	console.log('//[ejs] insert');
	fs.readFile('insert.ejs', 'utf8', function(err, data){
		response.send(data);
	});
});
app.post('/insert',function(request, response){
	var body = request.body,
		body_data = [body.name, body.age, body.phone, body.adrs, body.sex];

	body_data.forEach(function(item) {
		console.log(item);
	})

	console.log('//[js] insert');

	console.log(body.name, body.age, body.phone, body.adrs, body.sex);
	db.query('insert into products (name, age, phone, adrs, sex) values (?,?,?,?,?)', [body.name, body.age, body.phone, body.adrs, body.sex], function(){
		response.redirect('/');
	});
});
app.get('/edit/:id',function(request, response){
	console.log('//[ejs] edit');
	fs.readFile('edit.ejs', 'utf8', function(err, data){
		db.query('select * from products where id=?', [request.param('id')], function(err, result){
			response.send(ejs.render(data,{
				data: result[0]
			}));
		});
	});
});
app.post('/edit/:id',function(request, response){
	var body = request.body;
	console.log('//[js] edit');
	console.log(body.name, body.age, body.phone, body.adrs, body.sex, request.param('id'));
	db.query('update products set name=?, age=?, phone=?, adrs=?, sex=? where id=?', [body.name, body.age, body.phone, body.adrs, body.sex, request.param('id')], function(){
		response.redirect('/');
	});
});