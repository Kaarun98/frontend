$(document).ready(function()
{
	 $("#alertSuccess").hide();
	 $("#alertError").hide();
}); 


$(function (){
	var $apps = $('#apps');
	var $bid = $('#BID');
	var $buyerName = $('#buyerName');
	var $buyerMail = $('#buyerMail');
	var $buyerAddress = $('#buyerAddress');
	var $buyerNo = $('#buyerNo');
	

	$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/Buyer/webapi/Buyer/buyer',
		success: function(apps){
			//console.log('success',data);
			$.each(apps, function(i, app){
				$apps.append('<li><div class="buyer shadow-lg p-3 mb-5 bg-white rounded bg-light m-2\" style=\"width: 12rem;float: left;">'
							+'BID:<span class="noedit bid">' + app.bid +'</span><input class="edit bid"/>'+'<br>'
							+'Buyer Name:<span class="noedit buyerName">'+ app.buyerName +'</span><input class="edit buyerName"/> '+'<br>'
							+'Buyer Mail:<span class="noedit buyerMail">'+ app.buyerMail +'</span><input class="edit buyerMail"/> '+'<br>'
							+'Buyer Address:<span class="noedit buyerAddress">'+ app.buyerAddress +'</span><input class="edit buyerAddress"/> '+'<br>'
							+'Buyer No:<span class="noedit buyerNo">'+ app.buyerNo +'</span><input class="edit buyerNo"/> '+'<br>'
							+'<input type="button" id="'+ app.BID +'" value="Remove" class="btn btn-outline-danger remove">'+'<br>'
							+'<input type="button" " value="Edit" class="editapp btn btn-outline-primary noedit">'+'<br>'
							+'<input type="button" " value="Save" class="saveedit btn btn-outline-success edit">'+'<br>'
							+'<input type="button" " value="Cancel" class="canceledit btn btn-outline-danger edit"></li>');

			});
		},
		error: function() {
			alert('Buyer loading error...');
		}
	});
	
	
	$('#btnSave').on('click', function(){
		
		//clear status messages
		$("#alertSuccess").text("");
		$("#alertSuccess").hide();
		$("#alertError").text("");
		$("#alertError").hide();
		
		//Form validation
		var status = validateBuyerForm(); 
		

		
		//Check not valid
		if (status != true)
		 {
			 $("#alertError").text(status);
			 $("#alertError").show();
			 return;
		 } 
		
		
        //IF valid		
		var app = {
				buyerName: $buyerName.val(),
				buyerNo: $buyerNo.val(),
				buyerMail: $buyerMail.val(),
				bid: $bid.val(),
				buyerAddress: $buyerAddress.val(),

		};
		

		
		$.ajax({
			headers: { 
		        'Accept': 'application/json',
		        'Content-Type': 'application/json' 
		    },
			type: 'POST',
			url: 'http://localhost:8080/Buyer/webapi/Buyer/buyer/',
			data: JSON.stringify(app),
			dataType: 'json',
			success: function(newBuyer){
				console.log("Inserted");
				$apps.append('<li><div class="buyer shadow-lg p-3 mb-5 bg-white rounded bg-light m-2\" style=\"width: 12rem;float: left;">'
						+'bid:<span class="noedit bid">'+ newBuyer.bid +'</span><input class="edit bid"/>'+'<br>'
						+'buyerName:<span class="noedit buyerName">' + newBuyer.buyerName +'</span><input class="edit buyerName"/>'+'<br>'
						+'buyerNo:<span class="noedit nic">'+ newBuyer.buyerNo +'</span><input class="edit buyerNo"/> '+'<br>'
						+'buyerAddress:<span class="noedit buyerAddress">'+ newBuyer.buyerAddress +'</span><input class="edit buyerAddress"/> '+'<br>'
						+'buyerMail:<span class="noedit buyerMail">'+ newBuyer.buyerMail +'</span><input class="edit buyerMail"/> '+'<br>'
						+'<input type="button" id="'+ newBuyer.BID +'" value="Remove" class="btn btn-outline-danger remove">'+'<br>'
						+'<input type="button" " value="Edit" class="editapp btn btn-outline-primary noedit">'+'<br>'
						+'<input type="button" " value="Save" class="saveedit btn btn-outline-success edit">'+'<br>'
						+'<input type="button" " value="Cancel" class="canceledit btn btn-outline-danger edit"></li>');
				
				//Show Success Message
				$("#alertSuccess").text("Your Buyer Details Saved Successfully");
				$("#alertSuccess").show();

				$("#formBuyer")[0].reset(); 
				
			},
			
			error: function() {
				alert('Buyer Saving Error');
			}
		});
		
		function validateBuyerForm()
		{
			
			//bid
			if ($("#bid").val().trim() == "")
			 {
			 return "Insert bid.";
			 }
		
			// Buyer NAME
			if ($("#buyerName").val().trim() == "")
			 {
			 return "Insert buyer name.";
			 }

			//Buyer No
			if ($("#buyerNo").val().trim() == "")
			 {
			 return "Insert buyer no.";
			 }

			//Buyer Mail
			if ($("#buyerMail").val().trim() == "")
			 {
			 return "Insert buyerMail.";
			 }

			

			if ($("#buyerAddress").val().trim() == "")
			 {
			 return "Insert buyerAddress.";
			 }

			return true;
		}
		

		
	});
	
	
	$apps.delegate('.remove','click',function(){
		var $li=$(this).closest('li');
		var self = this;
		$.ajax({
			type:'DELETE',
			url:'http://localhost:8080/Buyer/webapi/Buyer/buyer/'+$(this).attr('id'),
			success: function(){
				console.log("Deleted");
				$(self);
				$li.fadeOut(300,function(){
					$(this).remove();
					
					
					
				})
				
			},
		
			error: function() {
				alert('Buyer Delete Error');
			}
		});
	});
	
	
$apps.delegate('.editapp','click',function(){
		
		var $li=$(this).closest('li');
		
		$li.find('input.bid').val($li.find('span.bid').html());
		$li.find('input.buyerName').val($li.find('span.buyerName').html());
		$li.find('input.buyerNo').val($li.find('span.buyerNo').html());
		$li.find('input.buyerMail').val($li.find('span.buyerMail').html());
		$li.find('input.buyerAddress').val($li.find('span.buyerAddress').html());
		$li.addClass('edit');
	});
	
	$apps.delegate('.canceledit','click',function(){
		$(this).closest('li').removeClass('edit');
		
	});
	
	$apps.delegate('.saveedit','click',function(){
		var $li=$(this).closest('li');
		var app={
				
				bid: $li.find('input.bid').val(),
				buyerName: $li.find('input.buyerName').val(),
				buyerNo: $li.find('input.buyerNo').val(),
				buyerMail: $li.find('input.buyerMail').val(),
				buyerAddress: $li.find('input.buyerAddress').val()
				
		};
		
		$.ajax({
			headers:{
				'Accept':'application/json',
				'Content-Type':'application/json'
					
					
			},
			type: 'PUT',
			url: 'http://localhost:8080/Buyer/webapi/Buyer/buyer',
			data: JSON.stringify(app),
			dataType: 'json',
			
			success: function(){

				$li.find('span.bid').html(app.bid);
				$li.find('span.buyerName').html(app.buyerName);
				$li.find('span.buyerNo').html(app.buyerNo);
				$li.find('span.buyerMail').html(app.buyerMail);
				$li.find('span.buyerAddress').html(app.buyerAddress);
				$li.removeClass('edit');
				
				$("#alertSuccess").text("Your Buyer Details Updated Successfully");
				$("#alertSuccess").show();
				},
		
				error: function(){
				alert('Buyer Update Error');
			}
			
		});
	});
	
	
	
	
	
	
});