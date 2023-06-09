let express = require('express');
let routes = require('./routes');
let app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
const cors = require('cors');
app.use(cors({
    credentials: true,
    origin: "*"
}));
app.use(cookieParser());

// Importing the database model
const Sequelize = require('sequelize');
const db = require('./db.js');
// Creating all the tables defined in agency
//db.sync()
db.sync({ alter: true })


app.use("/api", routes);



const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const YAML = require('yaml')

const file = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(8000, () => {
    console.log("listening on port 8000")
})