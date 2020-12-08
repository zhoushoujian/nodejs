const express = require('express')
const app = express()
const port = 3000


app.use((req, res, next) => {
	next();
	res.send("middle1");
});

app.use((req, res, next) => {
	next();
	res.send("middle2");
});

app.use((req, res, next) => {
	next();
	res.send("middle3");
});

app.use((req, res, next) => {
	res.send("middle4");
});



app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
