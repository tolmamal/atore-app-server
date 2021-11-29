// based on tutorial: https://www.bezkoder.com/node-js-rest-api-express-mysql/
const express = require("express");
const cors = require("cors");

const app = express();
// const morgan = require('morgan');
// morgan.token('param', function (req, res, param) {
//     return req.params[param];
// });
//
// app.use(morgan(':method :host :status :param[id] :res[content-length] - :response-time ms'));

const corsOptions = {
    // origin: "http://localhost:3000",
    origin: "*"
};



app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// simple route
app.get("/ping", (req, res) => {
    res.send("Pong");
});



require("./routes/product.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
