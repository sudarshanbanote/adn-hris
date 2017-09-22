$(document).ready(function(){
	console.log("userProfile Jquery Loaded");
	console.log(localStorage.empId);
	$("#submitPersonal").click(function(){
		var empId=localStorage.empId;
		var personalArray = $("#form_sample_1").serializeArray();
		console.log(personalArray);
		submitPersonal(empId,personalArray,function(status){
			swal({
				  title: "Employee Personal updated successfully!",
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
		});
		$("#form_sample_1 :input").attr("disabled", true);
		//$('#form_sample_1 :input').attr('readonly', 'readonly');
	});

	$("#submitAddress").click(function(){
		var empId=localStorage.empId;
		var addressArray = $("#form_sample_2").serializeArray();
		console.log(addressArray);
		alert("going in submit Address");
		submitAddress(empId,addressArray,function(status){
			console.log("Updated address valuess");
			swal({
				  title: "Employee Address updated successfully!",
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
		});
		//$("#form_sample_2 :input").attr("disabled", true);
	});
});
