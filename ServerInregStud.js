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
app.post('/submit', (req, res) => {
    var Nume = req.body.Nume;
    var Prenume = req.body.Prenume;
    var InitialaTata = req.body.InitialaTata;
    var An = req.body.An;
    var Serie = req.body.Serie;
    var Grupa = req.body.Grupa;
    var Mail = req.body.Mail;
    var Parola = req.body.Parola;

    console.log('Received form data:');
    console.log('Nume:', Nume);
    console.log('Prenume:', Prenume);
    console.log('InitialaTata:', InitialaTata);
    console.log('An:', An);
    console.log('Serie:', Serie);
    console.log('Grupa:', Grupa);
    console.log('Mail:', Mail);
    console.log('Parola:', Parola);

    // Insert user data into the database
    const sql = 'INSERT INTO studenti (Nume, Prenume, InitialaTata, An, Serie, Grupa, Mail, Parola) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [Nume, Prenume, InitialaTata, An, Serie, Grupa, Mail, Parola];

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
    res.sendFile(__dirname + '/InregistrareS.html');
});