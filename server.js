var mysql = require('mysql');
const bodyParser=require('body-parser');
const express = require('express');
var nodeExcel = require('excel-export');
const dbcontroller = require ("./dbController.js");

const app = express();
const port = 3000;

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'development'
});

function json2array(json){
  var result = [];
  var keys = Object.keys(json);
  keys.forEach(function(key){
      result.push(json[key]);
  });
  return result;
}

var dataToExcel= [];

 
connection.connect();

app.use(bodyParser.json());

app.post('/jobs', function (req, res) {
  connection.query('insert into jobs (location) values ("'+req.body.text+'")', function (error, results, fields) {
    if (error) throw error;
    res.send('OK');   
  });
});

app.get('/jobs', function (req, res) {
  connection.query('select * from jobs', function (error, results, fields) {
    if (error) throw error;
    res.send(results);  
  });
});

app.get('/jobs/:queryValue', function (req, res) {
  var queryArray=req.params.queryValue.split("=");
  if(queryArray[0]&&queryArray[1]) {
    connection.query('select * from jobs where '+queryArray[0]+'="'+queryArray[1]+'"', function (error, results, fields) {
      if (error) throw error;
      res.send(results);  
    });
  }
  else {
    res.send("invalid request");
  }
});

app.delete('/jobs/:queryValue', function (req, res) {
  var queryArray=req.params.queryValue.split("=");
  if(queryArray[0]&&queryArray[1]) {
    connection.query('delete from jobs where '+queryArray[0]+'="'+queryArray[1]+'"', function (error, results, fields) {
      if (error) throw error;
      res.send('OK');  
    });
  }
  else {
    res.send("invalid request");
  }
});

app.patch('/jobs/:queryValue', function (req, res) {
  var queryArray=req.params.queryValue.split(",");
  if(queryArray[0]&&queryArray[1]&&queryArray[2]&&queryArray[3]) {
    connection.query('UPDATE jobs SET '+queryArray[0]+'="'+queryArray[1]+'" WHERE ' +queryArray[2]+'="'+queryArray[3]+'"', function (error, results, fields) {
      if (error) throw error;
      res.send('OK');  
    });
  }
  else {
    res.send("invalid request");
  }
});

app.get('/Excel', function(req, res){
  var conf ={};
  conf.name = "mysheet";
  conf.cols = [
    {
      caption:'Location',
      type:'string'
  },{
    caption:'ID',
    type:'number'
  }];

  dbcontroller.getAllUserData().then((data)=>{
    console.log(JSON.stringify(data,undefined,2));
    for(var i=0;i<data.length;i++) {
      dataToExcel.push(json2array(data[i]));
    }
    conf.rows = dataToExcel;
    var result = nodeExcel.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    res.end(result, 'binary');
    dataToExcel.splice(0, dataToExcel.length);
  },(error)=>{
    console.log(error);
  }
);
  
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// connection.end(); 