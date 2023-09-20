
const express = require('express');
//const genres = require('./routes/genres');
const submittedBooks = require('./routes/submittedbooks');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
//app.use('/api/genres', genres);
app.use('/api/submittedbooks', submittedBooks);

// vidly manages movies based on genres 
// http://vidly.com/api/genres
// endpoint for list of all genres:


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on PORT ${port}`));