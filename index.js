const express = require("express");
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/x-www-form-urlencoded
let port = process.env.PORT || 3001;

app.use( (req,res,next) => {
    console.log("middleware");
    next()
})

app.get('/', (req,res) => {
    res.send(`Welcome to the API! <br> Please use /api/user or /api/product`);
})

app.post('/api/user', (req,res) => {
    let userData = req.body;
    if(!userData.name){
        return res.status(400).send({message:"Name is required!"});
    }
    else{
        console.log(userData);
        res.status(200).send(userData);
    }
});

// backend app is listening on port 4201
let server = app.listen(port, () => console.log(`Listening on ${port}`));