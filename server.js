const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

const htmlRoutes = require('./controllers/htmlroutes');
app.use(htmlRoutes);

const apiRoutes = require('./controllers/api');
app.use(apiRoutes);

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});