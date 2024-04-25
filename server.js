const express = require("express");
const items = require("./model/item")
const app = express();
const personRoutes=require('./routes/itemRoutes');
const bodyParser=require("body-parser");
const Db=require("./Db");
app.use(bodyParser.json());
app.use('./item',personRoutes);
console.log("express is coffee without o");