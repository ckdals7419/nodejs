const express = require('express')
const app = express()
const fs = require('fs')

app.get('/', (req, res) => res.send('Hello World!'))

var seq = 0
app.get('/log', function(req, res) {
	fs.appendFile('log.csv', JSON.stringify(req.query)+"\n", function (err) {
		if (err) throw err
		console.log("%j", req.query)
		res.end("Got "+ String(seq++) +" "+ JSON.stringify(req.query))
	});
})
app.get('/get', function(req,res) {
	fs.readFile('log.csv', 'utf8', function(err, data) {
		res.send(data)
	});
})
app.get('/download',function(req,res) {
	fs.readFile('log.csv', 'utf8', function(err, data) {
		var array = data.split("\n");
		var length = array.length;
		var count = parseInt(JSON.parse(JSON.stringify(req.query)).count);
		var ans ="";
		console.log("test : "+length);
		console.log("data : "+data);

		for(var i=0; i<length-1; i++) {
			var value = JSON.parse(array[i]);
		        ans += value.seq+","+ value.device+"," + value.unit+","+ value.type+","+ value.value+"," + "\n";
			
		}
	
		fs.writeFile('data.txt',ans,"utf8",function(err){
		console.log("write success.");
		});
		fs.readFile('data.txt', 'utf8', function(err, data) {
			var filename = __dirname + '/data.txt'	
			res.download(filename);
		});
	});
})

app.listen(2999, () => console.log('Example app listening on port 2999!'))

