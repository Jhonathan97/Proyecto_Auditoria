const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const PORT = process.env.PORT || 8000;
const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.get('/', (req, res) =>{
	res.status(200).json({
		message: "Testing our Server"
	})
})

app.listen(PORT, console.log(`Server is started at:" ${PORT}`));
