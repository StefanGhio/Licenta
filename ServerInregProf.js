var express = require('express');
var db = require('./database');
var bodyParser = require('body-parser');
var app = express();

// Parse incoming JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., HTML, CSS)
app.use(express.static('public'));

// Define a route to handle form submissions
app.post('/submit2', (req, res) => {
    var Nume = req.body.Nume;
    var Prenume = req.body.Prenume;
    var Mail = req.body.Mail;
    var Catedra = req.body.Catedra;
    var Materie = req.body.Materie;
    var Parola = req.body.Parola;

    console.log('Received form data:');
    console.log('Nume:', Nume);
    console.log('Prenume:', Prenume);
    console.log('Mail:', Mail);
    console.log('Catedra:', Catedra);
    console.log('Materie:', Materie);
    console.log('Parola:', Parola);

    // Insert user data into the database
    const sql = 'INSERT INTO profesori (Nume, Prenume, Mail, Catedra, Materie, Parola) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [Nume, Prenume, Mail, Catedra, Materie, Parola];

    db.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error inserting data into MySQL:', error);
            res.status(500).send('Error submitting form data');
        } else {
            console.log('Data inserted into MySQL:', results);
            res.status(200).send('Form data submitted successfully');
        }
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/InregistrareP.html');
});