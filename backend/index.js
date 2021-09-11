// main file of the backend. Initalizes express server and database

const express = require("express");

const PORT = process.env.PORT || 3001;
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');

connectDB()


const users = require('./routes/api/users')

app.use(express.json({extended: false}));

app.use(cors());

// placeholder 
app.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
// use users route. Can add more as needed
app.use('/api/users', users)

// start the server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

