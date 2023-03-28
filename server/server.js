let express = require('express');
let routes = require('./routes');
let app = express();

app.use(express.json());


app.use("/", routes);

app.listen(8000, () =>{
    console.log("listening on port 8000")
})