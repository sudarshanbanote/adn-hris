// Initialize Parse
Parse.initialize("vrfgweyfrhcq82h8rtcrgeg");
Parse.serverURL = 'http://adn-server.herokuapp.com/parse'

Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
}
Date.prototype.subHours = function(h) {
    this.setTime(this.getTime() - (h*60*60*1000));
    return this;
}


//function to add new employee
function addEmployee(empArray,callback){
	var Emp = new Parse.Object.extend('Employee');
	var newEmp = new Emp();
	
	newEmp.set('name',empArray[0].value);
	newEmp.set('officeEmail',empArray[1].value);
  newEmp.set('officeMobile',empArray[2].value);
  newEmp.set('empId',empArray[3].value);
  newEmp.set('buisnessDivsion',empArray[4].value);
  newEmp.set('department',empArray[5].value);
  newEmp.set('vertical',empArray[6].value);
  newEmp.set('subVertical',empArray[7].value);
  newEmp.set('designation',empArray[8].value);
	//newEmp.set('jobTitle',empArray[9].value);
  //save it in newEmp
	newEmp.save(null, {
  success: function(Employee) {
     //console.log('New object created with objectId: ' + Employee.id);
     callback(true);
   },
   error: function(Employee, error) {
     // error is a Parse.Error with an error code and message.
     alert('Failed to create new object, with error code: ' + error.message);
   }
  });
}

//login function
function checklogin(username,password,callback){
	console.log("came in checkLOgin in the module.");
var Employee = Parse.Object.extend("Employee");
var query = new Parse.Query(Employee);
query.equalTo("userName", username);
query.equalTo("password", password);
query.find({
  success: function(results) {
  	if(results.length){
  		//to get info in local storage upon first login
  		localStorage.empId = results[0].get('empId');
  		localStorage.empObject = JSON.stringify(results[0]);
  		callback(true,results[0]);
  	}else{
  		callback(false,null);
  	}
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});	
}

//empId validation function
function validateEmpId(empId,callback){
  console.log("came into validation function");
  console.log(empId);
  var Employee = Parse.Object.extend("Employee");
  var query = new Parse.Query(Employee);
  query.equalTo("empId", empId);
  query.count({
  success: function(count) {
    console.log(count);
    if(count>0){
      //to get info in local storage upon first login
      callback(false);
    }else{
      callback(true);
    }
  },
  error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  }); 
}

//chaneg password
function changePassword(username,password,callback){
  console.log("came in changePassword in the module.");
  var Employee = Parse.Object.extend("Employee");
  var query = new Parse.Query(Employee);
  query.equalTo("userName", username);
  query.find({
    success: function(results) {
      if(results.length){
          console.log("came into results  function");
          var newEmp = results[0];
          newEmp.set('password',password);
          newEmp.set('passwordReset',true); //setting change password to true indication pass reset for first time
          newEmp.save(null, {
               success: function(Employee) {
                 //console.log('New object created with objectId: ' + Employee.id);
                 callback(true);
               },
               error: function(Employee, error) {
                 // error is a Parse.Error with an error code and message.
                 alert('Failed to create new object, with error code: ' + error.message);
               }
            });
          console.log("changed the password.");
          callback(true,results[0]);
      }else{
        callback(false,null);
      }
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  }); 
}

//function to fetch the data for KRA select
function kraWizardSelect(dept,grade,callback){
  console.log("came in kraSelect in the module.");
  var Employee = Parse.Object.extend("Employee");
  var query = new Parse.Query(Employee);
  if(dept)
    query.equalTo("department", dept);  //if the dept is present it will consider this
  if(grade.length > 0)
    query.containedIn("employeeGrade", grade); //containedIn: because grade is array
  query.find({
    success: function(results) {
      if(results.length){
        callback(true,results);
      }else{
        callback(false,null);
      }
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}


//funtion to initiate KRA for some selected array of employees
function initiateKRA(empArray,initiatorId){
  //add to kra table
  //add to input table of all employees-being done in addToKraTable

  //send notification
  var Employee = new Parse.Object.extend('Employee');
  var query = new Parse.Query(Employee);
  query.containedIn('empId',empArray);
  query.find({
    success:function(results){
      if(results.length>0){
        getKRACount(function(count){ //get count of entries in KRA table
          for(i=0;i<results.length;i++){
              addToKRATable(results[i],count+i,initiatorId);//to initiate KRA for selection,add values into KRA table
          }  
        });
      }
    }
  })
}

//function to get count of entries in KRA table
function getKRACount(callback){
  var KRA = new Parse.Object.extend('Kra');
  var kraQuery = new Parse.Query(KRA);
  var kraIndex = 0;
  kraQuery.count({
    success:function(count){
      console.log(count);
      callback(count);
    }
  });
}

function addToKRATable(empData,kraIndex,initiatorId){
  console.log(JSON.stringify(empData.get('empId')));
  //console.log("%s,%d",empId,kraIndex);
  var KRA = new Parse.Object.extend('Kra');
  var newKRA = new KRA();
  newKRA.set('kraId','k_'+kraIndex);
  newKRA.set('empId',empData.get('empId'));
  newKRA.set('empRef',empData);
  var dummyArray = new Array();
  
  newKRA.set('kraValue',dummyArray);//kraValue is the name of the array
  newKRA.set('version','live');
  newKRA.set('startDate',new Date());
  newKRA.set('endDate',new Date());
  //set validity date
  var valDate = new Date();
  newKRA.set('valDate',valDate.addHours(730));
  
  var dummyArray = new Array();
  var dummyObj = new Object(); //create object to push into array
  dummyObj.supervisorId = empData.get('supervisorId');
  dummyObj.supervisorInput = "";
  dummyObj.supervisorReview = false;
  dummyArray.push(dummyObj);//push object into array
  newKRA.set('supervisor',dummyArray);
  
  newKRA.set('cameFrom',initiatorId);
  newKRA.set('wentTo',empData.get('empId'));
  newKRA.set('stage','init');
  console.log("**Adding to KRA Table**");
  newKRA.save(null, {
    success: function(KRA) {
      //console.log('New object created with objectId: ' + KRA.id);
      console.log(JSON.stringify(KRA));
      addToInputTable('KRA',KRA.get('kraId'),KRA.get('empId'),'live',new Date()); //this will add a copy to input table
    },
    error: function(KRA, error) {
      alert('Failed to create new object, with error code: ' + error.message);
    }
  });
}

//function to set kra
function setKRA(kraArray,callback){
  console.log("CAme in setKRA");
  //var empId = localStorage.empId;
  //var kraId = localStorage.kraId;

  var empId ='';
  var kraId ='k_0';
  console.log("The KRA array is:");
  console.log(kraArray);

  var Kra = Parse.Object.extend("Kra");
  var query = new Parse.Query(Kra);
  query.equalTo("kraId", kraId); //match kraId to table
  query.find({
    success: function(results) {
      if(results.length){
        
          var newKRA = results[0];
          var dummyArray = new Array();
          //push kraArray into table
          for(i=0;i<kraArray.length;i++){
            if(kraArray[i].complete){
              var dummyObj = new Object(); //create object to push into array
              dummyObj.kra = kraArray[i].kra;
              dummyObj.kraCat = kraArray[i].kraCategory;
              dummyObj.kraWeight = kraArray[i].kraWeight;
              dummyObj.kraUos = kraArray[i].kraUnitSuccess;
              dummyObj.kraMos = kraArray[i].kraMeasureSuccess;
              dummyArray.push(dummyObj);//push object into array
            }
          }
          
          newKRA.set('kraValue',dummyArray);//kraValue is the name of the array
          newKRA.set('version','live');
          newKRA.set('stage','posted');
          newKRA.set('endDate',new Date());
          newKRA.save(null, {
            success: function(KRA) {
              // Execute any logic that should take place after the object is saved.
              console.log('New KRA set with objectId: ' + KRA.id);
              callback(true);
            },
            error: function(KRA, error) {
              // Execute any logic that should take place if the save fails.
              // error is a Parse.Error with an error code and message.
              callback(false);
              console.log('Failed to create new KRA object, with error code: ' + error.message);
            }
          });
      }else{
        callback(false);
      }
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
    }
  });
}

//function to save as draft KRA
function setKRADraft(kraArray,callback){
  console.log("Came in setDraft");
  //var empId = localStorage.empId;
  //var kraId = localStorage.kraId;

  var empId ='';
  var kraId ='k_0';
  console.log(kraArray);

  var Kra = Parse.Object.extend("Kra");
  var query = new Parse.Query(Kra);
  query.equalTo("kraId", kraId); //match kraId to table
  query.find({
    success: function(results) {
      if(results.length){
        
          var newKRA = results[0];
          var dummyArray = new Array();
          //push kraArray into table using loop
          for(i=0;i<kraArray.length;i++){
            
              var dummyObj = new Object(); //create object to push into array
              dummyObj.kra = kraArray[i].kra;
              dummyObj.kraCat = kraArray[i].kraCategory;
              dummyObj.kraWeight = kraArray[i].kraWeight;
              dummyObj.kraUos = kraArray[i].kraUnitSuccess;
              dummyObj.kraMos = kraArray[i].kraMeasureSuccess;
              dummyArray.push(dummyObj);//push object into array
           
          }          
          newKRA.set('kraValue',dummyArray);//kraValue is the name of the array
          newKRA.set('version','live');
          newKRA.set('stage','draft');
          newKRA.set('endDate',new Date());
          newKRA.save(null, {
            success: function(KRA) {
              console.log('New kra draft object created with objectId: ' + KRA.id);
              callback(true);
            },
            error: function(KRA, error) {
              callback(false);
              console.log('Failed to create new kra draft object, with error code: ' + error.message);
            }
          });
      }else{
        callback(false);
      }
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
    }
  });
}

//Generic Function to add to Input Table
function addToInputTable(type,typeId,empId,status,startDate){
  console.log("Adding to Input Table");
  /*console.log(type);
  console.log(typeId);
  console.log(empId);
  console.log(status);
  console.log(startDate);*/

  var Inputs = Parse.Object.extend("Inputs");
  var newInputs = new Inputs();

  newInputs.set('type',type);
  newInputs.set('typeId',typeId);
  newInputs.set('empId',empId);
  newInputs.set('status',status);
  newInputs.set('startDate',startDate);
  //newInputs.set('endDate',new Date());

  newInputs.save(null, {
    success: function(Inputs) {
      console.log('New object created with objectId: ' + Inputs.id);
    },
    error: function(Inputs, error) {
      alert('Failed to create new object, with error code: ' + error.message);
    }
  });
}

//function to submit personal form
function submitPersonal(empId,dataArray,callback){
  console.log("Came inside submitPersonal in module.js "+empId);

  var Employee = Parse.Object.extend("Employee");
  var query = new Parse.Query(Employee);
  query.equalTo("empId", empId);
  query.find({
    success: function(results) {
      if(results.length){
        console.log("came into results  function "+empId);
        var newEmp = results[0];
        console.log(newEmp);
        console.log(dataArray);
        var dummyArray = new Array();
        var dummyObj = new Object();

        dummyObj.gender = dataArray[4].value;
        dummyObj.personalEmail = dataArray[8].value;
        dummyObj.personalMobile = dataArray[6].value;
        dummyObj.dob = dataArray[5].value;
        dummyObj.bloodGroup = dataArray[10].value;
        dummyObj.religion = dataArray[11].value;
        dummyObj.nationality = dataArray[13].value;
        dummyObj.homePhone = dataArray[7].value;
        dummyObj.motherName = dataArray[3].value;
        dummyObj.fatherName = dataArray[2].value;
        dummyObj.maritialStatus = dataArray[12].value;
        dummyObj.emergencyContactName = dataArray[14].value;
        dummyObj.emergencyContactNumber = dataArray[15].value;

        //dummyObj.presentAddress = " "+dataArray[0].value+" "+dataArray[1].value+","+dataArray[2].value+","+dataArray[3].value+","+dataArray[4].value+","+dataArray[5].value;
        //dummyObj.permanentAddress = " "+dataArray[6].value+" "+dataArray[7].value+","+dataArray[8].value+","+dataArray[9].value+","+dataArray[10].value+","+dataArray[11].value;          
        
        dummyArray.push(dummyObj);//push object into personal array
        newEmp.set('personal',dummyArray);
        newEmp.save(null, {
          success: function(Employee) {
             console.log('New object created with objectId: ' + Employee.id);
             callback(true);
           },
           error: function(Employee, error) {
             // error is a Parse.Error with an error code and message.
             alert('Failed to create new object, with error code: ' + error.message);
           }
        });
        callback(true);
      }else{
        callback(false);
      }
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}

//function to submit address
function submitAddress(empId,dataArray,callback){
  console.log("Came inside submitAddress in module.js "+empId);

  var Employee = Parse.Object.extend("Employee");
  var query = new Parse.Query(Employee);
  query.equalTo("empId", empId);
  query.find({
    success: function(results) {
      if(results.length){
        console.log("came into results  function "+empId);
        var newEmp = results[0];
        console.log(newEmp);
        console.log(dataArray);
        var dummyArray = new Array();
        var dummyObj = new Object();

        dummyObj.presentAddress = dataArray[0].value;
        dummyObj.permanentAddress = dataArray[6].value;          
        //dummyObj.presentAddress = " "+dataArray[0].value+" "+dataArray[1].value+","+dataArray[2].value+","+dataArray[3].value+","+dataArray[4].value+","+dataArray[5].value;
        //dummyObj.permanentAddress = " "+dataArray[6].value+" "+dataArray[7].value+","+dataArray[8].value+","+dataArray[9].value+","+dataArray[10].value+","+dataArray[11].value;          
        
        dummyArray.push(dummyObj);//push object into personal array
        newEmp.set('personal',dummyArray);
        newEmp.save(null, {
          success: function(Employee) {
             console.log('New object created with objectId: ' + Employee.id);
             callback(true);
           },
           error: function(Employee, error) {
             // error is a Parse.Error with an error code and message.
             alert('Failed to create new object, with error code: ' + error.message);
           }
        });
        callback(true);
      }else{
        callback(false);
      }
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}


function submitOfficeInfo(empId,dataArray,callback){
  console.log("Came inside submitOfficeInfo in module.js "+empId);

  var Employee = Parse.Object.extend("Employee");
  var query = new Parse.Query(Employee);
  query.equalTo("empId", empId);
  query.find({
    success: function(results) {
      if(results.length){
        console.log("came into results  function "+empId);
        var newEmp = results[0];
        console.log(newEmp);
        console.log(dataArray);

        //newEmployee.set('designation',dataArray[0].value);
        newEmployee.set('department',dataArray[12].value);
        newEmployee.set('buisnessDivision',dataArray[11].value);
        newEmployee.set('officeEmail',dataArray[8].value);
        newEmployee.set('officeMobile',dataArray[7].value);
        newEmployee.set('employeeGrade',dataArray[10].value);
        newEmployee.set('vertical',dataArray[13].value);
        newEmployee.set('subVertical',dataArray[14].value);        
        var dummyArray = new Array();
        var dummyObj = new Object(); //create object to push into officeDetails array

        dummyObj.companyName = dataArray[0].value;
        dummyObj.idCardNumber = dataArray[2].value;
        dummyObj.dateOfJoining = dataArray[3].value;
        dummyObj.dateOfConfirmation = dataArray[4].value;
        dummyObj.dateOfSeparation = dataArray[5].value;
        dummyObj.employeeCategory = dataArray[9].value;
        //dummyObj.reportingManager = dataArray[15].value;
        //dummyObj.reportingManagerId = dataArray[15].value;
        //dummyObj.reviewerId = dataArray[0].value;
        //dummyObj.buisnessHrSpoc = dataArray[0].value;
        //dummyObj.buisnessHrHead = dataArray[0].value;
        //dummyObj.groupHrHead = dataArray[0].value;
        dummyObj.jobTitle = dataArray[20].value;
        dummyObj.pfRating1516 = dataArray[21].value;
        dummyObj.pfRating1617 = dataArray[22].value;
        dummyObj.dateOfResignation = dataArray[23].value;
        //dummyObj.dateOfSeparation = dataArray[].value;
        dummyObj.separationType = dataArray[24].value;
        dummyObj.workPermitNumber = dataArray[25].value;
        dummyObj.effectiveDate = dataArray[26].value;
        dummyObj.expiryDate = dataArray[27].value;
        dummyObj.facility = dataArray[29].value;
        dummyObj.city = dataArray[28].value;
        dummyObj.country = dataArray[30].value;
        dummyObj.costCenter = dataArray[31].value;

        dummyArray.push(dummyObj);//push object into officeDetails array
        newEmployee.set('officeDetails',dummyArray);
        newEmp.save(null, {
          success: function(Employee) {
             console.log('New object created with objectId: ' + Employee.id);
             callback(true);
           },
           error: function(Employee, error) {
             // error is a Parse.Error with an error code and message.
             alert('Failed to create new object, with error code: ' + error.message);
           }
        });
        callback(true);
      }else{
        callback(false);
      }
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}

//function to submit previous emp details in the office profile(HR)
function submitpreviousEmployment(empId,dataArray,callback){
  console.log("Came inside submitpreviousEmployment in module.js "+empId);

  var Employee = Parse.Object.extend("Employee");
  var query = new Parse.Query(Employee);
  query.equalTo("empId", empId);
  query.find({
    success: function(results) {
      if(results.length){
        console.log("came into results  function "+empId);
        var newEmp = results[0];
        console.log(newEmp);
        console.log(dataArray);
        var dummyArray = new Array();
        var dummyObj = new Object();

        dummyObj.companyName = dataArray[0].value;
        dummyObj.companyBuisness = dataArray[1].value;
        dummyObj.designation = dataArray[2].value;
        dummyObj.department = dataArray[3].value;
        dummyObj.responsibility = dataArray[4].value;
        dummyObj.companyLocation = dataArray[5].value;
        dummyObj.employmentPeriod = dataArray[6].value;
        dummyObj.areaOfExperience = dataArray[7].value;

        dummyArray.push(dummyObj);//push object into previosWorkDetails array
        newEmp.set('previousWorkDetails',dummyArray);
        newEmp.save(null, {
          success: function(Employee) {
             console.log('New previousEmployment object created with objectId: ' + Employee.id);
             callback(true);
           },
           error: function(Employee, error) { 
             alert('Failed to create new object, with error code: ' + error.message); 
           }// error is a Parse.Error with an error code and message.
        });
        callback(true);
      }else{
        callback(false);
      }
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}
