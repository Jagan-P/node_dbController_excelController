var nodeExcel = require('excel-export');
const dbcontroller = require ("./dbController.js");
const save = require('save-file');

function json2array(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    return result;
}

function jsonToxls(data) {
    var dataToExcel= [];

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
  
    for(var i=0;i<data.length;i++) {
      dataToExcel.push(json2array(data[i]));
    }
    conf.rows = dataToExcel;
    var result = nodeExcel.execute(conf);
  
    save(result, 'Report.xlsx')
    dataToExcel.splice(0, dataToExcel.length);
}

module.exports= {
    jsonToxls
  };