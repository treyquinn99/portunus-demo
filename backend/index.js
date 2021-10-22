// main file of the backend. Initalizes express server and database

const express = require("express");

const PORT = process.env.PORT || 3001;
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');

connectDB()


const users = require('./routes/api/users')
const organizations = require('./routes/api/organization')
const jobopportunities = require('./routes/api/jobOpportunity')

app.use(express.json({extended: false}));

app.use(cors());

// placeholder 
app.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
// use users route. Can add more as needed
app.use('/api/users', users)
app.use('/api/organizations', organizations)
app.use('/api/jobopportunities', jobopportunities)

// start the server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

