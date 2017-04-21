$(document).ready(function()
{
	
	var converter = new showdown.Converter();   

	var objet = {};
	var array;			
	var news;	
	var _id;
	var title;
	var article;

	// afficher les articles que l'on peut supprimer

	var affichArticleIndex = function(a){
		$('#deleteList').children().remove();

		for  (var i=0; i<a.length; i++)
		{
			$('#deleteList').append('<li></li>');
			$('li').last().append('<a href="#" data-id="'+ a[i]._id +'">'+ a[i].title +'</a>');
		}
		
	};

	
		// null si on est pas en mode edit

		$('#indexSubmit').on('click', function()
		{
			title = $("#inputBlog").val();
			article = $("#textareaBlogM").val(); 

			// pour récupérer la date
			
			var today = new Date(); 
			var dd = today.getDate(); 
			var mm = today.getMonth()+1;  //January is 0! 
			var yyyy = today.getFullYear();
			var now =  dd+ "/" + "0" +mm+ "/" +yyyy;	
			
			if (title != "" && article != "")    // envoie sur le serveur seulement si les champs textes sont remplies
			{			
				objet = 
				{ 	
				 	"title" : title,
					"article" : article,
					"date" :  now	
				};
			
				
				
				// requete pour envoyer sur le serveur

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
				.done(function(data)
				{					
					Materialize.toast('Objet envoyé!', 1500)
					$("#inputBlog").val("");
					$("#textareaBlogM").val("");
				})
				.fail(function(data)
				{				
					Materialize.toast('Erreur 500', 1500);
				});

			}
			
		});		
	
	
				


	$("body").on('click', function()
	{
		// requete pour envoyer sur la page d'accueil


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
				console.log(news);
				affichArticleIndex(news);
			},
			error : function(err)
			{
				console.log(err);
			}
		});		

	});


	












	// pour tout supprimer

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

		});
	});



	


	
	//fonction pour convertir le markdown en HTML

	var markdownToHtml = function()
	{		
		var text = $('#textareaBlogM').val();
		var html = converter.makeHtml(text);
		$('#textareaHTML').html(html);
	};
		

	

	$('#textareaBlogM').on('keyup', markdownToHtml);
		


  
	$('#deleteList').delegate('li a', 'click', function()
	{
		var _id = $(this).data('id');
		$('#modifSubmit').attr('data-id', _id);
		$('#deleteTargetButton').attr('data-id', _id);

		for  (var i = 0; i < news.length; i++) 
		{
			if  (news[i]._id = _id)
			{
				$('#inputModif').val(news[i].title);
				$('#textareaModif').val(news[i].article);
			}
		}
	});
  	




  	var suppressionArticle = function()
  	{
	  	$('#deleteTargetButton').on('click', function()
	  	{
	  		_id = $('#deleteTargetButton').data('id');
	  		console.log(_id);
	  		for  (var i = 0; i < news.length; i++)
	  		{
	  			if  (news[i]._id === _id)		// si je clique sur un titre de la liste il est supprimé du serveur
	  			{	  				
	  				$.ajax(
	  				{
	  					url:'http://192.168.1.50/json-db',
						data: 
						{
							task: 'delete',
							_id: _id,
						}
	  				});	  						
	  			}	  			
		  		
		  	};

		  	console.log(news);	
		});
	}

  suppressionArticle();

  


	var modificationArticle = function()
	{
		$('#modifSubmit').on('click', function()
	  	{
	  		_id = $('#modifSubmit').data('id')
	  		console.log(_id)
	  		for  (var i = 0; i < news.length; i++)
	  		{
	  			if  (news[i]._id === _id)		// si je clique sur un titre de la liste il est envoie le contenu dans le textarea
	  			{
	  				title = $("#inputModif").val();
					article = $("#textareaModif").val(); 
					
					if (title != "" && article != "")    // envoie sur le serveur seulement si les champs textes sont remplies
					{			
						objet = 
						{ 	
						 	"title": title,
							"article" : article,
						};

						$.ajax(
						{
							url:'http://192.168.1.50/json-db',
							data: 
							{
								task: 'update',
								_id:  _id,
								value: JSON.stringify(objet),
							}
						});
					}
	  			}
	  		}
	  	});		
	}

	modificationArticle();





	



});
