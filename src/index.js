const express = require('express');
const app = express();
const port = 3000;
var users = [];
var user = "";
var email = "";
var id = 0;
// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

app.post('/users', (req, res) => {
	user = req.body.name;
	email = req.body.email;
	users[id] = [id, user, email];
	res.status(201);
	res.send({"id": id, "name": user, "email": email});
	while(typeof users[id] !== 'undefined') {
		id = id + 1;
	}
});

app.get('/users/:ID', (req, res) => {
	if(typeof users[req.params.ID] === 'undefined') {
		res.status(404);
		res.send({"error": "user not found"});
	}
	else {
		res.status(200);
		res.send({"id":parseInt(req.params.ID), "name": users[req.params.ID][1], "email": users[req.params.ID][2]});
	}
});

app.put('/users/:ID', (req, res) => {
	if(typeof users[req.params.ID] === 'undefined') {
		res.status(404);
		res.send({"error": "user not found"});
	}
	else {
		res.status(200);
		users[req.params.ID][1] = req.body.name;
		users[req.params.ID][2] = req.body.email;
		res.send({"id": req.params.ID, "name": users[req.params.ID][1], "email": users[req.params.ID][2]});
	}
});

app.delete('/users/:ID', (req, res) => {
	if(typeof users[req.params.ID] === 'undefined') {
		res.status(404);
		res.send({"error": "user not found"});
	}
	else {
		res.status(204);
		id = req.params.ID;
		users.splice(req.params.ID, 1);
		res.send();
	}

});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing
