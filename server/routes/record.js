/*
    Contains API endpoint methods
*/

const express = require("express");
 
// Router for API routes
const recordRoutes = express.Router();
 
// Use this to connect to database
const dbo = require("../db/conn");
 
// Convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// Gets a list of all records
recordRoutes.route("/record").get(function (req, res) {
 let db_connect = dbo.getDb("records");
 db_connect
   .collection("favourites")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// Gets a single record by _id
recordRoutes.route("/record/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect
     .collection("favourites")
     .findOne(myquery, function (err, result) {
       if (err) throw err;
       res.json(result);
     });
});
 
// Creates a new record
recordRoutes.route("/record/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   url: req.body.url,
 };
 db_connect.collection("favourites").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// Updates an existing record.
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb(); 
 let myquery = { _id: ObjectId( req.params.id )}; 
 let newvalues = {   
   $set: {     
     name: req.body.name,    
     url: req.body.url,     
   }, 
  }
  db_connect.collection("favourites").updateOne(myquery, newvalues);
  response.status(200).send();
});
 
// Deletes a single record.
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect.collection("favourites").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;
