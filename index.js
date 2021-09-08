const express=require("express");
const mysqlConnection  =   require('./config/mysqlConnection');
const bodyparser = require('body-parser');
const cors = require('cors');

const app=express();
const path    = require("path");

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());
app.use(cors());
app.use(express.static('public'));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}..`));

app.get("/",(req,res)=>{

    res.sendFile(path.join(__dirname+'/public/index.html'));

});

// -----------------------------------------------------------------------------------------
//Creating GET Router to fetch all the user details from the MySQL Database
app.get('/users' , (req, res) => {
    mysqlConnection.query('SELECT * FROM `userstest` ', (err, result, fields) => {
        if (!err)
        res.send(result);
        else
        console.log(err);
    })
} );