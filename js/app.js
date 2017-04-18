$(document).ready(function()
{
	

	var objet = {};
	var array = [];				
	var afficherBlog;

	$('#indexSubmit').on('click', function()
	{
		var title = $("#inputBlog").val();
		var article = $("textarea").val(); 
		
		var today = new Date(); 
		var dd = today.getDate(); 
		var mm = today.getMonth()+1;  //January is 0! 
		var yyyy = today.getFullYear();
		var now =  dd+ "/" + "0" +mm+ "/" +yyyy
		console.log(now);		
		
		

		objet = 
		{ 	
		 	"title" : title,
			"article" : article,
			"date" :  now	
		};
	
		$("#inputBlog").val("");
		$("textarea").val("");
		
		$.ajax(
		{
			url : 'http://192.168.1.50/json-db',
			data: 
			{
				task: 'set',
				key: 'romaBlog',
				value: JSON.stringify(objet)
			}
		})
		.done(function()
		{
			console.log('Objet bien envoyé');
		})
		.fail(function(data)
		{
			console.log(data);
			alert('Error 500')
		});
	});
	

	var mainTitle;
	var mainArticle;
	var news = {};

	
	$.ajax(
	{
		url : 'http://192.168.1.50/json-db',
		data : 
		{
			task : 'get',
			key : 'romaBlog',
		},
		success : function(data)
		{
			
			news = JSON.parse(data);
			array.push(news);
			
			for  (var i = 0; i < news.length; i++)
			{
				$('#mainListe').append('<li><a href="#">' + news[i].title + ' ' + '(' + news[i].date + ')</a></li>');
				$('#mainParagraphe').append('<div class="row"><p>' + news[i].article + '</p></div>');
			}
		},
		error : function(err)
		{
			console.log(err);
			afficherBlog = false;
		}
	});		

	$('#indexDeleteButton').on('click', function()
	{
		
		
		$('#mainListe').children().remove();
		$.ajax(
		{
			url:'http://192.168.1.50/json-db',
			data: 
			{
				task: 'delete',
				key: 'romaBlog',
			},
		})
		.done(function(data)
		{
			console.log(data);
			console.log('Objet supprimé');

		})
		.fail(function(data)
		{
			console.log(data);
			alert('Error 500');
		});
		

		


	});
	

	
		
	

		



	
});
