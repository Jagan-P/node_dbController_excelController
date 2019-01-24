const dbcontroller = require ("./dbController.js");
const jsonToExcel = require ("./jsonToExcel.js");

// dbcontroller.getUserData("LOCATION","CHENNAI").then((result)=>{
//     console.log(JSON.stringify(result,undefined,2));
//   },(error)=>{
//     console.log(error);
//   }
// );

// dbcontroller.getAllUserData().then((result)=>{
//     console.log(JSON.stringify(result,undefined,2));
//   },(error)=>{
//     console.log(error);
//   }
// );

// dbcontroller.insertUserData({ text: 'Bangalore' }).then((result)=>{
//     console.log(result);
//   },(error)=>{
//     console.log(error);
//   }
// );

// dbcontroller.deleteUserData("id",10).then((result)=>{
//     console.log(result);
//   },(error)=>{
//     console.log(error);
//   }
// );

// dbcontroller.modifyUserData("LOCATION","Madurai","id","1").then((result)=>{
//     console.log(result);
//   },(error)=>{
//     console.log(error);
//   }
// );

jsonToExcel.jsonToxls([
  {
    "location": "Madurai",
    "id": 1
  }
]);
