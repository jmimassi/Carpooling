let express = require('express');
let routes = require('./routes');
let app = express();

app.use(express.json());
const cors = require('cors');
app.use(cors());

// Importing the database model
const Sequelize = require('sequelize');
const db = require('./db.js');

// Creating all the tables defined in agency
//db.sync()
db.sync({ alter: true })


app.use("/api", routes);

app.listen(8000, () => {
    console.log("listening on port 8000")
})