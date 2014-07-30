var express = require('express'),  Db= require('mongodb').Db,
	Server = require('mongodb').Server,
	client = new Db('test', new Server('127.0.0.1', 27017, {})),
	app = express(),
	fs = require('fs'),// we need the fs module for moving the uploaded files
	firstname,
	lastname,
	upfile,
	college,
	percentage,
	counter,
	port=8080,
	outputresults = [];
	app.listen(port);
	
/**

Method Started For Application
 
**/
app.get('/', function(req, res)
{
	fs.readFile('sil.html',function (err, data)
	{
		res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
		res.write(data);
		res.end();
	});    	
});


app.post('/somepath', function(req, res) 
{
	firstname=req.body['firstname'];
	lastname=req.body['lastname'];
	percentage=req.body['percentage'];
	college=req.body['college'];
	sex=req.body['sex'];	

	var insertData = function(err, collection) 
	{
		collection.insert({'firstname':firstname,'secondname':lastname,'percentage':percentage,'college':college});
		// you can add as many object as you want into the database
	}
	var listAllData = function(err, collection) 
	{
		collection.count(function(err, count)
		{
			counter = count;
		});	
		collection.find().toArray(function(err, results) 
		{         
			outputresults=results;
			console.log(results);
		});
	}
	client.open(function(err, pClient) 
	{
		client.collection('test_insert', listAllData);				
	});
	res.writeHead(200, {'Content-Type': 'text/plain'});  
	res.end();		
});

app.get('/retrive', function(req, res)
{
	var listAllData = function(err, collection) 
	{
		collection.count(function(err, count)
		{
			counter = count;
		});	
		collection.find().toArray(function(err, results) 
		{         
			outputresults=results;                                                                
			console.log(results);			
		});
	}
	client.open(function(err, pClient) 
	{	
		client.collection('test_insert', listAllData);				
	});
	res.writeHead(200, {'Content-Type': 'json', 'Access-Control-Allow-Orgin':'*'});
	res.write(JSON.stringify(outputresults));
	res.end();		
});
console.log('Express server started on port 8080');