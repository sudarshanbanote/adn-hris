$(document).ready(function(){
	console.log("Jquery officeProfile Loaded");
	$("#submitOfficeInfo").click(function(){
		var officeInfo = $("#officeInfo").serializeArray();
		console.log(officeInfo);
		//event.preventDefault(); //to prevent form from auto submitting
		//var empId=localStorage.empId; //gives empid needed to search a perticular employee
		var empId= 'E10010';

		/*submitOfficeInfo(empId,officeInfo,function(status){
			swal({
				  title: "Employee Office details updated successfully!",
				  text: " Your Information has been saved.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal");
				  	//window.location.href= "../login.html";	
			});
			$("#officeInfo :input").attr("disabled", true);
		});*/

	});

	$("#submitpreviousEmployment").click(function(){
		var empId= 'E10010';
		var companyName = $("#companyName1").val();
		if(companyName=""){
			console.log("Not filled the mandatory  fields");
			swal("Error!", "Please enter the mandatory fields.", "warning");
		}else{
			var previousEmploymentDetail = $("#previousEmploymentDetail").serializeArray();
			console.log(previousEmploymentDetail);
			event.preventDefault(); //to prevent form from auto submitting
			//var empId=localStorage.empId; //gives empid needed to search a perticular employee
			var empId= 'E10010';
			alert("submited");

			submitpreviousEmployment(empId,previousEmploymentDetail,function(status){
				swal({
					  title: "Employee Previous work details updated successfully!",
					  text: " Your Information has been saved.",
					  type: "success",
					  showCancelButton: false,
					  confirmButtonClass: "btn-success",
					  confirmButtonText: "Ok",
					  closeOnConfirm: true
					},
					function(){
						console.log("Came in Swal");
					  	//window.location.href= "../login.html";	
				});
				//$("#previousEmploymentDetail :input").attr("disabled", true);
			});
		}
	});


//tab 2


	$("#submitBankDetails").click(function(){
		
		var bankDetails = $("#bankDetails").serializeArray();
		console.log(bankDetails);
		event.preventDefault(); //to prevent form from auto submitting
		//var empId=localStorage.empId; //gives empid needed to search a perticular employee
		var empId= 'E10010';
		alert("submited");
		
		submitPayrollInformation(empId,bankDetails,'bankDetails',function(status){
			swal({
				  title: "Employee Bank details updated successfully!",
				  text: " Your Information has been saved.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal");	
			});
			//$("#bankDetails :input").attr("disabled", true);
		});
	});

	$("#submitSalaryDetails").click(function(){
		
		var salaryDetails = $("#salaryDetails").serializeArray();
		console.log(salaryDetails);
		event.preventDefault(); //to prevent form from auto submitting
		//var empId=localStorage.empId; //gives empid needed to search a perticular employee
		var empId= 'E10010';
		alert("submited");
		
		submitPayrollInformation(empId,salaryDetails,'salaryDetails',function(status){
			swal({
				  title: "Employee Salary details updated successfully!",
				  text: " Your Information has been saved.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal");	
			});
			//$("#salaryDetails :input").attr("disabled", true);
		});
	});

	$("#submitOtherBenefitDetails").click(function(){
		
		var otherBenefitDetails = $("#otherBenefitDetails").serializeArray();
		console.log(otherBenefitDetails);
		event.preventDefault(); //to prevent form from auto submitting
		//var empId=localStorage.empId; //gives empid needed to search a perticular employee
		var empId= 'E10010';
		alert("submited");
		
		submitPayrollInformation(empId,otherBenefitDetails,'otherBenefitDetails',function(status){
			swal({
				  title: "Employee Salary details updated successfully!",
				  text: " Your Information has been saved.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal");
			});
			//$("#otherBenefitDetails :input").attr("disabled", true);
		});
	});

	$("#submitCompanyCarDetails").click(function(){
		
		var companyCarDetails = $("#companyCarDetails").serializeArray();
		console.log(companyCarDetails);
		event.preventDefault(); //to prevent form from auto submitting
		//var empId=localStorage.empId; //gives empid needed to search a perticular employee
		var empId= 'E10010';
		alert("submited");
		
		submitPayrollInformation(empId,companyCarDetails,'companyCarDetails',function(status){
			swal({
				  title: "Employee Salary details updated successfully!",
				  text: " Your Information has been saved.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal");
			});
			//$("#companyCarDetails :input").attr("disabled", true);
		});
	});

	$("#submitPersonalCarDetails").click(function(){
		
		var personalCarDetails = $("#personalCarDetails").serializeArray();
		console.log(personalCarDetails);
		event.preventDefault(); //to prevent form from auto submitting
		//var empId=localStorage.empId; //gives empid needed to search a perticular employee
		var empId= 'E10010';
		alert("submited");
		
		submitPayrollInformation(empId,personalCarDetails,function(status){
			swal({
				  title: "Employee Salary details updated successfully!",
				  text: " Your Information has been saved.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal");
			});
			//$("#personalCarDetails :input").attr("disabled", true);
		});
	});
});