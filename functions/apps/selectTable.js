$(document).ready(function(){
	var dept=localStorage.searchDept;
	var grade=JSON.parse(localStorage.searchGrade);
	console.log("The searched dept is: "+dept);
	console.log("The searched grade array is: "+grade);

	$("#submitKraSelect").click(function(){
		var tbl = $('#sample_2').DataTable();
		var counter = 0;
		tbl.rows().every( function () {
		    var data = this.data();
		    console.log(data);
		    //var checkbox = $($.parseHTML(data[0]));
		    //console.log(checkbox.children().is(':checked'));
		    var checkboxClass = '.checkboxSel'+counter;
		    console.log(checkboxClass);
		    var status = $(checkboxClass).next().length;
		    console.log(status);
		    counter++;
		    // ... do something with data(), or this.node(), etc
		});
		//console.log(data);
		var empArray = ['E10010','E10011','E10014'];
		var initiatorId = 'E1006';
		initiateKRA(empArray,initiatorId,function(status){
			if(status){
				swal({
				  title: "Action initiated!",
				  text: "Action initiated for selected employees.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-warning",
				  confirmButtonText: "Ok",
				  closeOnConfirm: false
				},
				function(){
					console.log("Came in Swal");
				  	window.location.href= "../index.html";	
				});
			}else{

			}
		});
	});	

	kraWizardSelect(dept,grade,function(status,results){
			console.log("Came inside kraWizardSelect from Module.js");
		if(status){
			//console.log(JSON.stringify(results));
			populateList(results);


		}else{
			console.log("No employees found in selected qurey");
			swal({
				  title: "No employees found in selected qurey!",
				  text: " Please search again.",
				  type: "error",
				  showCancelButton: false,
				  confirmButtonClass: "btn-danger",
				  confirmButtonText: "Ok",
				  closeOnConfirm: false
				},
				function(){
					console.log("Came in Swal");
				  	window.location.href= "../pages/kra_wizard.html";	
				});
		}
	});
});

//function to populate table
function populateList(data){

	var t = $('#sample_2').DataTable();

	for(i=0;i<data.length;i++){
		var empId = data[i].get('empId');
		var name = data[i].get('name');
		var dept = data[i].get('department');
		var grade = data[i].get('employeeGrade');
		var checkboxClass = 'checkboxSel'+i;
		var checkbox = '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"> <input type="checkbox" class="checkboxes '+checkboxClass+'" value="'+i+'" /> <span></span> </label>';
		t.row.add([checkbox,empId,name,dept,grade]).draw(false);
	}	
}