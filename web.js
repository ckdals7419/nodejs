const express = require('express')
const app = express()
const fs = require('fs')

app.get('/', (req, res) => res.send('Hello World!'))

var seq = 0
app.get('/log', function(req, res) {
	fs.appendFile('log.txt', JSON.stringify(req.query)+"\n", function (err) {
		if (err) throw err
		console.log("%j", req.query)
		res.end("Got "+ String(seq++) +" "+ JSON.stringify(req.query))
	});
})
app.get('/get', function(req,res) {
	fs.readFile('log.txt', 'utf8', function(err, data) {
		res.send(data)
	});
})

app.listen(2999, () => console.log('Example app listening on port 2999!'))

