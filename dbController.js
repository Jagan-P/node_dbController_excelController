var request = require('request');
var dbURL='http://localhost:3000/';

function insertUserData(insertJSON) {
  return new Promise((resolve,reject)=> {
    var url = dbURL+'jobs'
    var options = {
        method: 'post',
        body: insertJSON,
        json: true,
        url: url
    }

    request(options, function (err, res, body) {
      var statusCode = res.statusCode;
      if (err) {
        reject("Unable to connect to database");
      }
      else if(statusCode=="200") {
        if(res.body=="OK")
          resolve("Inserted record");
        else
          reject("Unable to insert record");
      }
    });
  });
}

function getUserData(key, value) {
  var getData;
  return new Promise((resolve,reject)=> {
    var url = dbURL+'jobs/'+key+'='+value;

    var options = {
        method: 'get',
        url: url
    }

    request(options, function (err, res, body) {
      var statusCode = res.statusCode;
      if (err) {
        reject("Unable to connect to database");
      }
      else if(statusCode=="200") {
        getData=JSON.parse(body);
        if(getData&&getData.length>0)
          resolve(getData);
        else
          reject("Unable to find record with that data");
      }
    });
  });
}

function getAllUserData() {
  var getData;
  return new Promise((resolve,reject)=> {
    var url = dbURL+'jobs';

    var options = {
        method: 'get',
        url: url
    }

    request(options, function (err, res, body) {
      var statusCode = res.statusCode;
      if (err) {
        reject("Unable to connect to database");
      }
      else if(statusCode=="200") {
        getData=JSON.parse(body);
        if(getData&&getData.length>0)
          resolve(getData);
        else
          reject("Unable to find records");
      }
    });
  });
}

function modifyUserData(key, value, key1, value1) {
  return new Promise((resolve,reject)=> {
    var url = dbURL+'jobs/'+key+','+value+','+key1+','+value1;
    var options = {
        method: 'put',
        url: url
    }

    request(options, function (err, res, body) {
      var statusCode = res.statusCode;
      if (err) {
        reject("Unable to connect to database");
      }
      else if(statusCode=="200") {
        if(res.body=="OK")
          resolve("Modified record");
        else
          reject("Unable to modify record");
      }
    });
  });
}


function deleteUserData(key, value) {
  return new Promise((resolve,reject)=> {
    var url = dbURL+'jobs/'+key+'='+value;
    var options = {
        method: 'delete',
        url: url
    }

    request(options, function (err, res, body) {
      var statusCode = res.statusCode;
      if (err) {
        reject("Unable to connect to database");
      }
      else if(statusCode=="200") {
        if(res.body=="OK")
          resolve("Deleted record");
        else
          reject("Unable to deleted record");
      }
    });
  });
}



module.exports= {
  getUserData,
  getAllUserData,
  insertUserData,
  deleteUserData,
  modifyUserData
};
