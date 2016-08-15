$(document).ready(function(){
	$('.carousel').carousel();
    $('.materialboxed').materialbox();


 	$('#get-gallery-button').on('click', function () {
 		$.ajax({
 			url: '/animal_list_data'
 		}).done(function (data) {
 			console.log(data);
 			data.animals.forEach(function (item) {
 				$('#gallery').append(
					'<div class="col s12 m4">' +
		  				'<div class="card">' +
		    				'<div class="card-image">' +
		      					'<img class="materialboxed" src="' + item.src + '">' +
		      					'<span class="card-title">' + item.title + '</span>' +
		    				'</div>' +
		    				'<div class="card-content">' +
		      					'<p>' + item.desc + '</p>' +
		    				'</div>' +
		  				'</div>' +
					'</div>'
 					);
 			})
 		});
 	});
});

