$(document).ready(function()
{
	console.log('hello world');
	var news;
	

	$('#blog').on('click', function()
	{
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
				console.log(news);
			

				// pour afficher dans la page d'acceuil

				for  (var i = 0; i < news.length; i++)
				{
					$('#mainListe').append('<li><a href="#">' + news[i].title + ' ' + '(' + news[i].date + ')</a></li>');
					$('#mainParagraphe').append('<div class="row"><p>' + news[i].article + '</p></div>');
				}
			},
			error: function(err)
			{
				console.log(err);
			}

		});
	});

	$('.fixed-action-btn').openFAB();
  	$('.fixed-action-btn').closeFAB();

  	// faire apparaitre la sidenav et la faire disparaitre sur petit écran

  	$(".button-collapse").sideNav();

  	 $('.parallax').parallax();
});