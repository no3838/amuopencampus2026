// JavaScript Document

// JavaScript Document

/* btnGlobalnavi */

$('#btnGlobal').on('click',function(){
		$('#btnGlobal').toggleClass('active');
				$('#grandMenu').slideToggle('slow');
});

// sp menu
var windowWidth = $(window).width();
var windowSm = 767;
if (windowWidth <= windowSm) {

/* sp Only ------------------------------- */

$('#navGlobal li a').on('click',function(){
			$('#btnGlobal').removeClass('active');
				$('#grandMenu').slideUp('slow');
});


$(function(){
  $('body').find('[data-sp-href]').each(function() {
      $(this).attr('href', $(this).attr('data-sp-href'));
  });
});

}


$('#navGlobal li a').on('click',function(){
			$('#btnGlobal').removeClass('active');
				$('#grandMenu').slideUp('slow');
});